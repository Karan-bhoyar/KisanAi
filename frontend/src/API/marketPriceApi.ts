import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

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
        const response = await axios.get<MarketPriceResponse>(
            `${API_BASE_URL}/market-price/latest`,
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
        // RETURN DATA + SOURCE
        // ========================================

        return {
            ...response.data.data,
            source: response.data.source,
        };

    } catch (error) {

        console.error(
            "Market Price API Error:",
            error
        );

        // ========================================
        // AXIOS ERROR
        // ========================================

        if (axios.isAxiosError(error)) {

            console.error(
                "API Response:",
                error.response?.data
            );

            // 404
            if (error.response?.status === 404) {
                throw new Error(
                    "No market price data found for the selected crop, district and mandi."
                );
            }

            // 500
            if (error.response?.status === 500) {
                throw new Error(
                    "Server error while fetching market prices."
                );
            }

            // Other errors
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