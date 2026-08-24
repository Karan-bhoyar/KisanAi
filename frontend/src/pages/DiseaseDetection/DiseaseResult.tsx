
interface DiseaseResultProps {
    result: {
        disease_name: string;
        confidence: string;
        description: string;
        treatment: string;
        prevention: string;
        history_id: number;
    } | null;

    loading: boolean;
}

function DiseaseResult({
    result,
    loading,
}: DiseaseResultProps) {

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


    return (
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-6">

            <h2 className="text-2xl font-bold text-green-700 mb-6">
                🌿 Disease Prediction Result
            </h2>


            <div className="space-y-6">

                {/* Disease Name */}

                <div>
                    <h3 className="font-semibold text-gray-700">
                        🦠 Disease Name
                    </h3>

                    <p className="text-xl font-bold text-red-600">
                        {result.disease_name || "Not detected"}
                    </p>
                </div>


                {/* Confidence */}

                <div>
                    <h3 className="font-semibold text-gray-700">
                        🎯 Confidence
                    </h3>

                    <p className="text-lg font-semibold text-blue-600">
                        {result.confidence || "Not available"}
                    </p>
                </div>


                {/* Description */}

                <div>
                    <h3 className="font-semibold text-gray-700">
                        📋 Description
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                        {result.description || "No description available."}
                    </p>
                </div>


                {/* Treatment */}

                <div>
                    <h3 className="font-semibold text-gray-700">
                        💊 Treatment
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                        {result.treatment || "No treatment information available."}
                    </p>
                </div>


                {/* Prevention */}

                <div>
                    <h3 className="font-semibold text-gray-700">
                        🛡 Prevention
                    </h3>

                    <p className="text-gray-700 leading-relaxed">
                        {result.prevention || "No prevention information available."}
                    </p>
                </div>


                {/* History ID */}

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
