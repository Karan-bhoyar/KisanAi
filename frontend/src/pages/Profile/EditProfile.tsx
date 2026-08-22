import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Save,
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Sprout,
    Droplets,
    Ruler,
    Tractor,
    Camera
} from "lucide-react";


function EditProfile() {


    const navigate = useNavigate();


    const savedProfile = localStorage.getItem("farmerProfile");


    const [farmer, setFarmer] = useState(

        savedProfile

        ?

        JSON.parse(savedProfile)

        :

        {

            name: "Karan Bhoyar",
            email: "karan@gmail.com",
            phone: "+91 9876543210",

            village: "Pune",
            state: "Maharashtra",

            crop: "Cotton",
            soil: "Black Soil",

            land: "5 Acre",

            irrigation: "Drip Irrigation",

            experience: "5 Years",

            photo: ""

        }

    );





    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        setFarmer({

            ...farmer,

            [e.target.name]: e.target.value

        });


    };







    // PHOTO UPLOAD

    const handlePhoto = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {


        const file = e.target.files?.[0];


        if(file){


            const reader = new FileReader();



            reader.onload = ()=>{


                setFarmer({

                    ...farmer,

                    photo: reader.result as string

                });


            };



            reader.readAsDataURL(file);


        }


    };






    const handleSubmit = () => {


        localStorage.setItem(
            "farmerProfile",
            JSON.stringify(farmer)
        );



        alert("Profile Updated Successfully ✅");



        navigate("/profile");


    };







    return (

        <div className="
            min-h-screen
            bg-gradient-to-br
            from-green-50
            via-white
            to-green-100
            p-4
            md:p-8
        ">



            <div className="
                max-w-5xl
                mx-auto
            ">





                {/* HEADER */}

                <div className="
                    bg-gradient-to-r
                    from-green-700
                    to-emerald-500
                    rounded-3xl
                    p-6
                    md:p-8
                    text-white
                    shadow-xl
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-6
                ">




                    {/* PHOTO */}

                    <div className="
                        relative
                        w-32
                        h-32
                        rounded-full
                        overflow-hidden
                        border-4
                        border-white/40
                        bg-white/20
                    ">



                        {
                            farmer.photo

                            ?

                            <img

                                src={farmer.photo}

                                className="
                                    w-full
                                    h-full
                                    object-cover
                                "

                            />

                            :

                            <div className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                                text-6xl
                            ">

                                👨‍🌾

                            </div>

                        }






                        <label className="
                            absolute
                            bottom-1
                            right-1
                            bg-green-600
                            p-2
                            rounded-full
                            cursor-pointer
                            shadow-lg
                        ">


                            <Camera
                                size={18}
                                className="text-white"
                            />



                            <input

                                type="file"

                                accept="image/*"

                                onChange={handlePhoto}

                                className="hidden"

                            />


                        </label>



                    </div>








                    <div className="
                        flex-1
                        text-center
                        md:text-left
                    ">


                        <h1 className="
                            text-3xl
                            font-bold
                        ">

                            Edit Farmer Profile 🌱

                        </h1>


                        <p className="
                            text-green-100
                            mt-2
                        ">

                            Update your farming details

                        </p>


                    </div>



                </div>








                {/* FORM */}


                <div className="
                    mt-8
                    bg-white
                    rounded-3xl
                    shadow-xl
                    p-5
                    md:p-8
                ">



                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-6
                    ">




                        <FormInput
                            icon={<User/>}
                            label="Farmer Name"
                            name="name"
                            value={farmer.name}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Mail/>}
                            label="Email"
                            name="email"
                            value={farmer.email}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Phone/>}
                            label="Mobile Number"
                            name="phone"
                            value={farmer.phone}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<MapPin/>}
                            label="Village"
                            name="village"
                            value={farmer.village}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Sprout/>}
                            label="Main Crop"
                            name="crop"
                            value={farmer.crop}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Tractor/>}
                            label="Soil Type"
                            name="soil"
                            value={farmer.soil}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Ruler/>}
                            label="Land Area"
                            name="land"
                            value={farmer.land}
                            onChange={handleChange}
                        />



                        <FormInput
                            icon={<Droplets/>}
                            label="Irrigation"
                            name="irrigation"
                            value={farmer.irrigation}
                            onChange={handleChange}
                        />



                    </div>








                    <button

                        onClick={handleSubmit}

                        className="
                            mt-8
                            flex
                            items-center
                            justify-center
                            gap-2
                            bg-green-600
                            hover:bg-green-700
                            text-white
                            px-8
                            py-3
                            rounded-xl
                            font-semibold
                            transition
                        "

                    >

                        <Save size={18}/>

                        Save Changes


                    </button>



                </div>



            </div>


        </div>

    );

}









function FormInput({

    icon,
    label,
    name,
    value,
    onChange

}:any){



    return (

        <div>


            <label className="
                text-sm
                font-semibold
                text-gray-600
            ">

                {label}

            </label>




            <div className="
                mt-2
                flex
                items-center
                gap-3
                border
                rounded-xl
                px-4
                py-3
                focus-within:ring-2
                focus-within:ring-green-500
            ">



                <div className="text-green-600">

                    {icon}

                </div>




                <input

                    name={name}

                    value={value}

                    onChange={onChange}

                    className="
                        flex-1
                        outline-none
                    "

                />


            </div>



        </div>

    );

}




export default EditProfile;