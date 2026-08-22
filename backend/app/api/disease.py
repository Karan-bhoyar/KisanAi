from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

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

    # --------------------------------
    # Create Upload Folder
    # --------------------------------
    os.makedirs("uploads", exist_ok=True)

    image_path = os.path.join(
        "uploads",
        file.filename
    )

    # --------------------------------
    # Save Uploaded Image
    # --------------------------------
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # --------------------------------
    # Detect Disease
    # --------------------------------
    result = detect_disease(image_path)

    # --------------------------------
    # Save Disease History
    # --------------------------------
    history = DiseaseHistory(

        user_id=current_user.id,

        image_url=image_path,

        category=result.get(
            "category",
            "Unknown"
        ),

        disease_name=result.get(
            "disease_name",
            "Unknown"
        ),

        confidence=result.get(
            "confidence",
            "0%"
        ),

        description=result.get(
            "description",
            ""
        ),

        treatment=result.get(
            "treatment",
            ""
        ),

        prevention=result.get(
            "prevention",
            "No prevention available."
        )

    )

    db.add(history)
    db.commit()
    db.refresh(history)

    # --------------------------------
    # Generate PDF Report
    # --------------------------------
    pdf_path = generate_pdf(
        history=history,
        current_user=current_user
    )

    # --------------------------------
    # Send Email
    # --------------------------------
    email_sent = send_report_email(

        to_email=current_user.email,

        farmer_name=current_user.full_name,

        disease_name=history.disease_name,

        confidence=history.confidence,

        pdf_path=pdf_path

    )

    # --------------------------------
    # API Response
    # --------------------------------
    return DiseaseResponse(

        category=result.get(
            "category",
            "Unknown"
        ),

        disease_name=result.get(
            "disease_name",
            "Unknown"
        ),

        confidence=result.get(
            "confidence",
            "Unknown"
        ),

        description=result.get(
            "description",
            ""
        ),

        treatment=result.get(
            "treatment",
            ""
        ),

        prevention=result.get(
            "prevention",
            "No prevention available."
        ),

        history_id=history.id,

        pdf_url=pdf_path,

        email_sent=email_sent

    )


# ===================================
# Disease History API
# ===================================

@router.get("/history")
def get_disease_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

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

    return history