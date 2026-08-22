from sqlalchemy.orm import Session

from app.models.farmer_profile import FarmerProfile
from app.models.user import User
from app.repositories.farmer_profile_repository import (
    FarmerProfileRepository,
)
from app.schemas.farmer_profile_schema import (
    FarmerProfileCreate,
    FarmerProfileUpdate,
)


class FarmerProfileService:

    @staticmethod
    def create_profile(
        db: Session,
        current_user: User,
        data: FarmerProfileCreate,
    ):

        existing = FarmerProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

        if existing:
            raise Exception("Farmer profile already exists")

        profile = FarmerProfile(
            user_id=current_user.id,
            village=data.village,
            district=data.district,
            state=data.state,
            land_area=data.land_area,
            soil_type=data.soil_type,
            main_crop=data.main_crop,
            irrigation_type=data.irrigation_type,
        )

        return FarmerProfileRepository.create(db, profile)

    @staticmethod
    def get_profile(
        db: Session,
        current_user: User,
    ):

        return FarmerProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

    @staticmethod
    def update_profile(
        db: Session,
        current_user: User,
        data: FarmerProfileUpdate,
    ):

        profile = FarmerProfileRepository.get_by_user_id(
            db,
            current_user.id,
        )

        if not profile:
            raise Exception("Farmer profile not found")

        profile.village = data.village
        profile.district = data.district
        profile.state = data.state
        profile.land_area = data.land_area
        profile.soil_type = data.soil_type
        profile.main_crop = data.main_crop
        profile.irrigation_type = data.irrigation_type

        return FarmerProfileRepository.update(db, profile)