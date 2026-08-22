from sqlalchemy.orm import Session

from app.models.government_scheme import GovernmentScheme
from app.schemas.government_scheme import GovernmentSchemeCreate


class GovernmentSchemeRepository:

    @staticmethod
    def create(db: Session, scheme: GovernmentSchemeCreate):
        db_scheme = GovernmentScheme(**scheme.model_dump())

        db.add(db_scheme)
        db.commit()
        db.refresh(db_scheme)

        return db_scheme

    @staticmethod
    def get_all(db: Session):
        return db.query(GovernmentScheme).all()

    @staticmethod
    def get_by_id(db: Session, scheme_id: int):
        return (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.id == scheme_id)
            .first()
        )

    @staticmethod
    def get_by_state(db: Session, state: str):
        return (
            db.query(GovernmentScheme)
            .filter(GovernmentScheme.state == state)
            .all()
        )