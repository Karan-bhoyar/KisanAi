import { Link } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Sprout,
    Droplets,
    Ruler,
    Tractor,
    Edit,
    Award,
    Leaf
} from "lucide-react";


function FarmerProfile() {


    const savedProfile = localStorage.getItem(
        "farmerProfile"
    );


    const farmer = savedProfile
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

        };




    return (

        <div className="
            relative
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-green-100
            via-white
            to-emerald-200
            p-4
            md:p-8
        ">


            {/* BACKGROUND ANIMATION */}


            <div className="
                absolute
                top-10
                left-10
                w-72
                h-72
                bg-green-400/30
                rounded-full
                blur-3xl
                animate-pulse
            "/>


            <div className="
                absolute
                bottom-10
                right-10
                w-96
                h-96
                bg-emerald-400/30
                rounded-full
                blur-3xl
                animate-bounce
            "/>


            <div className="
                absolute
                top-1/2
                left-1/2
                w-80
                h-80
                bg-lime-300/20
                rounded-full
                blur-3xl
                animate-ping
            "/>




            {/* FLOATING FARM ICONS */}


            <div className="
                absolute
                top-20
                right-20
                text-5xl
                opacity-40
                animate-bounce
            ">
                🌱
            </div>



            <div className="
                absolute
                bottom-20
                left-10
                text-5xl
                opacity-40
                animate-pulse
            ">
                🌾
            </div>



            <div className="
                absolute
                top-1/3
                right-10
                text-4xl
                opacity-30
                animate-spin
            ">
                🍃
            </div>





            {/* MAIN */}


            <div className="
                relative
                z-10
                max-w-6xl
                mx-auto
            ">





                {/* PROFILE HEADER */}


                <div className="
                    bg-gradient-to-r
                    from-green-700
                    via-emerald-600
                    to-green-500
                    rounded-3xl
                    shadow-2xl
                    p-6
                    md:p-10
                    text-white
                    backdrop-blur-xl
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    gap-6
                ">



                    {/* PHOTO */}


                    <div className="
                        w-36
                        h-36
                        rounded-full
                        overflow-hidden
                        bg-white/20
                        border-4
                        border-white/40
                        shadow-xl
                        flex
                        items-center
                        justify-center
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

                            <span className="text-7xl">
                                👨‍🌾
                            </span>

                        }


                    </div>







                    <div className="
                        flex-1
                        text-center
                        md:text-left
                    ">



                        <h1 className="
                            text-4xl
                            md:text-5xl
                            font-bold
                        ">

                            {farmer.name}

                        </h1>



                        <p className="
                            mt-3
                            text-green-100
                            flex
                            justify-center
                            md:justify-start
                            items-center
                            gap-2
                        ">

                            <Leaf size={18}/>

                            Smart Farmer Profile

                        </p>



                        <div className="
                            flex
                            gap-3
                            mt-4
                            justify-center
                            md:justify-start
                            flex-wrap
                        ">


                            <span className="
                                bg-white/20
                                px-4
                                py-2
                                rounded-full
                            ">
                                🌱 {farmer.crop}
                            </span>


                            <span className="
                                bg-white/20
                                px-4
                                py-2
                                rounded-full
                            ">
                                📍 {farmer.village}
                            </span>


                        </div>


                    </div>






                    <Link

                        to="/profile/edit"

                        className="
                            bg-white
                            text-green-700
                            px-6
                            py-3
                            rounded-xl
                            font-bold
                            flex
                            items-center
                            gap-2
                            shadow-lg
                            hover:scale-105
                            transition
                        "

                    >

                        <Edit size={18}/>

                        Edit Profile


                    </Link>




                </div>









                {/* STATS */}


                <div className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-4
                    mt-8
                ">


                    <StatCard
                        icon={<Sprout/>}
                        title="Crop"
                        value={farmer.crop}
                    />


                    <StatCard
                        icon={<Ruler/>}
                        title="Land"
                        value={farmer.land}
                    />


                    <StatCard
                        icon={<Droplets/>}
                        title="Irrigation"
                        value={farmer.irrigation}
                    />


                    <StatCard
                        icon={<Award/>}
                        title="Experience"
                        value={farmer.experience}
                    />


                </div>









                {/* PERSONAL */}


                <SectionTitle text="Personal Details 👨‍🌾"/>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">


                    <InfoCard
                        icon={<User/>}
                        title="Name"
                        value={farmer.name}
                    />


                    <InfoCard
                        icon={<Mail/>}
                        title="Email"
                        value={farmer.email}
                    />


                    <InfoCard
                        icon={<Phone/>}
                        title="Mobile"
                        value={farmer.phone}
                    />


                    <InfoCard
                        icon={<MapPin/>}
                        title="Location"
                        value={`${farmer.village}, ${farmer.state}`}
                    />


                </div>









                {/* FARM */}


                <SectionTitle text="Farm Information 🌾"/>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">


                    <InfoCard
                        icon={<Sprout/>}
                        title="Main Crop"
                        value={farmer.crop}
                    />


                    <InfoCard
                        icon={<Tractor/>}
                        title="Soil Type"
                        value={farmer.soil}
                    />


                    <InfoCard
                        icon={<Ruler/>}
                        title="Land Area"
                        value={farmer.land}
                    />


                    <InfoCard
                        icon={<Droplets/>}
                        title="Irrigation"
                        value={farmer.irrigation}
                    />


                </div>



            </div>


        </div>

    );

}







function SectionTitle({text}:{text:string}){


return (

<h2 className="
mt-10
mb-5
text-2xl
font-bold
text-gray-800
">

{text}

</h2>

);


}









function StatCard({

icon,
title,
value

}:any){


return (

<div className="
bg-white/80
backdrop-blur
rounded-2xl
p-5
shadow-lg
border
hover:-translate-y-2
transition
">


<div className="
w-12
h-12
bg-green-100
text-green-700
rounded-xl
flex
items-center
justify-center
mb-3
">

{icon}

</div>


<p className="text-gray-500 text-sm">
{title}
</p>


<h3 className="font-bold">
{value}
</h3>


</div>

);

}









function InfoCard({

icon,
title,
value

}:any){


return (

<div className="
bg-white/90
backdrop-blur
rounded-2xl
p-5
shadow-md
border
flex
items-center
gap-4
hover:shadow-xl
transition
">


<div className="
w-12
h-12
bg-green-100
text-green-700
rounded-xl
flex
items-center
justify-center
">

{icon}

</div>


<div>

<p className="text-sm text-gray-500">
{title}
</p>


<p className="font-bold text-gray-800">
{value}
</p>


</div>


</div>

);


}



export default FarmerProfile;