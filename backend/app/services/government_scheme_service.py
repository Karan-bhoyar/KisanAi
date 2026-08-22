from sqlalchemy.orm import Session

from app.repositories.government_scheme_repository import GovernmentSchemeRepository
from app.schemas.government_scheme import GovernmentSchemeCreate


class GovernmentSchemeService:

    @staticmethod
    def create(db: Session, scheme: GovernmentSchemeCreate):
        return GovernmentSchemeRepository.create(db, scheme)

    @staticmethod
    def get_all(db: Session):
        return GovernmentSchemeRepository.get_all(db)

    @staticmethod
    def get_by_id(db: Session, scheme_id: int):
        return GovernmentSchemeRepository.get_by_id(db, scheme_id)

    @staticmethod
    def get_by_state(db: Session, state: str):
        return GovernmentSchemeRepository.get_by_state(db, state)