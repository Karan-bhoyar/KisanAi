import axios from "axios";


const API_URL = "http://127.0.0.1:8000";



interface DiseaseResponse {

    category: string;

    disease_name: string;

    confidence: string;

    description: string;

    treatment: string;

    prevention: string;

    history_id: number;

}



interface DiseaseHistoryResponse {

    id: number;

    image_url: string;

    disease_name: string;

    description: string;

    treatment: string;

    created_at: string;

}



// Disease Prediction API

export const predictDisease = async (
    image: File
): Promise<DiseaseResponse> => {


    const formData = new FormData();


    formData.append(
        "file",
        image
    );


    const token = localStorage.getItem("token");


    if (!token) {
        throw new Error("Authentication token not found");
    }



    const response = await axios.post<DiseaseResponse>(

        `${API_URL}/disease/`,

        formData,

        {

            headers: {

                Authorization: `Bearer ${token}`,

                "Content-Type": "multipart/form-data"

            }

        }

    );


    return response.data;

};





// Disease History API

export const getDiseaseHistory = async (): Promise<DiseaseHistoryResponse[]> => {


    const token = localStorage.getItem("token");


    if (!token) {
        throw new Error("Authentication token not found");
    }



    const response = await axios.get<DiseaseHistoryResponse[]>(

        `${API_URL}/disease/history`,

        {

            headers: {

                Authorization: `Bearer ${token}`

            }

        }

    );


    return response.data;

};