# 🌾 KrishiSetu AI

### 🤖 AI-Powered Multilingual Agriculture Assistant

**Kisan AI (KrishiSetu AI)** is a full-stack AI-powered agriculture assistant that helps farmers with **crop recommendations, disease detection, weather guidance, market information, government schemes, and farming-related questions**.

The platform supports **Hindi, Marathi, and English** with both **text and voice interaction**.

---

## 🚀 Key Features

* 🤖 AI Farming Chat
* 🌱 Crop Recommendation
* 🦠 Crop Disease Detection
* 🌦️ Weather Guidance
* 💰 Market / Mandi Information
* 🏛️ Government Scheme Assistance
* 🎙️ Voice Interaction
* 🌐 Hindi, Marathi & English
* 🔐 JWT Authentication
* 💬 Chat History
* 📚 RAG-based Agricultural Knowledge

---

## 🔄 How It Works

```text
Farmer
   ↓
React + TypeScript
   ↓
FastAPI Backend
   ↓
Authentication + Processing
   ↓
RAG + Qdrant Vector Search
   ↓
AI / LLM
   ↓
Response in Selected Language
```

### 🎙️ Voice Flow

```text
Farmer speaks
      ↓
Audio Recording
      ↓
Speech-to-Text
      ↓
AI + RAG Processing
      ↓
Response
```

---

## 📚 RAG Pipeline

Agricultural and government documents are converted into embeddings and stored in **Qdrant**.

```text
PDF Documents
     ↓
Text Extraction
     ↓
Chunking
     ↓
Embeddings
     ↓
Qdrant
     ↓
Relevant Context
     ↓
LLM
     ↓
Final Answer
```

RAG helps the AI generate responses using relevant information from the stored agricultural knowledge base.

---

## 🏗️ Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* Python
* FastAPI
* REST APIs
* JWT Authentication

### AI & Data

* Generative AI
* LLMs
* RAG
* Embeddings
* Sarvam AI
* Qdrant
* PostgreSQL

### Tools

* Git & GitHub
* Docker
* Postman
* VS Code

---

## 📁 Project Structure

```text
kisan-ai/
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── API/
│
├── backend/
│   └── app/
│       ├── routes/
│       ├── models/
│       ├── schemas/
│       ├── services/
│       └── main.py
│
├── README.md
└── .gitignore
```

---

## ⚙️ Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Create a `.env` file for:

```env
DATABASE_URL=
SECRET_KEY=
SARVAM_API_KEY=
GEMINI_API_KEY=
QDRANT_URL=
QDRANT_API_KEY=
```

> ⚠️ Never commit `.env` or API keys to GitHub.

---

## 🔐 Authentication

The application uses **JWT authentication** for protected APIs.

```text
Login
 ↓
JWT Token
 ↓
API Request
 ↓
Backend Validation
 ↓
Access Granted
```

Expired or invalid tokens redirect the user back to the login page.

---

## 🎯 Project Goal

The goal of Kisan AI is to combine **AI, agricultural knowledge, regional languages, and voice interaction** into one platform to help farmers make smarter farming decisions.

---

## 👨‍💻 Developer

**Karan Bhoyar**

Computer Science Engineer | Full Stack Developer | Generative AI Enthusiast

**Skills:** React, TypeScript, Python, FastAPI, PostgreSQL, Generative AI, LLMs, RAG, Qdrant, REST APIs, Git & Docker.

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

### 🌾 Kisan AI — Smart Technology for Smarter Farming
