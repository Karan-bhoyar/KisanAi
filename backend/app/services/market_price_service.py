import os
import time
from typing import Optional

import requests
from dotenv import load_dotenv


# ============================================================
# LOAD ENVIRONMENT VARIABLES
# ============================================================

load_dotenv()


# ============================================================
# DATA.GOV.IN CONFIGURATION
# ============================================================

RESOURCE_ID = os.getenv(
    "MARKET_PRICE_RESOURCE_ID",
    "35985678-0d79-46b4-9ed6-6f13308a1d24"
)

API_KEY = os.getenv("DATA_GOV_API_KEY")

API_URL = (
    f"https://api.data.gov.in/resource/{RESOURCE_ID}"
)

if not API_KEY:
    print(
        "WARNING: DATA_GOV_API_KEY is not configured."
    )


# ============================================================
# REQUEST CONFIGURATION
# ============================================================

CONNECT_TIMEOUT = 10
READ_TIMEOUT = 60

MAX_RETRIES = 3

# Number of records fetched in each API request
PAGE_SIZE = 1000

# Maximum records that can be scanned while searching
# Maharashtra/Yavatmal/etc.
MAX_SCAN_RECORDS = 10000


# ============================================================
# NORMALIZE TEXT
# ============================================================

def normalize_text(value):
    if value is None:
        return ""

    return str(value).strip().lower()


# ============================================================
# DATE SORTING
# ============================================================

def date_key(record):
    """
    Convert Arrival_Date into sortable tuple.

    Supported:
        DD/MM/YYYY
        DD-MM-YYYY
    """

    date_value = record.get(
        "Arrival_Date",
        ""
    )

    if not date_value:
        return (0, 0, 0)

    try:
        date_value = (
            str(date_value)
            .replace("-", "/")
            .strip()
        )

        parts = date_value.split("/")

        if len(parts) != 3:
            return (0, 0, 0)

        day, month, year = parts

        return (
            int(year),
            int(month),
            int(day)
        )

    except Exception:
        return (0, 0, 0)


# ============================================================
# GET RECORD YEAR
# ============================================================

def get_record_year(record):
    """
    Extract year from Arrival_Date.

    Example:
        30/10/2025 -> 2025
    """

    date_value = record.get(
        "Arrival_Date",
        ""
    )

    if not date_value:
        return None

    try:
        date_value = (
            str(date_value)
            .replace("-", "/")
            .strip()
        )

        parts = date_value.split("/")

        if len(parts) != 3:
            return None

        return int(parts[2])

    except Exception:
        return None


# ============================================================
# SAFE FLOAT
# ============================================================

def safe_float(value):

    if value is None:
        return 0.0

    try:

        cleaned = (
            str(value)
            .replace(",", "")
            .strip()
        )

        if not cleaned:
            return 0.0

        return float(cleaned)

    except (
        ValueError,
        TypeError
    ):
        return 0.0


# ============================================================
# BUILD REQUEST PARAMETERS
# ============================================================

def build_params(
    state: Optional[str] = None,
    district: Optional[str] = None,
    commodity: Optional[str] = None,
    market: Optional[str] = None,
    limit: int = PAGE_SIZE,
    offset: int = 0
):

    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": limit,
        "offset": offset
    }

    if state:
        params["filters[State]"] = state

    if district:
        params["filters[District]"] = district

    if commodity:
        params["filters[Commodity]"] = commodity

    if market:
        params["filters[Market]"] = market

    return params


# ============================================================
# RAW DATA.GOV.IN REQUEST WITH RETRY
# ============================================================

def _request_data_gov(params):

    if not API_KEY:
        raise RuntimeError(
            "DATA_GOV_API_KEY is not configured in .env"
        )

    last_error = None

    for attempt in range(
        1,
        MAX_RETRIES + 1
    ):

        try:

            response = requests.get(
                API_URL,
                params=params,
                timeout=(
                    CONNECT_TIMEOUT,
                    READ_TIMEOUT
                ),
                headers={
                    "User-Agent":
                        "Kisan-AI/1.0"
                }
            )

            # ------------------------------------------------
            # TEMPORARY SERVER ERRORS
            # ------------------------------------------------

            if response.status_code in (
                429,
                502,
                503,
                504
            ):

                last_error = (
                    f"Government API returned "
                    f"{response.status_code}"
                )

                print(
                    f"data.gov.in temporary error: "
                    f"{response.status_code} "
                    f"(attempt "
                    f"{attempt}/{MAX_RETRIES})"
                )

                if attempt < MAX_RETRIES:

                    time.sleep(
                        attempt * 2
                    )

                    continue

                raise RuntimeError(
                    last_error
                )

            # ------------------------------------------------
            # HTTP ERROR
            # ------------------------------------------------

            response.raise_for_status()

            # ------------------------------------------------
            # JSON
            # ------------------------------------------------

            try:

                return response.json()

            except ValueError as e:

                raise RuntimeError(
                    "data.gov.in returned invalid JSON."
                ) from e

        # ----------------------------------------------------
        # TIMEOUT
        # ----------------------------------------------------

        except requests.exceptions.Timeout:

            last_error = (
                "data.gov.in API timed out."
            )

            print(
                f"data.gov.in timeout "
                f"(attempt "
                f"{attempt}/{MAX_RETRIES})"
            )

            if attempt < MAX_RETRIES:

                time.sleep(
                    attempt * 2
                )

                continue

        # ----------------------------------------------------
        # REQUEST ERROR
        # ----------------------------------------------------

        except requests.exceptions.RequestException as e:

            last_error = (
                f"data.gov.in request failed: "
                f"{str(e)}"
            )

            print(
                f"data.gov.in request error "
                f"(attempt "
                f"{attempt}/{MAX_RETRIES}): "
                f"{e}"
            )

            if attempt < MAX_RETRIES:

                time.sleep(
                    attempt * 2
                )

                continue

    raise RuntimeError(
        last_error
        or
        "Unable to fetch data from data.gov.in."
    )


# ============================================================
# FETCH ONE PAGE
# ============================================================

def _fetch_page(
    state: Optional[str] = None,
    district: Optional[str] = None,
    commodity: Optional[str] = None,
    market: Optional[str] = None,
    limit: int = PAGE_SIZE,
    offset: int = 0
):

    params = build_params(
        state=state,
        district=district,
        commodity=commodity,
        market=market,
        limit=limit,
        offset=offset
    )

    data = _request_data_gov(
        params
    )

    return data.get(
        "records",
        []
    )


# ============================================================
# LOCAL FILTER
# ============================================================

def _matches_filters(
    record,
    state=None,
    district=None,
    commodity=None,
    market=None
):

    # --------------------------------------------------------
    # STATE
    # --------------------------------------------------------

    if state:

        if normalize_text(
            record.get("State")
        ) != normalize_text(
            state
        ):

            return False

    # --------------------------------------------------------
    # DISTRICT
    # --------------------------------------------------------

    if district:

        if normalize_text(
            record.get("District")
        ) != normalize_text(
            district
        ):

            return False

    # --------------------------------------------------------
    # COMMODITY
    # --------------------------------------------------------

    if commodity:

        if normalize_text(
            record.get("Commodity")
        ) != normalize_text(
            commodity
        ):

            return False

    # --------------------------------------------------------
    # MARKET
    # --------------------------------------------------------

    if market:

        if normalize_text(
            record.get("Market")
        ) != normalize_text(
            market
        ):

            return False

    return True


# ============================================================
# FETCH MARKET PRICES
# ============================================================

def fetch_live_market_prices(
    state: str = "Maharashtra",
    district: Optional[str] = None,
    commodity: Optional[str] = None,
    market: Optional[str] = None,
    limit: int = 50
):

    """
    Fetch market prices from data.gov.in.

    Search strategy:

    1. Exact filters
    2. If exact result is empty, search broader state data
    3. Use pagination
    4. Apply local filtering
    5. Sort by actual Arrival_Date
    """

    # ========================================================
    # LIMIT VALIDATION
    # ========================================================

    if limit < 1:
        limit = 1

    if limit > 1000:
        limit = 1000

    # ========================================================
    # STEP 1
    # EXACT FILTER REQUEST
    # ========================================================

    try:

        exact_records = _fetch_page(
            state=state,
            district=district,
            commodity=commodity,
            market=market,
            limit=limit,
            offset=0
        )

        if exact_records:

            exact_records = [
                record
                for record in exact_records
                if _matches_filters(
                    record,
                    state=state,
                    district=district,
                    commodity=commodity,
                    market=market
                )
            ]

            exact_records.sort(
                key=date_key,
                reverse=True
            )

            if exact_records:

                print(
                    "Exact market-price filter matched:",
                    len(exact_records)
                )

                return exact_records[:limit]

    except Exception as e:

        print(
            "============================================================"
        )

        print(
            "EXACT DATA.GOV.IN REQUEST FAILED"
        )

        print(
            repr(e)
        )

        print(
            "Trying paginated broader search..."
        )

        print(
            "============================================================"
        )

    # ========================================================
    # STEP 2
    # PAGINATED BROADER STATE SEARCH
    # ========================================================

    all_filtered_records = []

    offset = 0

    scanned_records = 0

    while scanned_records < MAX_SCAN_RECORDS:

        try:

            records = _fetch_page(
                state=state,
                limit=PAGE_SIZE,
                offset=offset
            )

        except Exception as e:

            print(
                "============================================================"
            )

            print(
                "PAGINATED DATA.GOV.IN REQUEST FAILED"
            )

            print(
                repr(e)
            )

            print(
                "============================================================"
            )

            break

        # ----------------------------------------------------
        # NO MORE RECORDS
        # ----------------------------------------------------

        if not records:

            break

        # ----------------------------------------------------
        # UPDATE SCANNED COUNT
        # ----------------------------------------------------

        scanned_records += len(records)

        print(
            f"Market API page: "
            f"offset={offset}, "
            f"records={len(records)}, "
            f"scanned={scanned_records}"
        )

        # ----------------------------------------------------
        # LOCAL FILTERING
        # ----------------------------------------------------

        for record in records:

            if _matches_filters(
                record,
                state=state,
                district=district,
                commodity=commodity,
                market=market
            ):

                all_filtered_records.append(
                    record
                )

        # ----------------------------------------------------
        # IF WE FOUND ENOUGH DATA
        # ----------------------------------------------------

        if len(all_filtered_records) >= limit:

            break

        # ----------------------------------------------------
        # NEXT PAGE
        # ----------------------------------------------------

        offset += PAGE_SIZE

        # ----------------------------------------------------
        # LAST PAGE
        # ----------------------------------------------------

        if len(records) < PAGE_SIZE:

            break

    # ========================================================
    # SORT NEWEST FIRST
    # ========================================================

    all_filtered_records.sort(
        key=date_key,
        reverse=True
    )

    print(
        "============================================================"
    )

    print(
        "MARKET PRICE SEARCH RESULT"
    )

    print(
        "State:",
        state
    )

    print(
        "District:",
        district
    )

    print(
        "Crop:",
        commodity
    )

    print(
        "Market:",
        market
    )

    print(
        "Records found:",
        len(all_filtered_records)
    )

    print(
        "Records scanned:",
        scanned_records
    )

    print(
        "============================================================"
    )

    return all_filtered_records[:limit]


# ============================================================
# GET LATEST AVAILABLE PRICE
# ============================================================

def get_latest_live_price(
    crop: str,
    state: str = "Maharashtra",
    district: Optional[str] = None,
    market: Optional[str] = None
):

    """
    Get newest available market-price record.
    """

    records = fetch_live_market_prices(
        state=state,
        district=district,
        commodity=crop,
        market=market,
        limit=1000
    )

    if not records:
        return None

    # ========================================================
    # SORT NEWEST FIRST
    # ========================================================

    records.sort(
        key=date_key,
        reverse=True
    )

    latest = records[0]

    # ========================================================
    # RECORD YEAR
    # ========================================================

    record_year = get_record_year(
        latest
    )

    # ========================================================
    # CURRENT YEAR
    # ========================================================

    current_year = time.localtime().tm_year

    # ========================================================
    # CURRENT YEAR CHECK
    # ========================================================

    is_current_year = (
        record_year == current_year
        if record_year is not None
        else False
    )

    # ========================================================
    # DATA STATUS
    # ========================================================

    if is_current_year:

        data_status = (
            "Current year record"
        )

    else:

        data_status = (
            "Latest available historical record"
        )

    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "crop":
            latest.get(
                "Commodity"
            ),

        "variety":
            latest.get(
                "Variety"
            ),

        "market":
            latest.get(
                "Market"
            ),

        "district":
            latest.get(
                "District"
            ),

        "state":
            latest.get(
                "State"
            ),

        "minimum_price":
            safe_float(
                latest.get(
                    "Min_Price"
                )
            ),

        "maximum_price":
            safe_float(
                latest.get(
                    "Max_Price"
                )
            ),

        "modal_price":
            safe_float(
                latest.get(
                    "Modal_Price"
                )
            ),

        "arrival_date":
            latest.get(
                "Arrival_Date"
            ),

        "grade":
            latest.get(
                "Grade"
            ),

        "record_year":
            record_year,

        "current_year":
            current_year,

        "is_current_year":
            is_current_year,

        "data_status":
            data_status,

        "source":
            "data.gov.in"
    }


# ============================================================
# GET HISTORICAL MARKET PRICES
# ============================================================

def get_live_historical_prices(
    crop: str,
    state: str = "Maharashtra",
    district: Optional[str] = None,
    market: Optional[str] = None,
    limit: int = 30
):

    records = fetch_live_market_prices(
        state=state,
        district=district,
        commodity=crop,
        market=market,
        limit=min(
            max(limit * 3, 100),
            1000
        )
    )

    if not records:
        return []

    # ========================================================
    # SORT NEWEST FIRST
    # ========================================================

    records.sort(
        key=date_key,
        reverse=True
    )

    result = []

    for record in records:

        modal_price = safe_float(
            record.get(
                "Modal_Price"
            )
        )

        minimum_price = safe_float(
            record.get(
                "Min_Price"
            )
        )

        maximum_price = safe_float(
            record.get(
                "Max_Price"
            )
        )

        record_year = get_record_year(
            record
        )

        result.append({

            "date":
                record.get(
                    "Arrival_Date"
                ),

            "crop":
                record.get(
                    "Commodity"
                ),

            "variety":
                record.get(
                    "Variety"
                ),

            "market":
                record.get(
                    "Market"
                ),

            "district":
                record.get(
                    "District"
                ),

            "state":
                record.get(
                    "State"
                ),

            "minimum_price":
                minimum_price,

            "maximum_price":
                maximum_price,

            "modal_price":
                modal_price,

            "record_year":
                record_year
        })

        if len(result) >= limit:
            break

    return result


# ============================================================
# CALCULATE TREND
# ============================================================

def calculate_trend(
    current_price: float,
    previous_price: float
):

    current_price = float(
        current_price
    )

    previous_price = float(
        previous_price
    )

    # ========================================================
    # ZERO CHECK
    # ========================================================

    if previous_price == 0:

        return {
            "change": 0,
            "change_percentage": 0,
            "trend": "Stable"
        }

    # ========================================================
    # PRICE CHANGE
    # ========================================================

    change = (
        current_price -
        previous_price
    )

    change_percentage = (
        change /
        previous_price
    ) * 100

    # ========================================================
    # TREND
    # ========================================================

    if change_percentage > 2:

        trend = "Increasing"

    elif change_percentage < -2:

        trend = "Decreasing"

    else:

        trend = "Stable"

    return {

        "change":
            round(
                change,
                2
            ),

        "change_percentage":
            round(
                change_percentage,
                2
            ),

        "trend":
            trend
    }


# ============================================================
# SELL / WAIT RECOMMENDATION
# ============================================================

def generate_recommendation(
    current_price: float,
    previous_price: float
):

    trend_data = calculate_trend(
        current_price,
        previous_price
    )

    trend = trend_data[
        "trend"
    ]

    change_percentage = (
        trend_data[
            "change_percentage"
        ]
    )

    reasons = []

    # ========================================================
    # INCREASING
    # ========================================================

    if trend == "Increasing":

        recommendation = "WAIT"

        confidence = 75

        reasons.append(
            "Market price is increasing."
        )

        reasons.append(
            f"Price increased by "
            f"{change_percentage}%."
        )

        reasons.append(
            "Waiting may provide a better "
            "price if storage is available."
        )

    # ========================================================
    # DECREASING
    # ========================================================

    elif trend == "Decreasing":

        recommendation = "SELL NOW"

        confidence = 72

        reasons.append(
            "Market price is decreasing."
        )

        reasons.append(
            f"Price decreased by "
            f"{abs(change_percentage)}%."
        )

        reasons.append(
            "Selling now may reduce the "
            "risk of further price decline."
        )

    # ========================================================
    # STABLE
    # ========================================================

    else:

        recommendation = "HOLD / MONITOR"

        confidence = 60

        reasons.append(
            "Market price is relatively stable."
        )

        reasons.append(
            "Monitor the market before making "
            "a selling decision."
        )

    return {

        "trend":
            trend,

        "recommendation":
            recommendation,

        "confidence":
            confidence,

        "reasons":
            reasons
    }


# ============================================================
# COMPLETE LIVE MARKET ANALYSIS
# ============================================================

def analyze_live_market_price(
    crop: str,
    state: str = "Maharashtra",
    district: Optional[str] = None,
    market: Optional[str] = None
):

    prices = get_live_historical_prices(
        crop=crop,
        state=state,
        district=district,
        market=market,
        limit=30
    )

    # ========================================================
    # NO DATA
    # ========================================================

    if not prices:

        return {

            "success":
                False,

            "source":
                "data.gov.in",

            "message":
                "No live market price data found."
        }

    # ========================================================
    # CURRENT / LATEST
    # ========================================================

    current = prices[0]

    current_year = time.localtime().tm_year

    record_year = current.get(
        "record_year"
    )

    is_current_year = (
        record_year == current_year
        if record_year is not None
        else False
    )

    if is_current_year:

        data_status = (
            "Current year record"
        )

    else:

        data_status = (
            "Latest available historical record"
        )

    # ========================================================
    # ONLY ONE RECORD
    # ========================================================

    if len(prices) == 1:

        return {

            "success":
                True,

            "source":
                "data.gov.in",

            "data": {

                "crop":
                    current["crop"],

                "variety":
                    current["variety"],

                "market":
                    current["market"],

                "district":
                    current["district"],

                "state":
                    current["state"],

                "current_price":
                    current["modal_price"],

                "minimum_price":
                    current["minimum_price"],

                "maximum_price":
                    current["maximum_price"],

                "modal_price":
                    current["modal_price"],

                "arrival_date":
                    current["date"],

                "record_year":
                    record_year,

                "current_year":
                    current_year,

                "is_current_year":
                    is_current_year,

                "data_status":
                    data_status,

                "trend":
                    "Unknown",

                "change":
                    0,

                "change_percentage":
                    0,

                "recommendation":
                    "MONITOR",

                "confidence":
                    50,

                "reasons": [

                    "Only one market price "
                    "record is available.",

                    "More daily data is required "
                    "for trend analysis."
                ],

                "historical_prices":
                    prices
            }
        }

    # ========================================================
    # CURRENT / PREVIOUS
    # ========================================================

    previous = prices[1]

    current_price = float(
        current["modal_price"]
    )

    previous_price = float(
        previous["modal_price"]
    )

    # ========================================================
    # TREND
    # ========================================================

    trend_data = calculate_trend(
        current_price,
        previous_price
    )

    # ========================================================
    # RECOMMENDATION
    # ========================================================

    recommendation = generate_recommendation(
        current_price,
        previous_price
    )

    # ========================================================
    # FINAL RESPONSE
    # ========================================================

    return {

        "success":
            True,

        "source":
            "data.gov.in",

        "data": {

            "crop":
                current["crop"],

            "variety":
                current["variety"],

            "market":
                current["market"],

            "district":
                current["district"],

            "state":
                current["state"],

            "current_price":
                current_price,

            "minimum_price":
                current["minimum_price"],

            "maximum_price":
                current["maximum_price"],

            "modal_price":
                current["modal_price"],

            "arrival_date":
                current["date"],

            "record_year":
                record_year,

            "current_year":
                current_year,

            "is_current_year":
                is_current_year,

            "data_status":
                data_status,

            "previous_price":
                previous_price,

            "trend":
                trend_data["trend"],

            "change":
                trend_data["change"],

            "change_percentage":
                trend_data[
                    "change_percentage"
                ],

            "recommendation":
                recommendation[
                    "recommendation"
                ],

            "confidence":
                recommendation[
                    "confidence"
                ],

            "reasons":
                recommendation[
                    "reasons"
                ],

            "historical_prices":
                prices
        }
    }