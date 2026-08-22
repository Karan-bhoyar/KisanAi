from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from app.services.market_price_service import (
    fetch_live_market_prices,
    get_latest_live_price,
    get_live_historical_prices,
    analyze_live_market_price,
)


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/api/market-price",
    tags=["Market Price"]
)


# =========================================================
# LIVE MARKET DATA
# =========================================================

@router.get("/live")
def get_live_market_price(

    state: str = Query(
        "Maharashtra"
    ),

    district: Optional[str] = Query(
        None
    ),

    crop: Optional[str] = Query(
        None
    ),

    market: Optional[str] = Query(
        None
    ),

    limit: int = Query(
        50,
        ge=1,
        le=1000
    )

):

    try:

        records = fetch_live_market_prices(

            state=state,

            district=district,

            commodity=crop,

            market=market,

            limit=limit

        )


        if not records:

            raise HTTPException(

                status_code=404,

                detail=(
                    "No live market price data found "
                    "for the selected filters."
                )

            )


        return {

            "success": True,

            "source":
                "data.gov.in",

            "count":
                len(records),

            "filters": {

                "state":
                    state,

                "district":
                    district,

                "crop":
                    crop,

                "market":
                    market

            },

            "records":
                records

        }


    except HTTPException:

        raise


    except Exception as e:

        print(
            "============================================================"
        )

        print(
            "LIVE MARKET PRICE ERROR"
        )

        print(
            repr(e)
        )

        print(
            "============================================================"
        )


        raise HTTPException(

            status_code=503,

            detail=str(e)

        )


# =========================================================
# LATEST PRICE
# =========================================================

@router.get("/latest")
def get_latest_price(

    crop: str = Query(...),

    state: str = Query(
        "Maharashtra"
    ),

    district: Optional[str] = Query(
        None
    ),

    market: Optional[str] = Query(
        None
    )

):

    try:

        result = get_latest_live_price(

            crop=crop,

            state=state,

            district=district,

            market=market

        )


        if not result:

            raise HTTPException(

                status_code=404,

                detail=(
                    f"No latest price found "
                    f"for {crop}"
                )

            )


        return {

            "success": True,

            "source":
                "data.gov.in",

            "data":
                result

        }


    except HTTPException:

        raise


    except Exception as e:

        print(
            "LATEST MARKET PRICE ERROR:",
            repr(e)
        )


        raise HTTPException(

            status_code=503,

            detail=str(e)

        )


# =========================================================
# HISTORICAL PRICE
# =========================================================

@router.get("/history")
def get_market_history(

    crop: str = Query(...),

    state: str = Query(
        "Maharashtra"
    ),

    district: Optional[str] = Query(
        None
    ),

    market: Optional[str] = Query(
        None
    ),

    limit: int = Query(
        30,
        ge=1,
        le=100
    )

):

    try:

        prices = get_live_historical_prices(

            crop=crop,

            state=state,

            district=district,

            market=market,

            limit=limit

        )


        if not prices:

            raise HTTPException(

                status_code=404,

                detail=(
                    "No market history found."
                )

            )


        return {

            "success": True,

            "source":
                "data.gov.in",

            "count":
                len(prices),

            "historical_prices":
                prices

        }


    except HTTPException:

        raise


    except Exception as e:

        raise HTTPException(

            status_code=503,

            detail=str(e)

        )


# =========================================================
# MARKET ANALYSIS
# =========================================================

@router.get("/analysis")
def market_price_analysis(

    crop: str = Query(...),

    state: str = Query(
        "Maharashtra"
    ),

    district: Optional[str] = Query(
        None
    ),

    market: Optional[str] = Query(
        None
    )

):

    try:

        result = analyze_live_market_price(

            crop=crop,

            state=state,

            district=district,

            market=market

        )


        if not result.get(
            "success"
        ):

            raise HTTPException(

                status_code=404,

                detail=result.get(

                    "message",

                    "No market price data found."

                )

            )


        return result


    except HTTPException:

        raise


    except Exception as e:

        raise HTTPException(

            status_code=503,

            detail=str(e)

        )