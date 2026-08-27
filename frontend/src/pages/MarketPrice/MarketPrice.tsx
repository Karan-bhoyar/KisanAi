import { useEffect, useState } from "react";

import {
    IndianRupee,
    MapPin,
    CalendarDays,
    RefreshCw,
    Database,
    Search,
    TrendingUp,
} from "lucide-react";

import {
    getMarketPrices,
    type MarketPrice as MarketPriceType,
} from "../../API/marketPriceApi";

function MarketPrice() {
    const [price, setPrice] =
        useState<MarketPriceType | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [searched, setSearched] =
        useState(false);

    // ========================================
    // SEARCH FIELDS
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
    // LOAD MARKET PRICE
    // ========================================

    const loadMarketPrices = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getMarketPrices({
                crop: crop.trim(),
                state: state.trim() || undefined,
                district: district.trim() || undefined,
                market: market.trim() || undefined,
            });

            console.log(
                "Market Price API Response:",
                data
            );

            setPrice(data);
            setSearched(true);

        } catch (err) {
            console.error(
                "Market Price Error:",
                err
            );

            setPrice(null);
            setSearched(true);

            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError(
                    "Unable to fetch market price data."
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
    // LOADING
    // ========================================

    if (loading && !price) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">

                <div className="text-center bg-white rounded-3xl shadow-xl p-10 border border-green-100">

                    <RefreshCw
                        size={42}
                        className="animate-spin mx-auto mb-5 text-green-600"
                    />

                    <h2 className="text-xl font-bold text-green-700">
                        Loading Market Prices...
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Fetching the latest available mandi data.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 md:p-8">

            <div className="max-w-5xl mx-auto">

                {/* ========================================
                    HEADER
                ======================================== */}

                <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 mb-6">

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                        <div className="flex items-center gap-4">

                            <div className="w-14 h-14 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">

                                <IndianRupee
                                    className="text-white"
                                    size={29}
                                />

                            </div>

                            <div>

                                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">

                                    Market Prices

                                </h1>

                                <p className="text-gray-500 mt-1">

                                    Check mandi prices for agricultural crops

                                </p>

                            </div>

                        </div>

                        <div className="flex items-center gap-2 text-green-700 bg-green-50 px-4 py-2 rounded-xl">

                            <TrendingUp size={19} />

                            <span className="text-sm font-semibold">
                                Mandi Price
                            </span>

                        </div>

                    </div>

                </div>


                {/* ========================================
                    SEARCH
                ======================================== */}

                <div className="bg-white rounded-3xl shadow-lg border border-green-100 p-6 mb-6">

                    <div className="flex items-center gap-3 mb-5">

                        <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">

                            <Search
                                size={20}
                                className="text-green-700"
                            />

                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-gray-800">
                                Search Market Price
                            </h2>

                            <p className="text-sm text-gray-500">
                                Select crop and mandi location
                            </p>

                        </div>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                        {/* CROP */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Crop
                            </label>

                            <select
                                value={crop}
                                onChange={(e) =>
                                    setCrop(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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


                        {/* STATE */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                State
                            </label>

                            <select
                                value={state}
                                onChange={(e) =>
                                    setState(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            >

                                <option value="Maharashtra">
                                    Maharashtra
                                </option>

                            </select>

                        </div>


                        {/* DISTRICT */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                District
                            </label>

                            <select
                                value={district}
                                onChange={(e) =>
                                    setDistrict(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
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


                        {/* MANDI */}

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
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />

                        </div>

                    </div>


                    {/* SEARCH BUTTON */}

                    <button
                        onClick={loadMarketPrices}
                        disabled={loading}
                        className="mt-5 w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >

                        {loading ? (
                            <>
                                <RefreshCw
                                    size={19}
                                    className="animate-spin"
                                />

                                Fetching Prices...
                            </>
                        ) : (
                            <>
                                <Search size={19} />

                                Search Market Price
                            </>
                        )}

                    </button>

                </div>


                {/* ========================================
                    ERROR
                ======================================== */}

                {error && (

                    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 mb-6">

                        <div className="flex items-start gap-3">

                            <div className="text-red-600 text-xl">
                                ⚠️
                            </div>

                            <div>

                                <p className="font-bold text-red-700">
                                    Market Price Error
                                </p>

                                <p className="text-sm text-red-600 mt-1">
                                    {error}
                                </p>

                                <p className="text-xs text-red-500 mt-3">
                                    Try selecting another crop, district,
                                    or mandi.
                                </p>

                            </div>

                        </div>

                    </div>

                )}


                {/* ========================================
                    EMPTY STATE
                ======================================== */}

                {!price && !error && searched && (

                    <div className="bg-white rounded-3xl shadow-lg p-8 text-center">

                        <Database
                            size={45}
                            className="mx-auto text-gray-400 mb-4"
                        />

                        <h2 className="text-xl font-bold text-gray-700">
                            No Market Data Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try a different crop, district, or mandi.
                        </p>

                    </div>

                )}


                {/* ========================================
                    RESULT
                ======================================== */}

                {price && (

                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                        {/* CROP + LOCATION */}

                        <div className="p-6 md:p-8 border-b border-gray-100">

                            <div className="flex flex-col md:flex-row md:justify-between gap-5">

                                <div>

                                    <div className="flex flex-wrap items-center gap-3">

                                        <h2 className="text-3xl font-extrabold text-gray-800">
                                            {price.crop}
                                        </h2>

                                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                                            MANDI PRICE
                                        </span>

                                    </div>


                                    <p className="text-gray-500 mt-2">

                                        Variety:{" "}

                                        <span className="font-semibold text-gray-700">
                                            {price.variety || "Not available"}
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

                                <div className="bg-gray-50 rounded-2xl px-6 py-4 min-w-[140px]">

                                    <p className="text-xs text-gray-500">
                                        Grade
                                    </p>

                                    <p className="font-bold text-gray-800 mt-1">
                                        {price.grade || "Not available"}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* PRICE SECTION */}

                        <div className="p-6 md:p-8">

                            <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 md:p-7 text-white shadow-lg">

                                <p className="text-sm opacity-90">
                                    Modal Price
                                </p>

                                <div className="flex items-center mt-2">

                                    <IndianRupee size={30} />

                                    <span className="text-4xl md:text-5xl font-extrabold">

                                        {Number(
                                            price.modal_price || 0
                                        ).toLocaleString("en-IN")}

                                    </span>

                                </div>

                                <p className="text-sm mt-2 opacity-90">
                                    Price per quintal
                                </p>

                            </div>


                            {/* MIN MAX */}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                                <div className="bg-red-50 border border-red-100 rounded-2xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Minimum Price
                                    </p>

                                    <p className="text-2xl font-bold text-red-600 mt-1">

                                        ₹
                                        {Number(
                                            price.minimum_price || 0
                                        ).toLocaleString("en-IN")}

                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Per quintal
                                    </p>

                                </div>


                                <div className="bg-green-50 border border-green-100 rounded-2xl p-5">

                                    <p className="text-sm text-gray-500">
                                        Maximum Price
                                    </p>

                                    <p className="text-2xl font-bold text-green-600 mt-1">

                                        ₹
                                        {Number(
                                            price.maximum_price || 0
                                        ).toLocaleString("en-IN")}

                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        Per quintal
                                    </p>

                                </div>

                            </div>


                            {/* INFORMATION */}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

                                {/* MARKET */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <div className="flex items-start gap-3">

                                        <MapPin
                                            size={20}
                                            className="text-green-600 mt-1"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Market Location
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {price.market}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                {price.district},{" "}
                                                {price.state}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* ARRIVAL DATE */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <div className="flex items-start gap-3">

                                        <CalendarDays
                                            size={20}
                                            className="text-green-600 mt-1"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Arrival Date
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {price.arrival_date || "Not available"}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                {/* RECORD YEAR */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <p className="text-xs text-gray-500">
                                        Record Year
                                    </p>

                                    <p className="text-xl font-bold text-gray-800 mt-1">
                                        {price.record_year || "Not available"}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {price.data_status || "Data status unavailable"}
                                    </p>

                                </div>


                                {/* DATA SOURCE */}

                                <div className="bg-gray-50 rounded-2xl p-5">

                                    <div className="flex items-start gap-3">

                                        <Database
                                            size={20}
                                            className="text-blue-600 mt-1"
                                        />

                                        <div>

                                            <p className="text-xs text-gray-500">
                                                Data Source
                                            </p>

                                            <p className="font-semibold text-gray-800 mt-1">
                                                {price.source || "data.gov.in"}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default MarketPrice;