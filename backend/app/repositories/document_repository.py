from sqlalchemy.orm import Session

from app.models.document import Document


class DocumentRepository:

    @staticmethod
    def create(
        db: Session,
        file_name: str,
        file_path: str,
    ):
        document = Document(
            file_name=file_name,
            file_path=file_path,
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def get_all(db: Session):
        return db.query(Document).all()