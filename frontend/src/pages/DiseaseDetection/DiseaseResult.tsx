interface DiseaseResultProps {
    result: {
        category: string;
        disease_name: string;
        confidence: string;
        description: string;
        treatment: string;
        prevention: string;
        history_id: number;
        pdf_url: string;
        email_sent: boolean;
    } | null;

    loading: boolean;
}


function DiseaseResult({
    result,
    loading,
}: DiseaseResultProps) {


    // ==========================================
    // Loading State
    // ==========================================

    if (loading) {

        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6 text-center">

                <h2 className="text-2xl font-bold text-green-700 mb-4">
                    🔍 Detecting Disease...
                </h2>

                <p className="text-gray-600 animate-pulse">
                    🌿 AI is analyzing the crop leaf image...
                </p>

            </div>
        );

    }


    // ==========================================
    // Empty State
    // ==========================================

    if (!result) {

        return (
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

                <h2 className="text-2xl font-bold text-green-700 mb-6">
                    🌱 Prediction Result
                </h2>

                <p className="text-gray-500">

                    Upload a leaf image and click

                    <span className="font-semibold">
                        {" "}Detect Disease
                    </span>

                    {" "}to get AI prediction.

                </p>

            </div>
        );

    }


    // ==========================================
    // Result
    // ==========================================

    return (

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

            {/* =================================
                Header
            ================================= */}

            <h2 className="text-2xl font-bold text-green-700 mb-6">
                🌿 Disease Prediction Result
            </h2>


            <div className="space-y-6">


                {/* =================================
                    Category
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        📂 Category
                    </h3>

                    <p className="text-xl font-bold text-green-700">
                        {result.category || "Unknown"}
                    </p>

                </div>


                {/* =================================
                    Disease Name
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        🦠 Disease Name
                    </h3>

                    <p className="text-xl font-bold text-red-600">
                        {result.disease_name || "Not detected"}
                    </p>

                </div>


                {/* =================================
                    Confidence
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        🎯 Confidence
                    </h3>

                    <p className="text-lg font-semibold text-blue-600">
                        {result.confidence || "Not available"}
                    </p>

                </div>


                {/* =================================
                    Description
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        📋 Description
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                        {result.description ||
                            "No description available."}
                    </p>

                </div>


                {/* =================================
                    Treatment
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        💊 Treatment
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                        {result.treatment ||
                            "No treatment information available."}
                    </p>

                </div>


                {/* =================================
                    Prevention
                ================================= */}

                <div>

                    <h3 className="font-semibold text-gray-700">
                        🛡 Prevention
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                        {result.prevention ||
                            "No prevention information available."}
                    </p>

                </div>


                {/* =================================
                    Email Status
                ================================= */}

                <div
                    className={`
                        rounded-xl
                        p-4
                        ${
                            result.email_sent
                                ? "bg-green-50"
                                : "bg-yellow-50"
                        }
                    `}
                >

                    <p className="text-sm text-gray-600">
                        📧 Report Email
                    </p>

                    <p
                        className={`
                            font-semibold
                            ${
                                result.email_sent
                                    ? "text-green-700"
                                    : "text-yellow-700"
                            }
                        `}
                    >

                        {
                            result.email_sent
                                ? "Report sent successfully to your email."
                                : "Report generated, but email could not be sent."
                        }

                    </p>

                </div>


                {/* =================================
                    PDF Report
                ================================= */}

                {
                    result.pdf_url && (

                        <div className="bg-blue-50 rounded-xl p-4">

                            <p className="text-sm text-gray-600 mb-2">
                                📄 Disease Report
                            </p>

                            <a
                                href={result.pdf_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    inline-block
                                    bg-blue-600
                                    text-white
                                    px-5
                                    py-2
                                    rounded-lg
                                    font-semibold
                                    hover:bg-blue-700
                                    transition
                                "
                            >
                                View PDF Report
                            </a>

                        </div>

                    )
                }


                {/* =================================
                    History ID
                ================================= */}

                <div className="bg-green-50 rounded-xl p-4">

                    <p className="text-sm text-gray-600">
                        Detection History ID
                    </p>

                    <p className="font-bold text-green-700">
                        #{result.history_id}
                    </p>

                </div>


            </div>

        </div>

    );

}


export default DiseaseResult;