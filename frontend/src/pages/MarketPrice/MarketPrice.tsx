import { useEffect, useState } from "react";

import {
    IndianRupee,
    MapPin,
    CalendarDays,
    RefreshCw,
    Database,
    Search,
} from "lucide-react";

import {
    getMarketPrices,
    type MarketPrice as MarketPriceType,
} from "../../API/marketPriceApi";

function MarketPrice() {

    // ========================================
    // PRICE DATA
    // ========================================

    const [price, setPrice] =
        useState<MarketPriceType | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    // ========================================
    // USER SELECTION
    // ========================================

    const [crop, setCrop] =
        useState("Wheat");

    const [state, setState] =
        useState("Maharashtra");

    const [district, setDistrict] =
        useState("Nandurbar");

    const [market, setMarket] =
        useState("Navapur");

    // ========================================
    // SEARCH MARKET PRICE
    // ========================================

    const loadMarketPrices = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getMarketPrices({

                crop: crop,

                state: state,

                district:
                    district || undefined,

                market:
                    market || undefined,

            });

            console.log(
                "Selected Market Data:",
                data
            );

            setPrice(data);

        } catch (err) {

            console.error(
                "Market Price Error:",
                err
            );

            setPrice(null);

            if (err instanceof Error) {

                setError(err.message);

            } else {

                setError(
                    "No market price data found for the selected location."
                );

            }

        } finally {

            setLoading(false);

        }

    };

    // ========================================
    // INITIAL LOAD
    // ========================================

    useEffect(() => {

        loadMarketPrices();

    }, []);

    // ========================================
    // LOADING SCREEN
    // ========================================

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-green-50">

                <div className="text-center">

                    <RefreshCw
                        size={35}
                        className="animate-spin mx-auto mb-4 text-green-600"
                    />

                    <p className="text-green-700 font-semibold">
                        Loading market prices...
                    </p>

                </div>

            </div>

        );

    }

    // ========================================
    // MAIN UI
    // ========================================

    return (

        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">

            {/* ========================================
                HEADER
            ======================================== */}

            <div className="max-w-5xl mx-auto mb-6">

                <div className="bg-white rounded-3xl shadow-lg p-6 border border-green-100">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center">

                            <IndianRupee
                                className="text-white"
                                size={28}
                            />

                        </div>

                        <div>

                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">

                                Market Prices

                            </h1>

                            <p className="text-gray-500">

                                Check mandi prices by location

                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ========================================
                SEARCH SECTION
            ======================================== */}

            <div className="max-w-5xl mx-auto mb-6">

                <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6">

                    <h2 className="text-xl font-bold text-gray-800 mb-5">

                        Search Market Price

                    </h2>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


                        {/* ========================================
                            CROP
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Crop

                            </label>

                            <select
                                value={crop}
                                onChange={(e) =>
                                    setCrop(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                            >

                                <option value="Wheat">
                                    Wheat
                                </option>

                                <option value="Rice">
                                    Rice
                                </option>

                                <option value="Cotton">
                                    Cotton
                                </option>

                                <option value="Soyabean">
                                    Soyabean
                                </option>

                                <option value="Onion">
                                    Onion
                                </option>

                                <option value="Maize">
                                    Maize
                                </option>

                            </select>

                        </div>


                        {/* ========================================
                            STATE
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                State

                            </label>

                            <select
                                value={state}
                                onChange={(e) =>
                                    setState(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                            >

                                <option value="Maharashtra">
                                    Maharashtra
                                </option>

                            </select>

                        </div>


                        {/* ========================================
                            CITY / DISTRICT
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                City / District

                            </label>

                            <select
                                value={district}
                                onChange={(e) =>
                                    setDistrict(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                            >

                                <option value="">
                                    All Districts
                                </option>

                                <option value="Nandurbar">
                                    Nandurbar
                                </option>

                                <option value="Pune">
                                    Pune
                                </option>

                                <option value="Nashik">
                                    Nashik
                                </option>

                                <option value="Nagpur">
                                    Nagpur
                                </option>

                                <option value="Yavatmal">
                                    Yavatmal
                                </option>

                                <option value="Amravati">
                                    Amravati
                                </option>

                                <option value="Akola">
                                    Akola
                                </option>

                            </select>

                        </div>


                        {/* ========================================
                            MANDI
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">

                                Mandi

                            </label>

                            <input
                                type="text"
                                value={market}
                                onChange={(e) =>
                                    setMarket(e.target.value)
                                }
                                placeholder="e.g. Navapur"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                            />

                        </div>

                    </div>


                    {/* ========================================
                        SEARCH BUTTON
                    ======================================== */}

                    <button
                        onClick={loadMarketPrices}
                        disabled={loading}
                        className="mt-5 w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
                    >

                        <Search size={19} />

                        Search Market Price

                    </button>

                </div>

            </div>


            {/* ========================================
                ERROR
            ======================================== */}

            {error && (

                <div className="max-w-5xl mx-auto mb-6">

                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 text-red-600">

                        <p className="font-semibold">
                            Market Price Error
                        </p>

                        <p className="text-sm mt-1">
                            {error}
                        </p>

                        <p className="text-xs mt-3 text-red-500">

                            Try:

                            {" "}Wheat → Maharashtra → Nandurbar → Navapur

                        </p>

                    </div>

                </div>

            )}


            {/* ========================================
                PRICE RESULT
            ======================================== */}

            {price && (

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">


                        {/* ========================================
                            CROP + LOCATION
                        ======================================== */}

                        <div className="p-6 md:p-8 border-b">

                            <div className="flex flex-col md:flex-row md:justify-between gap-5">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <h2 className="text-3xl font-bold text-gray-800">

                                            {price.crop}

                                        </h2>

                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">

                                            MANDI PRICE

                                        </span>

                                    </div>


                                    <p className="text-gray-500 mt-2">

                                        Variety:{" "}

                                        <span className="font-semibold text-gray-700">

                                            {price.variety ||
                                                "Not available"}

                                        </span>

                                    </p>


                                    <div className="flex items-center gap-2 text-gray-500 text-sm mt-3">

                                        <MapPin
                                            size={17}
                                            className="text-green-600"
                                        />

                                        <span>

                                            {price.market},{" "}

                                            {price.district},{" "}

                                            {price.state}

                                        </span>

                                    </div>

                                </div>


                                {/* GRADE */}

                                <div className="bg-gray-50 rounded-2xl px-5 py-4">

                                    <p className="text-xs text-gray-500">

                                        Grade

                                    </p>

                                    <p className="font-bold text-gray-800">

                                        {price.grade ||
                                            "Not available"}

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* ========================================
                            PRICE
                        ======================================== */}

                        <div className="p-6 md:p-8">


                            {/* MODAL PRICE */}

                            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 text-white">

                                <p className="text-sm opacity-90">

                                    Modal Price

                                </p>

                                <div className="flex items-center mt-2">

                                    <IndianRupee size={30} />

                                    <span className="text-4xl font-extrabold">

                                        {Number(
                                            price.modal_price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </span>

                                </div>

                                <p className="text-sm mt-2">

                                    Price per quintal

                                </p>

                            </div>


                            {/* ========================================
                                MIN MAX
                            ======================================== */}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">


                                {/* MINIMUM */}

                                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">

                                    <p className="text-sm text-gray-500">

                                        Minimum Price

                                    </p>

                                    <p className="text-2xl font-bold text-red-600">

                                        ₹
                                        {Number(
                                            price.minimum_price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>


                                {/* MAXIMUM */}

                                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

                                    <p className="text-sm text-gray-500">

                                        Maximum Price

                                    </p>

                                    <p className="text-2xl font-bold text-green-600">

                                        ₹
                                        {Number(
                                            price.maximum_price || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                    </p>

                                </div>

                            </div>


                            {/* ========================================
                                INFORMATION
                            ======================================== */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">


                                {/* MARKET LOCATION */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <p className="text-xs text-gray-500">

                                        Market Location

                                    </p>

                                    <p className="font-semibold">

                                        {price.market}

                                    </p>

                                    <p className="text-sm text-gray-500">

                                        {price.district},{" "}

                                        {price.state}

                                    </p>

                                </div>


                                {/* ARRIVAL DATE */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <div className="flex items-center gap-3">

                                        <CalendarDays
                                            size={20}
                                            className="text-green-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Arrival Date

                                            </p>

                                            <p className="font-semibold">

                                                {price.arrival_date}

                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* RECORD YEAR */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <p className="text-xs text-gray-500">

                                        Record Year

                                    </p>

                                    <p className="text-xl font-bold">

                                        {price.record_year}

                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">

                                        {price.data_status}

                                    </p>

                                </div>


                                {/* DATA SOURCE */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <div className="flex items-center gap-3">

                                        <Database
                                            size={20}
                                            className="text-blue-600"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">

                                                Data Source

                                            </p>

                                            <p className="font-semibold">

                                                {price.source ||
                                                    "data.gov.in"}

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default MarketPrice;