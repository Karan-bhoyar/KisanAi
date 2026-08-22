import { Upload, ImageIcon } from "lucide-react";


interface Props {

    image: File | null;

    setImage: (
        file: File | null
    ) => void;

}



function DiseaseUpload({

    image,

    setImage

}: Props) {




    const handleChange = (

        e: React.ChangeEvent<HTMLInputElement>

    ) => {


        if(e.target.files && e.target.files.length > 0){


            setImage(
                e.target.files[0]
            );


        }


    };






    return (



        <div className="
            bg-white/80
            backdrop-blur-xl
            rounded-3xl
            shadow-xl
            border
            p-6
            md:p-8
        ">





            <label

                className="
                    group
                    border-2
                    border-dashed
                    border-green-400
                    rounded-3xl
                    min-h-[280px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    cursor-pointer
                    hover:bg-green-50
                    hover:border-green-600
                    transition-all
                    duration-300
                "

            >





                <div className="
                    w-20
                    h-20
                    rounded-full
                    bg-green-100
                    flex
                    items-center
                    justify-center
                    group-hover:scale-110
                    transition
                ">


                    <Upload

                        size={40}

                        className="
                            text-green-700
                        "

                    />


                </div>







                <h3 className="
                    mt-5
                    text-xl
                    font-bold
                    text-gray-700
                ">


                    Upload Crop Leaf Image 🌱


                </h3>






                <p className="
                    mt-2
                    text-gray-500
                    text-sm
                ">


                    Click here to select plant image


                </p>







                <input

                    type="file"

                    accept="image/*"

                    hidden

                    onChange={handleChange}

                />





            </label>










            {
                image && (



                    <div className="
                        mt-8
                        text-center
                    ">



                        <div className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            text-green-700
                            font-semibold
                            mb-4
                        ">


                            <ImageIcon size={20}/>


                            Selected Image


                        </div>







                        <img

                            src={
                                URL.createObjectURL(image)
                            }


                            alt="crop preview"


                            className="
                                w-full
                                max-w-md
                                h-72
                                object-cover
                                rounded-3xl
                                shadow-xl
                                mx-auto
                            "

                        />







                        <p className="
                            mt-4
                            text-sm
                            text-gray-600
                        ">


                            {image.name}


                        </p>





                    </div>



                )
            }






        </div>



    );

}



export default DiseaseUpload;