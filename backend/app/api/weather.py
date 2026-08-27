from fastapi import APIRouter, HTTPException
import requests

from app.core.config import settings


router = APIRouter(
    prefix="/api/weather",
    tags=["Weather Agent"]
)


@router.get("/")
def get_weather(city: str = "Pune"):

    city = city.strip()

    if not city:
        raise HTTPException(
            status_code=400,
            detail="City name is required"
        )

    api_key = settings.OPENWEATHER_API_KEY

    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="Weather API key not configured"
        )

    url = "https://api.openweathermap.org/data/2.5/weather"

    params = {
        "q": city,
        "appid": api_key,
        "units": "metric"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

    except requests.RequestException as error:

        print("Weather API Error:", error)

        raise HTTPException(
            status_code=502,
            detail="Unable to connect to weather service"
        )

    print(
        "OPENWEATHER STATUS:",
        response.status_code
    )

    if response.status_code == 401:

        raise HTTPException(
            status_code=500,
            detail="Invalid OpenWeather API key"
        )

    if response.status_code == 404:

        raise HTTPException(
            status_code=404,
            detail=f"Weather not found for city: {city}"
        )

    if response.status_code != 200:

        print(
            "OPENWEATHER RESPONSE:",
            response.text
        )

        raise HTTPException(
            status_code=502,
            detail="OpenWeather service error"
        )

    data = response.json()

    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]
    wind_speed = data["wind"]["speed"]

    weather = data["weather"][0]["main"]
    description = data["weather"][0]["description"]


    # ==========================================
    # IRRIGATION ADVICE
    # ==========================================

    if temperature >= 35:

        irrigation = (
            "High temperature detected. "
            "Irrigation may be required."
        )

    elif temperature <= 20:

        irrigation = (
            "Temperature is relatively low. "
            "Avoid unnecessary irrigation."
        )

    else:

        irrigation = (
            "Temperature is suitable. "
            "Follow your normal irrigation schedule."
        )


    # ==========================================
    # SPRAYING ADVICE
    # ==========================================

    if weather in [
        "Rain",
        "Drizzle",
        "Thunderstorm"
    ]:

        spraying = (
            "Avoid spraying pesticides or fertilizers "
            "because rainfall is expected."
        )

    elif wind_speed > 8:

        spraying = (
            "Avoid spraying because wind speed is high."
        )

    else:

        spraying = (
            "Weather conditions are suitable for spraying."
        )


    # ==========================================
    # WEATHER WARNING
    # ==========================================

    if weather == "Thunderstorm":

        warning = (
            "⚠️ Thunderstorm warning. "
            "Protect crops and farm equipment."
        )

    elif temperature >= 40:

        warning = (
            "🔥 Extreme heat warning. "
            "Provide sufficient water to crops."
        )

    elif weather in ["Rain", "Drizzle"]:

        warning = (
            "🌧️ Rain expected. "
            "Check drainage and avoid unnecessary irrigation."
        )

    else:

        warning = (
            "✅ No major weather warning."
        )


    # ==========================================
    # RESPONSE
    # ==========================================

    return {
        "city": city,
        "temperature": temperature,
        "humidity": humidity,
        "wind_speed": wind_speed,
        "weather": weather,
        "description": description,
        "irrigation_advice": irrigation,
        "spraying_advice": spraying,
        "warning": warning
    }