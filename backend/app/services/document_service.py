import os
import shutil

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.repositories.document_repository import DocumentRepository


UPLOAD_DIR = "uploads/pdfs"


class DocumentService:

    @staticmethod
    def upload_document(
        db: Session,
        file: UploadFile,
    ):
        os.makedirs(UPLOAD_DIR, exist_ok=True)

        file_path = os.path.join(
            UPLOAD_DIR,
            file.filename,
        )

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        return DocumentRepository.create(
            db=db,
            file_name=file.filename,
            file_path=file_path,
        )

    @staticmethod
    def get_documents(db: Session):
        return DocumentRepository.get_all(db)