from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.government_scheme import (
    GovernmentSchemeCreate,
    GovernmentSchemeResponse,
)
from app.services.government_scheme_service import GovernmentSchemeService

router = APIRouter(
    prefix="/government-schemes",
    tags=["Government Schemes"],
)


@router.post("/", response_model=GovernmentSchemeResponse)
def create_scheme(
    scheme: GovernmentSchemeCreate,
    db: Session = Depends(get_db),
):
    return GovernmentSchemeService.create(db, scheme)


@router.get("/", response_model=list[GovernmentSchemeResponse])
def get_all_schemes(
    db: Session = Depends(get_db),
):
    return GovernmentSchemeService.get_all(db)


@router.get("/{scheme_id}", response_model=GovernmentSchemeResponse)
def get_scheme(
    scheme_id: int,
    db: Session = Depends(get_db),
):
    return GovernmentSchemeService.get_by_id(db, scheme_id)


@router.get("/state/{state}", response_model=list[GovernmentSchemeResponse])
def get_scheme_by_state(
    state: str,
    db: Session = Depends(get_db),
):
    return GovernmentSchemeService.get_by_state(db, state)