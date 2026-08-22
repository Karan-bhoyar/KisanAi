import { useEffect, useState } from "react";
import { getDiseaseHistory } from "../../API/diseaseApi";


interface History {

    id: number;
    disease_name: string;
    description: string;
    treatment: string;
    image_url: string;
    created_at: string;

}



function DiseaseHistory() {


    const [history, setHistory] = useState<History[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {

        loadHistory();

    }, []);




    const loadHistory = async () => {

        try {

            const data = await getDiseaseHistory();

            setHistory(data);


        } catch (error) {

            console.error(
                "History loading failed",
                error
            );

        }
        finally {

            setLoading(false);

        }

    };




    if (loading) {

        return (

            <div className="text-center p-8">

                Loading history...

            </div>

        );

    }




    return (

        <div className="bg-green-50 min-h-screen p-8">


            <div className="max-w-5xl mx-auto">


                <h1 className="
                    text-3xl
                    font-bold
                    text-green-700
                    mb-8
                ">
                    🌿 Disease Detection History
                </h1>




                {
                    history.length === 0 ? (

                        <div className="
                            bg-white
                            rounded-xl
                            shadow
                            p-6
                        ">

                            No history found

                        </div>


                    ) : (


                        <div className="grid gap-6">


                            {
                                history.map((item) => (

                                    <div
                                        key={item.id}
                                        className="
                                        bg-white
                                        rounded-2xl
                                        shadow-lg
                                        p-6
                                        "
                                    >


                                        <h2 className="
                                            text-xl
                                            font-bold
                                            text-green-700
                                        ">

                                            {item.disease_name}

                                        </h2>




                                        <p className="mt-3 text-gray-600">

                                            {item.description}

                                        </p>




                                        <p className="mt-3">

                                            💊 {item.treatment}

                                        </p>




                                        <p className="
                                            mt-3
                                            text-sm
                                            text-gray-500
                                        ">

                                            Date:
                                            {" "}
                                            {new Date(
                                                item.created_at
                                            ).toLocaleDateString()}

                                        </p>



                                    </div>

                                ))

                            }


                        </div>


                    )

                }


            </div>


        </div>

    );

}


export default DiseaseHistory;