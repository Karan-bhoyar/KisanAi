import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Save,
    User,
    Mail,
    Phone,
    MapPin,
    Sprout,
    Droplets,
    Ruler,
    Tractor,
    Camera,
    Award,
    Leaf,
    ArrowLeft,
    CheckCircle2,
} from "lucide-react";

import { motion } from "framer-motion";

function EditProfile() {
    const navigate = useNavigate();

    const savedProfile = localStorage.getItem("farmerProfile");

    // ======================================================
    // FARMER STATE
    // ======================================================

    const [farmer, setFarmer] = useState(
        savedProfile
            ? JSON.parse(savedProfile)
            : {
                  name: "",
                  email: "",
                  phone: "",
                  village: "",
                  state: "",
                  crop: "",
                  soil: "",
                  land: "",
                  irrigation: "",
                  experience: "",
                  photo: "",
              }
    );

    const [saving, setSaving] = useState(false);

    // ======================================================
    // HANDLE INPUT
    // ======================================================

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFarmer({
            ...farmer,
            [e.target.name]: e.target.value,
        });
    };

    // ======================================================
    // PHOTO UPLOAD
    // ======================================================

    const handlePhoto = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setFarmer({
                ...farmer,
                photo: reader.result as string,
            });
        };

        reader.readAsDataURL(file);
    };

    // ======================================================
    // SAVE PROFILE
    // ======================================================

    const handleSubmit = () => {
        setSaving(true);

        localStorage.setItem(
            "farmerProfile",
            JSON.stringify(farmer)
        );

        setTimeout(() => {
            setSaving(false);

            alert("Profile Updated Successfully ✅");

            navigate("/profile");
        }, 700);
    };

    // ======================================================
    // UI
    // ======================================================

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
                px-4
                py-6
                md:px-8
                md:py-10
            "
        >

            {/* ==================================================
                BACKGROUND DECORATION
            ================================================== */}

            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -top-32
                    -left-32
                    w-96
                    h-96
                    rounded-full
                    bg-green-300/25
                    blur-3xl
                    pointer-events-none
                "
            />

            <motion.div
                animate={{
                    x: [0, -35, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    -bottom-40
                    -right-32
                    w-[420px]
                    h-[420px]
                    rounded-full
                    bg-emerald-300/25
                    blur-3xl
                    pointer-events-none
                "
            />

            {/* FLOATING LEAF */}

            <motion.div
                animate={{
                    y: [0, -12, 0],
                    rotate: [0, 8, -8, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    absolute
                    top-24
                    right-[8%]
                    text-green-400/30
                    pointer-events-none
                "
            >
                <Leaf size={70} />
            </motion.div>

            {/* ==================================================
                MAIN CONTAINER
            ================================================== */}

            <div
                className="
                    relative
                    z-10
                    max-w-5xl
                    mx-auto
                "
            >

                {/* ==================================================
                    BACK BUTTON
                ================================================== */}

                <motion.button
                    initial={{
                        opacity: 0,
                        x: -15,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    whileHover={{
                        x: -4,
                    }}
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="
                        mb-5
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-gray-600
                        hover:text-green-700
                        transition
                    "
                >
                    <ArrowLeft size={18} />
                    Back to Profile
                </motion.button>

                {/* ==================================================
                    HEADER
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        bg-gradient-to-br
                        from-green-800
                        via-emerald-600
                        to-green-500
                        p-6
                        md:p-9
                        text-white
                        shadow-2xl
                    "
                >

                    {/* HEADER DECORATION */}

                    <div
                        className="
                            absolute
                            -right-20
                            -top-24
                            w-64
                            h-64
                            rounded-full
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-24
                            -left-16
                            w-60
                            h-60
                            rounded-full
                            bg-white/10
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            md:flex-row
                            items-center
                            gap-6
                        "
                    >

                        {/* ==================================================
                            PROFILE PHOTO
                        ================================================== */}

                        <motion.div
                            whileHover={{
                                scale: 1.04,
                            }}
                            className="
                                relative
                                flex-shrink-0
                                w-32
                                h-32
                                md:w-36
                                md:h-36
                                rounded-full
                                overflow-hidden
                                bg-white/15
                                border-4
                                border-white/40
                                shadow-2xl
                            "
                        >

                            {farmer.photo ? (
                                <img
                                    src={farmer.photo}
                                    alt="Farmer Profile"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        w-full
                                        h-full
                                        flex
                                        items-center
                                        justify-center
                                        text-6xl
                                    "
                                >
                                    👨‍🌾
                                </div>
                            )}

                            {/* CAMERA BUTTON */}

                            <label
                                className="
                                    absolute
                                    bottom-1
                                    right-1
                                    w-10
                                    h-10
                                    rounded-full
                                    bg-white
                                    text-green-700
                                    flex
                                    items-center
                                    justify-center
                                    cursor-pointer
                                    shadow-xl
                                    hover:scale-110
                                    transition
                                "
                            >
                                <Camera size={19} />

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhoto}
                                    className="hidden"
                                />
                            </label>

                        </motion.div>

                        {/* ==================================================
                            HEADER TEXT
                        ================================================== */}

                        <div
                            className="
                                flex-1
                                text-center
                                md:text-left
                            "
                        >

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-3
                                    py-1.5
                                    rounded-full
                                    bg-white/15
                                    text-xs
                                    font-semibold
                                    mb-3
                                "
                            >
                                <Leaf size={14} />

                                KrishiSetu AI
                            </div>

                            <h1
                                className="
                                    text-3xl
                                    md:text-4xl
                                    font-black
                                    tracking-tight
                                "
                            >
                                Edit Farmer Profile
                            </h1>

                            <p
                                className="
                                    mt-2
                                    text-green-100
                                    text-sm
                                    md:text-base
                                "
                            >
                                Keep your farming information updated
                                for a better KrishiSetu AI experience.
                            </p>

                        </div>

                    </div>

                </motion.div>

                {/* ==================================================
                    FORM
                ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                    }}
                    className="
                        mt-7
                        bg-white/90
                        backdrop-blur-xl
                        rounded-[2rem]
                        border
                        border-green-100
                        shadow-xl
                        p-5
                        md:p-9
                    "
                >

                    {/* FORM TITLE */}

                    <div className="mb-7">

                        <div
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-green-100
                                    text-green-700
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <User size={22} />
                            </div>

                            <div>

                                <h2
                                    className="
                                        text-xl
                                        md:text-2xl
                                        font-black
                                        text-gray-800
                                    "
                                >
                                    Personal & Farm Details
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        md:text-sm
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Enter your information below
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* ==================================================
                        FORM GRID
                    ================================================== */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                        "
                    >

                        <FormInput
                            icon={<User />}
                            label="Farmer Name"
                            name="name"
                            value={farmer.name}
                            placeholder="Enter your full name"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Mail />}
                            label="Email Address"
                            name="email"
                            type="email"
                            value={farmer.email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Phone />}
                            label="Mobile Number"
                            name="phone"
                            value={farmer.phone}
                            placeholder="Enter mobile number"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<MapPin />}
                            label="Village / City"
                            name="village"
                            value={farmer.village}
                            placeholder="Enter village or city"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<MapPin />}
                            label="State"
                            name="state"
                            value={farmer.state}
                            placeholder="Enter your state"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Sprout />}
                            label="Main Crop"
                            name="crop"
                            value={farmer.crop}
                            placeholder="e.g. Cotton, Wheat, Soybean"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Tractor />}
                            label="Soil Type"
                            name="soil"
                            value={farmer.soil}
                            placeholder="e.g. Black Soil"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Ruler />}
                            label="Land Area"
                            name="land"
                            value={farmer.land}
                            placeholder="e.g. 5 Acre"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Droplets />}
                            label="Irrigation Method"
                            name="irrigation"
                            value={farmer.irrigation}
                            placeholder="e.g. Drip Irrigation"
                            onChange={handleChange}
                        />

                        <FormInput
                            icon={<Award />}
                            label="Farming Experience"
                            name="experience"
                            value={farmer.experience}
                            placeholder="e.g. 5 Years"
                            onChange={handleChange}
                        />

                    </div>

                    {/* ==================================================
                        PHOTO INFORMATION
                    ================================================== */}

                    <div
                        className="
                            mt-7
                            rounded-2xl
                            bg-green-50
                            border
                            border-green-100
                            p-4
                            flex
                            items-start
                            gap-3
                        "
                    >

                        <CheckCircle2
                            size={20}
                            className="
                                text-green-600
                                flex-shrink-0
                                mt-0.5
                            "
                        />

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-bold
                                    text-green-800
                                "
                            >
                                Profile information
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-green-700
                                    mt-1
                                    leading-relaxed
                                "
                            >
                                Your information is stored locally
                                in your browser and can be updated
                                anytime.
                            </p>

                        </div>

                    </div>

                    {/* ==================================================
                        ACTION BUTTONS
                    ================================================== */}

                    <div
                        className="
                            mt-8
                            flex
                            flex-col-reverse
                            sm:flex-row
                            gap-3
                            sm:justify-end
                        "
                    >

                        <motion.button
                            whileHover={{
                                scale: 1.02,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            type="button"
                            onClick={() =>
                                navigate("/profile")
                            }
                            className="
                                px-6
                                py-3.5
                                rounded-xl
                                border
                                border-gray-200
                                bg-white
                                text-gray-600
                                font-semibold
                                hover:bg-gray-50
                                transition
                            "
                        >
                            Cancel
                        </motion.button>

                        <motion.button
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.97,
                            }}
                            onClick={handleSubmit}
                            disabled={saving}
                            className="
                                px-7
                                py-3.5
                                rounded-xl
                                bg-gradient-to-r
                                from-green-700
                                to-emerald-500
                                text-white
                                font-bold
                                flex
                                items-center
                                justify-center
                                gap-2
                                shadow-lg
                                hover:shadow-xl
                                disabled:opacity-70
                                transition
                            "
                        >

                            {saving ? (
                                <>
                                    <motion.div
                                        animate={{
                                            rotate: 360,
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            ease: "linear",
                                        }}
                                    >
                                        <Leaf size={18} />
                                    </motion.div>

                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    Save Changes
                                </>
                            )}

                        </motion.button>

                    </div>

                </motion.div>

                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div
                    className="
                        text-center
                        py-6
                        text-xs
                        text-gray-400
                    "
                >
                    <span
                        className="
                            inline-flex
                            items-center
                            gap-1.5
                        "
                    >
                        <Leaf size={13} />
                        Powered by KrishiSetu AI
                    </span>
                </div>

            </div>

        </div>
    );
}


// ======================================================
// FORM INPUT
// ======================================================

function FormInput({
    icon,
    label,
    name,
    value,
    placeholder,
    onChange,
    type = "text",
}: any) {

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 10,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            className="group"
        >

            <label
                className="
                    block
                    text-sm
                    font-bold
                    text-gray-700
                    mb-2
                "
            >
                {label}
            </label>

            <div
                className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3.5
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50/70
                    transition-all
                    duration-200
                    group-focus-within:border-green-500
                    group-focus-within:bg-white
                    group-focus-within:ring-4
                    group-focus-within:ring-green-500/10
                "
            >

                <div
                    className="
                        flex-shrink-0
                        text-green-600
                    "
                >
                    {icon}
                </div>

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="
                        w-full
                        bg-transparent
                        outline-none
                        text-gray-800
                        text-sm
                        placeholder:text-gray-400
                    "
                />

            </div>

        </motion.div>
    );
}

export default EditProfile;