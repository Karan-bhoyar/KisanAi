from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.market_price_service import (
    get_latest_price,
    get_historical_prices,
    calculate_trend,
    generate_recommendation
)


router = APIRouter(
    prefix="/api/market",
    tags=["Market Price Agent"]
)


@router.get("/current")
def current_price(
    crop: str,
    mandi: str | None = None,
    db: Session = Depends(get_db)
):

    price = get_latest_price(
        db,
        crop,
        mandi
    )

    if not price:

        raise HTTPException(
            status_code=404,
            detail="Market price not found"
        )

    return {
        "id": price.id,
        "crop": price.crop,
        "mandi": price.mandi,
        "state": price.state,
        "min_price": price.min_price,
        "max_price": price.max_price,
        "modal_price": price.modal_price,
        "price_date": price.price_date
    }


@router.get("/history")
def market_history(
    crop: str,
    mandi: str,
    limit: int = 30,
    db: Session = Depends(get_db)
):

    prices = get_historical_prices(
        db,
        crop,
        mandi,
        limit
    )

    return [
        {
            "date": price.price_date,
            "modal_price": price.modal_price,
            "min_price": price.min_price,
            "max_price": price.max_price
        }
        for price in reversed(prices)
    ]


@router.get("/trend")
def market_trend(
    crop: str,
    mandi: str,
    db: Session = Depends(get_db)
):

    prices = get_historical_prices(
        db,
        crop,
        mandi,
        2
    )

    if len(prices) < 2:

        raise HTTPException(
            status_code=404,
            detail="Not enough historical data"
        )

    current = prices[0]
    previous = prices[1]

    trend = calculate_trend(
        current.modal_price,
        previous.modal_price
    )

    return {
        "crop": crop,
        "mandi": mandi,
        "current_price": current.modal_price,
        "previous_price": previous.modal_price,
        **trend
    }


@router.get("/recommendation")
def market_recommendation(
    crop: str,
    mandi: str,
    db: Session = Depends(get_db)
):

    prices = get_historical_prices(
        db,
        crop,
        mandi,
        2
    )

    if len(prices) < 2:

        raise HTTPException(
            status_code=404,
            detail="Not enough historical data"
        )

    current = prices[0]
    previous = prices[1]

    recommendation = generate_recommendation(
        current.modal_price,
        previous.modal_price
    )

    return {
        "crop": crop,
        "mandi": mandi,
        "current_price": current.modal_price,
        **recommendation
    }