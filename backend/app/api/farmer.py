from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.farmer_profile_schema import (
    FarmerProfileCreate,
    FarmerProfileUpdate,
    FarmerProfileResponse,
)

from app.services.farmer_profile_service import (
    FarmerProfileService,
)


router = APIRouter(
    prefix="/farmer",
    tags=["Farmer Profile"]
)


@router.post(
    "/profile",
    response_model=FarmerProfileResponse
)
def create_profile(
    data: FarmerProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:
        return FarmerProfileService.create_profile(
            db,
            current_user,
            data
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


@router.get(
    "/profile",
    response_model=FarmerProfileResponse
)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    profile = FarmerProfileService.get_profile(
        db,
        current_user
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Farmer profile not found"
        )

    return profile


@router.put(
    "/profile",
    response_model=FarmerProfileResponse
)
def update_profile(
    data: FarmerProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:
        return FarmerProfileService.update_profile(
            db,
            current_user,
            data
        )

    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )