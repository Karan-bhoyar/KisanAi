import axios from "axios";


// ==========================================
// API URL
// ==========================================

// Vercel:
// VITE_API_URL=https://your-railway-backend.up.railway.app
//
// Local development:
// VITE_API_URL=http://127.0.0.1:8000

const API_URL =
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000";


// ==========================================
// Disease Response
// ==========================================

interface DiseaseResponse {

    category: string;

    disease_name: string;

    confidence: string;

    description: string;

    treatment: string;

    prevention: string;

    history_id: number;

    pdf_url: string;

    email_sent: boolean;

}


// ==========================================
// Disease History Response
// ==========================================

interface DiseaseHistoryResponse {

    id: number;

    user_id: number;

    image_url: string;

    category: string;

    disease_name: string;

    confidence: string;

    description: string;

    treatment: string;

    prevention: string;

    created_at: string;

}


// ==========================================
// Get Authentication Token
// ==========================================

const getToken = (): string => {

    const token =
        localStorage.getItem("token");

    if (!token) {

        throw new Error(
            "Authentication token not found"
        );

    }

    return token;

};


// ==========================================
// Disease Prediction API
// ==========================================

export const predictDisease = async (
    image: File
): Promise<DiseaseResponse> => {

    const formData = new FormData();

    formData.append(
        "file",
        image
    );


    const token = getToken();


    try {

        console.log(
            "Disease API URL:",
            `${API_URL}/disease/`
        );

        const response =
            await axios.post<DiseaseResponse>(

                `${API_URL}/disease/`,

                formData,

                {
                    headers: {

                        Authorization:
                            `Bearer ${token}`

                    }

                }

            );


        console.log(
            "Disease API Response:",
            response.data
        );


        return response.data;

    }
    catch (error: any) {

        console.error(
            "Disease API Error:",
            error
        );


        if (error.response) {

            console.error(
                "Status:",
                error.response.status
            );

            console.error(
                "Response:",
                error.response.data
            );

        }
        else if (error.request) {

            console.error(
                "No response received from Railway:",
                error.request
            );

        }


        throw error;

    }

};


// ==========================================
// Disease History API
// ==========================================

export const getDiseaseHistory =
    async (): Promise<DiseaseHistoryResponse[]> => {

        const token = getToken();


        try {

            console.log(
                "Disease History API URL:",
                `${API_URL}/disease/history`
            );


            const response =
                await axios.get<DiseaseHistoryResponse[]>(

                    `${API_URL}/disease/history`,

                    {
                        headers: {

                            Authorization:
                                `Bearer ${token}`

                        }

                    }

                );


            console.log(
                "Disease History Response:",
                response.data
            );


            return response.data;

        }
        catch (error: any) {

            console.error(
                "Disease History API Error:",
                error
            );


            if (error.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Response:",
                    error.response.data
                );

            }
            else if (error.request) {

                console.error(
                    "No response received from Railway:",
                    error.request
                );

            }


            throw error;

        }

    };