import { useState } from "react";

import DiseaseUpload from "./DiseaseUpload";
import DiseaseResult from "./DiseaseResult";

import { predictDisease } from "../../API/diseaseApi";

import { useNavigate } from "react-router-dom";

import {
    Leaf,
    History,
    ScanLine
} from "lucide-react";


// ==========================================
// Disease Result Type
// ==========================================

interface DiseaseResultType {

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
// Disease Detection Page
// ==========================================

function DiseaseDetectionPage() {

    const navigate = useNavigate();


    const [image, setImage] =
        useState<File | null>(null);


    const [result, setResult] =
        useState<DiseaseResultType | null>(null);


    const [loading, setLoading] =
        useState(false);


    // ==========================================
    // Detect Disease
    // ==========================================

    const handlePredict = async () => {

        if (!image) {

            alert(
                "Please upload an image first."
            );

            return;

        }


        try {

            setLoading(true);

            setResult(null);


            console.log(
                "Starting disease detection..."
            );

            console.log(
                "Image:",
                image.name
            );


            const data =
                await predictDisease(image);


            console.log(
                "Disease detection response:",
                data
            );


            setResult(data);

        }
        catch (error: any) {

            console.error(
                "Disease Detection Error:",
                error
            );


            // Axios error response

            if (error?.response) {

                console.error(
                    "Status:",
                    error.response.status
                );

                console.error(
                    "Backend response:",
                    error.response.data
                );


                const message =
                    error.response.data?.detail ||
                    "Disease detection failed.";

                alert(message);

            }
            else {

                alert(
                    error?.message ||
                    "Disease detection failed. Please try again."
                );

            }

        }
        finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-gradient-to-br
                from-green-50
                via-white
                to-emerald-100
                p-4
                md:p-8
            "
        >

            {/* =================================
                Floating Background
            ================================= */}

            <div
                className="
                    absolute
                    top-20
                    left-10
                    text-6xl
                    opacity-20
                    animate-bounce
                "
            >
                🌱
            </div>


            <div
                className="
                    absolute
                    right-20
                    top-40
                    text-6xl
                    opacity-20
                    animate-pulse
                "
            >
                🌾
            </div>


            <div
                className="
                    absolute
                    bottom-20
                    left-1/3
                    text-5xl
                    opacity-20
                    animate-bounce
                "
            >
                🍃
            </div>


            {/* =================================
                Main Container
            ================================= */}

            <div
                className="
                    relative
                    max-w-5xl
                    mx-auto
                "
            >

                {/* =================================
                    HEADER
                ================================= */}

                <div
                    className="
                        flex
                        flex-col
                        md:flex-row
                        justify-between
                        items-center
                        gap-5
                        mb-8
                    "
                >

                    <div>

                        <h1
                            className="
                                text-3xl
                                md:text-4xl
                                font-bold
                                text-green-700
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <Leaf />

                            Disease Detection

                        </h1>


                        <p
                            className="
                                text-gray-600
                                mt-2
                            "
                        >

                            AI powered crop disease analysis 🌿

                        </p>

                    </div>


                    {/* History Button */}

                    <button
                        onClick={() =>
                            navigate("/disease/history")
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            bg-green-700
                            text-white
                            px-6
                            py-3
                            rounded-xl
                            shadow-lg
                            hover:scale-105
                            transition
                        "
                    >

                        <History size={20} />

                        History

                    </button>

                </div>


                {/* =================================
                    IMAGE UPLOAD
                ================================= */}

                <DiseaseUpload
                    image={image}
                    setImage={setImage}
                />


                {/* =================================
                    DETECT BUTTON
                ================================= */}

                <div
                    className="
                        flex
                        justify-center
                        mt-8
                    "
                >

                    <button
                        onClick={handlePredict}
                        disabled={loading}
                        className="
                            flex
                            items-center
                            gap-3
                            bg-gradient-to-r
                            from-green-700
                            to-emerald-500
                            text-white
                            px-10
                            py-4
                            rounded-2xl
                            font-bold
                            text-lg
                            shadow-xl
                            hover:scale-105
                            transition
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        <ScanLine size={22} />


                        {
                            loading
                                ? "AI Scanning..."
                                : "Detect Disease"
                        }

                    </button>

                </div>


                {/* =================================
                    RESULT
                ================================= */}

                <div
                    className="
                        mt-8
                    "
                >

                    <DiseaseResult
                        result={result}
                        loading={loading}
                    />

                </div>

            </div>

        </div>

    );

}


export default DiseaseDetectionPage;