from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.models.crop_recommendation import CropRecommendation

from app.schemas.crop import (
    CropRecommendationCreate,
    CropRecommendationResponse
)

from app.core.security import get_current_user


router = APIRouter(
    prefix="/crop",
    tags=["Crop Recommendation"]
)


# POST - Generate Crop Recommendation
@router.post(
    "/recommend",
    response_model=CropRecommendationResponse
)
async def recommend_crop(
    data: CropRecommendationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Temporary AI logic
    # Later replace with ML/LLM model

    if data.soil_type.lower() == "black":
        crop = "Cotton"
        reason = "Black soil is suitable for cotton cultivation"

    elif data.season.lower() == "winter":
        crop = "Wheat"
        reason = "Wheat grows well in winter season"

    else:
        crop = "Rice"
        reason = "Suitable crop based on given conditions"


    recommendation = CropRecommendation(

        user_id=current_user.id,

        soil_type=data.soil_type,

        land_area=data.land_area,

        season=data.season,

        location=data.location,

        recommended_crop=crop,

        reason=reason
    )


    db.add(recommendation)

    db.commit()

    db.refresh(recommendation)


    return recommendation



# GET - Crop Recommendation History
@router.get(
    "/history",
    response_model=list[CropRecommendationResponse]
)
async def crop_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    history = db.query(CropRecommendation).filter(
        CropRecommendation.user_id == current_user.id
    ).all()


    return history