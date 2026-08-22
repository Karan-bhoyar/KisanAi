from sqlalchemy.orm import Session

from app.models.market_price import MarketPrice
from app.schemas.market_price import MarketPriceCreate


class MarketPriceRepository:

    @staticmethod
    def create(db: Session, price: MarketPriceCreate):
        db_price = MarketPrice(**price.model_dump())

        db.add(db_price)
        db.commit()
        db.refresh(db_price)

        return db_price

    @staticmethod
    def get_all(db: Session):
        return db.query(MarketPrice).all()

    @staticmethod
    def get_by_crop(db: Session, crop_name: str):
        return (
            db.query(MarketPrice)
            .filter(MarketPrice.crop_name.ilike(f"%{crop_name}%"))
            .all()
        )

    @staticmethod
    def get_by_state(db: Session, state: str):
        return (
            db.query(MarketPrice)
            .filter(MarketPrice.state.ilike(f"%{state}%"))
            .all()
        )

    @staticmethod
    def get_by_market(db: Session, market_name: str):
        return (
            db.query(MarketPrice)
            .filter(MarketPrice.market_name.ilike(f"%{market_name}%"))
            .all()
        )