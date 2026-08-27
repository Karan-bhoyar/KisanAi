from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
import uuid

from app.database.session import get_db
from app.models.user import User
from app.models.disease_history import DiseaseHistory
from app.core.security import get_current_user

from app.services.vision_service import detect_disease
from app.services.report_service import generate_pdf
from app.services.email_service import send_report_email

from app.schemas.disease import DiseaseResponse


router = APIRouter(
    prefix="/disease",
    tags=["Disease Detection"]
)


# ===================================
# Disease Detection API
# ===================================

@router.post("/", response_model=DiseaseResponse)
async def disease_detection(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    print("=" * 60)
    print("STEP 1: Disease Detection API called")
    print("User ID:", current_user.id)
    print("User Email:", current_user.email)
    print("Uploaded File:", file.filename)
    print("Content Type:", file.content_type)

    try:

        # --------------------------------
        # Validate File
        # --------------------------------

        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="No file uploaded."
            )

        allowed_extensions = {
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        }

        extension = os.path.splitext(
            file.filename
        )[1].lower()

        if extension not in allowed_extensions:
            raise HTTPException(
                status_code=400,
                detail="Please upload JPG, JPEG, PNG or WEBP image."
            )

        # --------------------------------
        # Create Upload Folder
        # --------------------------------

        os.makedirs(
            "uploads",
            exist_ok=True
        )

        # --------------------------------
        # Create Unique Filename
        # --------------------------------
        # Prevent two users uploading files
        # with the same filename.

        unique_filename = (
            f"{uuid.uuid4().hex}{extension}"
        )

        image_path = os.path.join(
            "uploads",
            unique_filename
        )

        print("STEP 2: Saving image")
        print("Image Path:", image_path)

        # --------------------------------
        # Save Uploaded Image
        # --------------------------------

        with open(
            image_path,
            "wb"
        ) as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

        print("STEP 3: Image saved successfully")

        # --------------------------------
        # Verify Image Exists
        # --------------------------------

        if not os.path.exists(image_path):

            print("ERROR: Image file was not created")

            raise HTTPException(
                status_code=500,
                detail="Failed to save uploaded image."
            )

        print(
            "Image Size:",
            os.path.getsize(image_path),
            "bytes"
        )

        # --------------------------------
        # Detect Disease
        # --------------------------------

        print("STEP 4: Starting Gemini disease detection")

        result = detect_disease(
            image_path
        )

        print("STEP 5: Gemini detection completed")
        print("Detection Result:", result)

        # --------------------------------
        # Validate Detection Result
        # --------------------------------

        if not isinstance(result, dict):

            print(
                "ERROR: Detection result is not a dictionary"
            )

            raise HTTPException(
                status_code=500,
                detail="Invalid disease detection response."
            )

        # --------------------------------
        # Extract Result Safely
        # --------------------------------

        category = str(
            result.get(
                "category",
                "Unknown"
            )
        )

        disease_name = str(
            result.get(
                "disease_name",
                "Unknown"
            )
        )

        confidence = str(
            result.get(
                "confidence",
                "0%"
            )
        )

        description = str(
            result.get(
                "description",
                ""
            )
        )

        treatment = str(
            result.get(
                "treatment",
                ""
            )
        )

        prevention = str(
            result.get(
                "prevention",
                "No prevention available."
            )
        )

        # --------------------------------
        # Save Disease History
        # --------------------------------

        print("STEP 6: Creating disease history")

        history = DiseaseHistory(

            user_id=current_user.id,

            image_url=image_path,

            category=category,

            disease_name=disease_name,

            confidence=confidence,

            description=description,

            treatment=treatment,

            prevention=prevention

        )

        db.add(history)

        db.commit()

        db.refresh(history)

        print(
            "STEP 7: Disease history saved"
        )

        print(
            "History ID:",
            history.id
        )

        # --------------------------------
        # Generate PDF Report
        # --------------------------------

        print("STEP 8: Generating PDF report")

        pdf_path = generate_pdf(
            history=history,
            current_user=current_user
        )

        print(
            "STEP 9: PDF generated:",
            pdf_path
        )

        # --------------------------------
        # Send Email
        # --------------------------------

        print("STEP 10: Sending email")

        email_sent = send_report_email(

            to_email=current_user.email,

            farmer_name=current_user.full_name,

            disease_name=history.disease_name,

            confidence=history.confidence,

            pdf_path=pdf_path

        )

        print(
            "STEP 11: Email result:",
            email_sent
        )

        # --------------------------------
        # API Response
        # --------------------------------

        print("STEP 12: Preparing API response")

        response = DiseaseResponse(

            category=category,

            disease_name=disease_name,

            confidence=confidence,

            description=description,

            treatment=treatment,

            prevention=prevention,

            history_id=history.id,

            pdf_url=pdf_path,

            email_sent=email_sent

        )

        print(
            "STEP 13: Disease Detection SUCCESS"
        )

        print("=" * 60)

        return response

    except HTTPException:
        raise

    except Exception as e:

        # --------------------------------
        # Rollback Database
        # --------------------------------

        try:
            db.rollback()
        except Exception:
            pass

        print("=" * 60)
        print("DISEASE DETECTION ERROR")
        print("Error Type:", type(e).__name__)
        print("Error:", str(e))
        print("=" * 60)

        raise HTTPException(
            status_code=500,
            detail=f"Disease detection failed: {str(e)}"
        )


# ===================================
# Disease History API
# ===================================

@router.get("/history")
def get_disease_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    print(
        "Fetching disease history for user:",
        current_user.id
    )

    history = (

        db.query(DiseaseHistory)

        .filter(
            DiseaseHistory.user_id == current_user.id
        )

        .order_by(
            DiseaseHistory.created_at.desc()
        )

        .all()

    )

    print(
        "Disease history records:",
        len(history)
    )

    return history