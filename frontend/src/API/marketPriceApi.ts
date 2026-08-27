import axios from "axios";

// ========================================
// API BASE URL
// ========================================

const API_BASE_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


// ========================================
// MARKET PRICE TYPE
// ========================================

export interface MarketPrice {
    crop: string;
    variety: string;
    market: string;
    district: string;
    state: string;

    minimum_price: number;
    maximum_price: number;
    modal_price: number;

    arrival_date: string;
    grade: string;

    record_year: number;
    current_year: number;
    is_current_year: boolean;
    data_status: string;

    source?: string;
}


// ========================================
// SEARCH PARAMETERS
// ========================================

export interface MarketPriceSearchParams {
    crop: string;
    state?: string;
    district?: string;
    market?: string;
}


// ========================================
// API RESPONSE
// ========================================

interface MarketPriceResponse {
    success: boolean;
    source: string;
    data: MarketPrice;
}


// ========================================
// GET MARKET PRICE
// ========================================

export const getMarketPrices = async (
    params: MarketPriceSearchParams
): Promise<MarketPrice> => {

    try {

        const response =
            await axios.get<MarketPriceResponse>(
                `${API_BASE_URL}/api/market-price/latest`,
                {
                    params: {
                        crop: params.crop,

                        ...(params.state && {
                            state: params.state,
                        }),

                        ...(params.district && {
                            district: params.district,
                        }),

                        ...(params.market && {
                            market: params.market,
                        }),
                    },
                }
            );


        console.log(
            "Market Price API URL:",
            `${API_BASE_URL}/api/market-price/latest`
        );

        console.log(
            "Market Price API Response:",
            response.data
        );


        // ========================================
        // CHECK SUCCESS
        // ========================================

        if (!response.data.success) {

            throw new Error(
                "Market price request failed."
            );

        }


        // ========================================
        // CHECK DATA
        // ========================================

        if (!response.data.data) {

            throw new Error(
                "No market price data found."
            );

        }


        // ========================================
        // RETURN DATA
        // ========================================

        return {

            ...response.data.data,

            source:
                response.data.source,

        };

    }


    catch (error) {

        console.error(
            "Market Price API Error:",
            error
        );


        // ========================================
        // AXIOS ERROR
        // ========================================

        if (axios.isAxiosError(error)) {

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );


            // ------------------------------------
            // 404
            // ------------------------------------

            if (
                error.response?.status === 404
            ) {

                throw new Error(
                    "No market price data found for the selected crop, district and mandi."
                );

            }


            // ------------------------------------
            // 401
            // ------------------------------------

            if (
                error.response?.status === 401
            ) {

                throw new Error(
                    "Authentication required. Please login again."
                );

            }


            // ------------------------------------
            // 500
            // ------------------------------------

            if (
                error.response?.status === 500
            ) {

                throw new Error(
                    "Server error while fetching market prices."
                );

            }


            // ------------------------------------
            // OTHER API ERRORS
            // ------------------------------------

            const detail =
                error.response?.data?.detail;


            throw new Error(
                detail ||
                "Unable to fetch market price data."
            );

        }


        // ========================================
        // NORMAL ERROR
        // ========================================

        if (error instanceof Error) {

            throw error;

        }


        throw new Error(
            "Something went wrong while fetching market prices."
        );

    }

};