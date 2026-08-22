from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# ==========================================
# API ROUTES
# ==========================================

from app.api.auth import router as auth_router
from app.api.admin import router as admin_router
from app.api.farmer import router as farmer_router
from app.api.dashboard import router as dashboard_router
from app.api.voice import router as voice_router
from app.api.disease import router as disease_router

from app.api import crop
from app.api import weather
from app.api import government_scheme

from app.api.market_price import (
    router as market_price_router
)

from app.api.document import (
    router as document_router
)

# ==========================================
# CHAT ROUTE
# ==========================================

from app.routes.chat import (
    router as chat_router
)

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI(
    title="Kisan AI API",
    version="1.0.0"
)

# ==========================================
# STATIC FILES
# ==========================================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ==========================================
# AUTH
# ==========================================

app.include_router(
    auth_router
)

# ==========================================
# ADMIN
# ==========================================

app.include_router(
    admin_router
)

# ==========================================
# FARMER
# ==========================================

app.include_router(
    farmer_router
)

# ==========================================
# DASHBOARD
# ==========================================

app.include_router(
    dashboard_router
)

# ==========================================
# AI CHAT 🤖
# ==========================================

app.include_router(
    chat_router
)

# ==========================================
# VOICE AI 🎤
# ==========================================

app.include_router(
    voice_router
)

# ==========================================
# DISEASE DETECTION 🦠
# ==========================================

app.include_router(
    disease_router
)

# ==========================================
# CROP RECOMMENDATION 🌾
# ==========================================

app.include_router(
    crop.router
)

# ==========================================
# WEATHER AGENT 🌦️
# ==========================================

app.include_router(
    weather.router
)

# ==========================================
# GOVERNMENT SCHEMES 🏛️
# ==========================================

app.include_router(
    government_scheme.router
)

# ==========================================
# MARKET PRICE AGENT 📈
# ==========================================

app.include_router(
    market_price_router
)

# ==========================================
# DOCUMENT / RAG 📚
# ==========================================

app.include_router(
    document_router
)

# ==========================================
# ROOT
# ==========================================

@app.get("/")
def root():

    return {
        "message": "Kisan AI Backend Running 🚀",
        "version": "1.0.0",
        "agents": [
            "AI Chat",
            "Voice AI",
            "Disease Detection",
            "Crop Recommendation",
            "Weather",
            "Government Schemes",
            "Market Price",
            "RAG"
        ]
    }


