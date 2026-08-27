import axios from "axios";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";

export interface WeatherData {
    city: string;
    temperature: number;
    humidity: number;
    wind_speed: number;
    weather: string;
    description: string;
    irrigation_advice: string;
    spraying_advice: string;
    warning: string;
}

export async function getWeather(
    city: string
): Promise<WeatherData> {

    const token = localStorage.getItem("token");

    console.log(
        "Weather API URL:",
        `${API_URL}/api/weather/`
    );

    try {

        const response = await axios.get<WeatherData>(
            `${API_URL}/api/weather/`,
            {
                params: {
                    city: city.trim(),
                },

                headers: token
                    ? {
                          Authorization: `Bearer ${token}`,
                      }
                    : {},
            }
        );

        console.log(
            "Weather Response:",
            response.data
        );

        return response.data;

    } catch (error) {

        if (axios.isAxiosError(error)) {

            console.error(
                "Weather API Error:",
                error
            );

            console.error(
                "Status:",
                error.response?.status
            );

            console.error(
                "Response:",
                error.response?.data
            );

        } else {

            console.error(
                "Weather API Error:",
                error
            );

        }

        throw error;
    }
}