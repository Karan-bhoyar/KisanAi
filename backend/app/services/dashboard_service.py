from sqlalchemy.orm import Session

from app.models.user import User
from app.repositories.farmer_profile_repository import (
    FarmerProfileRepository,
)


class DashboardService:

    @staticmethod
    def get_dashboard(
        db: Session,
        current_user: User,
    ):

        profile = FarmerProfileRepository.get_by_user_id(
            db,
            current_user.id
        )

        if not profile:
            raise Exception("Farmer profile not found")

        return {
            "farmer": {
                "name": current_user.full_name,
                "village": profile.village,
                "district": profile.district,
                "state": profile.state,
                "main_crop": profile.main_crop,
                "land_area": profile.land_area,
            },

            "weather": {
                "temperature": "28°C",
                "condition": "Sunny",
            },

            "features": [
                {
                    "name": "AI Chat",
                    "status": "Available",
                },
                {
                    "name": "Disease Detection",
                    "status": "Coming Soon",
                },
                {
                    "name": "Crop Recommendation",
                    "status": "Coming Soon",
                },
                {
                    "name": "Market Prices",
                    "status": "Coming Soon",
                },
            ],
        }