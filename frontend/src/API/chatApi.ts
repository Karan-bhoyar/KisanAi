import axios from "axios";

// ==========================
// API URL
// ==========================

const API_URL =
    "https://kisanai-production-7b9c.up.railway.app/api";

// ==========================
// Axios Instance
// ==========================

const api = axios.create({

    baseURL: API_URL,

});

// ==========================
// Request Interceptor
// ==========================

api.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ==========================
// Response Interceptor
// ==========================

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response?.status === 401) {

            localStorage.removeItem("token");

            alert(
                "Session Expired. Please Login Again."
            );

            window.location.href = "/login";

        }

        return Promise.reject(error);

    }

);

// ==========================
// Types
// ==========================

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

// ==========================
// Send Text Message
// ==========================

export const sendMessage = async (

    message: string,

    language: "hi" | "mr" | "en" = "hi"

): Promise<ChatResponse> => {

    const response = await api.post<ChatResponse>(

        "/chat",

        {

            message,

            language

        }

    );

    return response.data;

};

// ==========================
// Chat History
// ==========================

export const getChatHistory = async (

): Promise<ChatHistory[]> => {

    const response = await api.get<ChatHistory[]>(

        "/chat/history"

    );

    return response.data;

};

// ==========================
// Voice Chat
// ==========================

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

    const response = await api.post<VoiceResponse>(

        `/voice/?language=${language}`,

        formData,

        {

            headers: {

                "Content-Type":
                    "multipart/form-data"

            }

        }

    );

    return response.data;

};

export default api;
