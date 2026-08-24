import { useState } from "react";
import {
    CloudSun,
    Droplets,
    Wind,
    Thermometer,
    Sprout,
    AlertTriangle,
    Search,
    Loader2,
    SprayCan,
} from "lucide-react";

import { getWeather } from "../../API/weatherApi";

function WeatherAgent() {

    const [city, setCity] = useState("");

    const [weather, setWeather] =
        useState<any>(null);

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");



    const handleSearch = async () => {

        if (!city.trim()) {

            setError("Please enter your city name.");

            return;
        }

        try {

            setLoading(true);

            setError("");

            const data =
                await getWeather(city.trim());

            setWeather(data);

        }
        catch (error) {

            console.error(
                "Weather Error:",
                error
            );

            setWeather(null);

            setError(
                "Unable to fetch weather data."
            );

        }
        finally {

            setLoading(false);

        }

    };



    return (

        <div className="
            min-h-[calc(100vh-70px)]
            relative
            overflow-hidden
            bg-gradient-to-br
            from-green-50
            via-white
            to-emerald-100
            p-4
            md:p-8
        ">


            {/* Animated Background */}

            <div className="
                absolute
                -top-20
                -left-20
                w-72
                h-72
                bg-green-300/30
                rounded-full
                blur-3xl
                animate-pulse
            " />

            <div className="
                absolute
                top-1/2
                -right-20
                w-80
                h-80
                bg-emerald-300/30
                rounded-full
                blur-3xl
                animate-pulse
            " />



            <div className="
                relative
                max-w-5xl
                mx-auto
            ">


                {/* HEADER */}

                <div className="
                    text-center
                    mb-8
                ">

                    <div className="
                        inline-flex
                        items-center
                        justify-center
                        w-16
                        h-16
                        rounded-2xl
                        bg-gradient-to-br
                        from-green-600
                        to-emerald-500
                        text-white
                        shadow-xl
                        mb-4
                    ">

                        <CloudSun size={34} />

                    </div>


                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        text-green-800
                    ">

                        Weather Agent 🌦️

                    </h1>


                    <p className="
                        mt-2
                        text-gray-600
                    ">

                        Smart weather assistant for farmers

                    </p>

                </div>



                {/* SEARCH CARD */}

                <div className="
                    bg-white/80
                    backdrop-blur-xl
                    rounded-3xl
                    shadow-xl
                    border
                    border-green-100
                    p-5
                    md:p-6
                    mb-6
                ">


                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        gap-3
                    ">


                        <div className="
                            flex-1
                            relative
                        ">

                            <Search
                                size={20}
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />


                            <input

                                type="text"

                                value={city}

                                onChange={(e) =>
                                    setCity(e.target.value)
                                }

                                onKeyDown={(e) => {

                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }

                                }}

                                placeholder="Enter city name..."

                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    pl-12
                                    pr-4
                                    py-4
                                    outline-none
                                    focus:ring-2
                                    focus:ring-green-500
                                    focus:border-green-500
                                "
                            />

                        </div>



                        <button

                            onClick={handleSearch}

                            disabled={loading}

                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-7
                                py-4
                                rounded-2xl
                                bg-gradient-to-r
                                from-green-700
                                to-emerald-500
                                text-white
                                font-semibold
                                shadow-lg
                                hover:scale-105
                                transition
                                disabled:opacity-60
                                disabled:hover:scale-100
                            "
                        >

                            {loading ? (

                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />

                                    Checking...

                                </>

                            ) : (

                                <>
                                    <CloudSun size={20} />

                                    Check Weather
                                </>

                            )}

                        </button>


                    </div>


                    {error && (

                        <div className="
                            mt-4
                            flex
                            items-center
                            gap-2
                            text-red-600
                            bg-red-50
                            p-3
                            rounded-xl
                        ">

                            <AlertTriangle size={18} />

                            {error}

                        </div>

                    )}

                </div>



                {/* WEATHER RESULT */}

                {weather && (

                    <div className="
                        space-y-5
                        animate-in
                        fade-in
                        duration-500
                    ">


                        {/* MAIN WEATHER */}

                        <div className="
                            bg-gradient-to-br
                            from-green-700
                            via-emerald-600
                            to-green-500
                            rounded-3xl
                            p-6
                            md:p-8
                            text-white
                            shadow-2xl
                        ">


                            <div className="
                                flex
                                flex-col
                                md:flex-row
                                justify-between
                                items-center
                                gap-5
                            ">


                                <div>

                                    <p className="
                                        text-green-100
                                    ">
                                        Current Weather
                                    </p>

                                    <h2 className="
                                        text-3xl
                                        font-bold
                                        mt-1
                                    ">
                                        {weather.city}
                                    </h2>

                                    <p className="
                                        mt-2
                                        text-green-100
                                    ">
                                        {weather.description}
                                    </p>

                                </div>


                                <div className="
                                    text-center
                                ">

                                    <CloudSun
                                        size={55}
                                        className="mx-auto"
                                    />

                                    <p className="
                                        text-5xl
                                        font-bold
                                        mt-2
                                    ">
                                        {weather.temperature}°C
                                    </p>

                                    <p className="
                                        text-green-100
                                        mt-1
                                    ">
                                        {weather.weather}
                                    </p>

                                </div>


                            </div>

                        </div>



                        {/* WEATHER STATS */}

                        <div className="
                            grid
                            grid-cols-1
                            sm:grid-cols-3
                            gap-4
                        ">


                            <WeatherCard
                                icon={<Thermometer />}
                                title="Temperature"
                                value={`${weather.temperature}°C`}
                            />


                            <WeatherCard
                                icon={<Droplets />}
                                title="Humidity"
                                value={`${weather.humidity}%`}
                            />


                            <WeatherCard
                                icon={<Wind />}
                                title="Wind Speed"
                                value={`${weather.wind_speed} km/h`}
                            />


                        </div>



                        {/* FARM ADVICE */}

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">


                            <AdviceCard
                                icon={<Sprout />}
                                title="Irrigation Advice"
                                text={weather.irrigation_advice}
                            />


                            <AdviceCard
                                icon={<SprayCan />}
                                title="Spraying Advice"
                                text={weather.spraying_advice}
                            />


                        </div>



                        {/* WARNING */}

                        {weather.warning && (

                            <div className="
                                bg-amber-50
                                border
                                border-amber-200
                                rounded-2xl
                                p-5
                                flex
                                gap-4
                                items-start
                            ">

                                <div className="
                                    bg-amber-100
                                    text-amber-600
                                    p-3
                                    rounded-xl
                                ">

                                    <AlertTriangle />

                                </div>


                                <div>

                                    <h3 className="
                                        font-bold
                                        text-amber-800
                                    ">
                                        Weather Warning
                                    </h3>

                                    <p className="
                                        text-amber-700
                                        mt-1
                                    ">
                                        {weather.warning}
                                    </p>

                                </div>

                            </div>

                        )}

                    </div>

                )}


            </div>

        </div>

    );
}



function WeatherCard({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {

    return (

        <div className="
            bg-white/90
            backdrop-blur
            rounded-2xl
            p-5
            shadow-lg
            border
            border-green-100
            flex
            items-center
            gap-4
            hover:-translate-y-1
            transition
        ">

            <div className="
                w-12
                h-12
                rounded-xl
                bg-green-100
                text-green-700
                flex
                items-center
                justify-center
            ">

                {icon}

            </div>


            <div>

                <p className="
                    text-sm
                    text-gray-500
                ">
                    {title}
                </p>

                <p className="
                    text-xl
                    font-bold
                    text-gray-800
                ">
                    {value}
                </p>

            </div>

        </div>

    );
}



function AdviceCard({
    icon,
    title,
    text,
}: {
    icon: React.ReactNode;
    title: string;
    text: string;
}) {

    return (

        <div className="
            bg-white/90
            backdrop-blur
            rounded-2xl
            p-6
            shadow-lg
            border
            border-green-100
        ">


            <div className="
                flex
                items-center
                gap-3
                mb-4
            ">

                <div className="
                    w-11
                    h-11
                    rounded-xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                ">

                    {icon}

                </div>


                <h3 className="
                    font-bold
                    text-gray-800
                ">
                    {title}
                </h3>

            </div>


            <p className="
                text-gray-600
                leading-relaxed
            ">
                {text}
            </p>

        </div>

    );
}


export default WeatherAgent;
