import axios from "axios";

// ======================================================
// RAILWAY BACKEND URL
// ======================================================

const API_URL =
    "https://kisanai-production-7b9c.up.railway.app";

// ======================================================
// AXIOS INSTANCE
// ======================================================

const api = axios.create({
    baseURL: API_URL,
    timeout: 60000,
});

// ======================================================
// REQUEST INTERCEPTOR
// Adds JWT token automatically
// ======================================================

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ======================================================
// RESPONSE INTERCEPTOR
// ======================================================

api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        console.error(
            "API ERROR:",
            error.response?.status,
            error.response?.data || error.message
        );

        // Unauthorized
        if (error.response?.status === 401) {
            localStorage.removeItem("token");

            alert(
                "Session expired. Please login again."
            );

            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

// ======================================================
// TYPES
// ======================================================

export interface ChatResponse {
    message?: string;
    response: string;
}

export interface ChatHistory {
    id: number;
    message: string;
    response: string;
    created_at: string;
}

export interface VoiceResponse {
    question: string;
    answer: string;
    audio: string;
    language: string;
    chat_id: number;
}

// ======================================================
// SEND TEXT MESSAGE
// POST /api/chat
// ======================================================

export const sendMessage = async (
    message: string,
    language: "hi" | "mr" | "en" = "hi"
): Promise<ChatResponse> => {

    const response = await api.post<ChatResponse>(
        "/api/chat",
        {
            message,
            language,
        }
    );

    return response.data;
};

// ======================================================
// GET CHAT HISTORY
// GET /api/chat/history
// ======================================================

export const getChatHistory =
    async (): Promise<ChatHistory[]> => {

        const response =
            await api.get<ChatHistory[]>(
                "/api/chat/history"
            );

        return response.data;
    };

// ======================================================
// VOICE CHAT
// POST /api/voice/?language=en
// ======================================================

export const voiceChat = async (
    audio: Blob,
    language: "hi" | "mr" | "en" = "hi"
): Promise<VoiceResponse> => {

    const formData = new FormData();

    formData.append(
        "file",
        audio,
        "voice.webm"
    );

    const response =
        await api.post<VoiceResponse>(
            `/api/voice/?language=${language}`,
            formData
        );

    return response.data;
};

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default api;