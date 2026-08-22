from sqlalchemy.orm import Session

from app.models.farmer_profile import FarmerProfile


class FarmerProfileRepository:

    @staticmethod
    def get_by_user_id(db: Session, user_id: int):
        return (
            db.query(FarmerProfile)
            .filter(FarmerProfile.user_id == user_id)
            .first()
        )

    @staticmethod
    def create(db: Session, profile: FarmerProfile):
        db.add(profile)
        db.commit()
        db.refresh(profile)
        return profile

    @staticmethod
    def update(db: Session, profile: FarmerProfile):
        db.commit()
        db.refresh(profile)
        return profile