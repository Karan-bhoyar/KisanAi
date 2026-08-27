import { Upload, ImageIcon } from "lucide-react";
import { useEffect, useState } from "react";


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


    const [preview, setPreview] =
        useState<string | null>(null);


    // ==========================================
    // Create / Cleanup Preview URL
    // ==========================================

    useEffect(() => {

        if (!image) {

            setPreview(null);

            return;

        }


        const url =
            URL.createObjectURL(image);


        setPreview(url);


        return () => {

            URL.revokeObjectURL(url);

        };

    }, [image]);


    // ==========================================
    // File Selection
    // ==========================================

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const file =
            e.target.files?.[0];


        if (!file) {
            return;
        }


        // Check image type

        if (!file.type.startsWith("image/")) {

            alert(
                "Please select a valid image file."
            );

            e.target.value = "";

            return;

        }


        // Maximum 10 MB

        const maxSize =
            10 * 1024 * 1024;


        if (file.size > maxSize) {

            alert(
                "Image size must be less than 10 MB."
            );

            e.target.value = "";

            return;

        }


        console.log(
            "Selected image:",
            file.name
        );

        console.log(
            "Image type:",
            file.type
        );

        console.log(
            "Image size:",
            `${(file.size / 1024 / 1024).toFixed(2)} MB`
        );


        setImage(file);

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="
                bg-white/80
                backdrop-blur-xl
                rounded-3xl
                shadow-xl
                border
                p-6
                md:p-8
            "
        >

            {/* =================================
                Upload Area
            ================================= */}

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

                <div
                    className="
                        w-20
                        h-20
                        rounded-full
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        group-hover:scale-110
                        transition
                    "
                >

                    <Upload
                        size={40}
                        className="text-green-700"
                    />

                </div>


                <h3
                    className="
                        mt-5
                        text-xl
                        font-bold
                        text-gray-700
                    "
                >

                    Upload Crop Leaf Image 🌱

                </h3>


                <p
                    className="
                        mt-2
                        text-gray-500
                        text-sm
                    "
                >

                    Click here to select plant image

                </p>


                <p
                    className="
                        mt-1
                        text-gray-400
                        text-xs
                    "
                >

                    JPG, PNG, WEBP • Max 10 MB

                </p>


                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    hidden
                    onChange={handleChange}
                />

            </label>


            {/* =================================
                Selected Image
            ================================= */}

            {
                image && (

                    <div
                        className="
                            mt-8
                            text-center
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                text-green-700
                                font-semibold
                                mb-4
                            "
                        >

                            <ImageIcon size={20} />

                            Selected Image

                        </div>


                        {/* Preview */}

                        {
                            preview && (

                                <img
                                    src={preview}
                                    alt="Selected crop leaf"
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

                            )
                        }


                        {/* File Name */}

                        <p
                            className="
                                mt-4
                                text-sm
                                text-gray-600
                                break-all
                            "
                        >

                            {image.name}

                        </p>


                        {/* File Size */}

                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-400
                            "
                        >

                            {(image.size / 1024 / 1024).toFixed(2)} MB

                        </p>


                        {/* Remove */}

                        <button
                            type="button"
                            onClick={() =>
                                setImage(null)
                            }
                            className="
                                mt-4
                                text-sm
                                font-semibold
                                text-red-500
                                hover:text-red-700
                                transition
                            "
                        >

                            Remove Image

                        </button>

                    </div>

                )
            }

        </div>

    );

}


export default DiseaseUpload;