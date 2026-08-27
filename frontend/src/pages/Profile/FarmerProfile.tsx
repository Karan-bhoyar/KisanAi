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
    Leaf,
    ShieldCheck,
    CalendarDays,
    ChevronRight,
    Sparkles,
    Wheat,
} from "lucide-react";

import { motion } from "framer-motion";

function FarmerProfile() {

    const savedProfile =
        localStorage.getItem("farmerProfile");

    const farmer = savedProfile
        ? JSON.parse(savedProfile)
        : {
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
              photo: "",
        };

    return (
        <div
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[#f5faf7]
                px-4
                py-6
                md:px-8
                md:py-10
            "
        >

            {/* ==========================================
                BACKGROUND
            ========================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-32
                    -left-32
                    w-96
                    h-96
                    rounded-full
                    bg-emerald-300/20
                    blur-3xl
                "
            />

            <div
                className="
                    pointer-events-none
                    absolute
                    top-[35%]
                    -right-32
                    w-96
                    h-96
                    rounded-full
                    bg-green-300/20
                    blur-3xl
                "
            />

            <motion.div
                animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    top-20
                    right-[8%]
                    text-green-300/30
                "
            >
                <Leaf size={55} />
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 12, 0],
                    rotate: [0, -6, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    bottom-20
                    left-[5%]
                    text-emerald-300/30
                "
            >
                <Wheat size={60} />
            </motion.div>


            {/* ==========================================
                MAIN CONTAINER
            ========================================== */}

            <div
                className="
                    relative
                    z-10
                    max-w-6xl
                    mx-auto
                "
            >

                {/* ==========================================
                    PAGE TOP
                ========================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: -15,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-3
                        mb-7
                    "
                >

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-green-600
                                text-sm
                                font-semibold
                                mb-1
                            "
                        >
                            <Leaf size={16} />

                            KrishiSetu AI

                        </div>

                        <h1
                            className="
                                text-2xl
                                md:text-3xl
                                font-black
                                text-gray-800
                            "
                        >
                            Farmer Profile
                        </h1>

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Manage your farming information and preferences.
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            font-semibold
                            text-green-700
                            bg-green-50
                            border
                            border-green-100
                            px-3
                            py-2
                            rounded-full
                            w-fit
                        "
                    >

                        <ShieldCheck size={15} />

                        Profile Verified

                    </div>

                </motion.div>


                {/* ==========================================
                    PREMIUM PROFILE HEADER
                ========================================== */}

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
                    }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[2rem]
                        bg-gradient-to-br
                        from-[#064e3b]
                        via-[#047857]
                        to-[#10b981]
                        p-6
                        md:p-10
                        shadow-[0_25px_70px_rgba(6,78,59,0.22)]
                        text-white
                    "
                >

                    {/* Decorative glow */}

                    <div
                        className="
                            absolute
                            -top-24
                            -right-20
                            w-72
                            h-72
                            rounded-full
                            bg-white/10
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            absolute
                            -bottom-32
                            -left-20
                            w-80
                            h-80
                            rounded-full
                            bg-emerald-300/10
                            blur-2xl
                        "
                    />

                    {/* Decorative rings */}

                    <motion.div
                        animate={{
                            rotate: 360,
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            right-10
                            top-8
                            w-28
                            h-28
                            rounded-full
                            border
                            border-white/10
                        "
                    />

                    <motion.div
                        animate={{
                            rotate: -360,
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="
                            absolute
                            right-16
                            top-14
                            w-16
                            h-16
                            rounded-full
                            border
                            border-white/10
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

                        {/* ==================================
                            PROFILE PHOTO
                        ================================== */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.7,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.15,
                            }}
                            className="
                                relative
                                flex-shrink-0
                            "
                        >

                            {/* Glow */}

                            <motion.div
                                animate={{
                                    scale: [1, 1.12, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                                className="
                                    absolute
                                    inset-0
                                    rounded-full
                                    bg-white
                                    blur-xl
                                "
                            />

                            <div
                                className="
                                    relative
                                    w-32
                                    h-32
                                    md:w-40
                                    md:h-40
                                    rounded-full
                                    overflow-hidden
                                    border-[5px]
                                    border-white/70
                                    bg-white/15
                                    shadow-2xl
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {farmer.photo ? (

                                    <img
                                        src={farmer.photo}
                                        alt={farmer.name}
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                ) : (

                                    <span
                                        className="
                                            text-7xl
                                            md:text-8xl
                                        "
                                    >
                                        👨‍🌾
                                    </span>

                                )}

                            </div>


                            {/* Online dot */}

                            <span
                                className="
                                    absolute
                                    bottom-2
                                    right-3
                                    w-5
                                    h-5
                                    rounded-full
                                    bg-emerald-300
                                    border-4
                                    border-emerald-700
                                "
                            />

                        </motion.div>


                        {/* ==================================
                            PROFILE INFO
                        ================================== */}

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
                                    bg-white/10
                                    border
                                    border-white/15
                                    text-xs
                                    font-semibold
                                    text-green-50
                                    mb-3
                                "
                            >

                                <Sparkles size={13} />

                                Smart Farmer

                            </div>


                            <h2
                                className="
                                    text-3xl
                                    md:text-5xl
                                    font-black
                                    tracking-tight
                                "
                            >
                                {farmer.name}
                            </h2>


                            <div
                                className="
                                    flex
                                    flex-wrap
                                    justify-center
                                    md:justify-start
                                    gap-2
                                    mt-4
                                "
                            >

                                <ProfilePill
                                    icon={<Sprout size={14} />}
                                    text={farmer.crop}
                                />

                                <ProfilePill
                                    icon={<MapPin size={14} />}
                                    text={farmer.village}
                                />

                                <ProfilePill
                                    icon={<CalendarDays size={14} />}
                                    text={farmer.experience}
                                />

                            </div>

                        </div>


                        {/* ==================================
                            EDIT BUTTON
                        ================================== */}

                        <Link
                            to="/profile/edit"
                            className="
                                group
                                relative
                                inline-flex
                                items-center
                                gap-2
                                bg-white
                                text-green-800
                                px-5
                                py-3
                                rounded-xl
                                font-bold
                                shadow-xl
                                hover:shadow-2xl
                                hover:-translate-y-1
                                transition-all
                                duration-300
                            "
                        >

                            <Edit size={17} />

                            Edit Profile

                            <ChevronRight
                                size={16}
                                className="
                                    group-hover:translate-x-1
                                    transition
                                "
                            />

                        </Link>

                    </div>

                </motion.div>


                {/* ==========================================
                    FARM STATS
                ========================================== */}

                <div
                    className="
                        grid
                        grid-cols-2
                        lg:grid-cols-4
                        gap-4
                        mt-6
                    "
                >

                    <AnimatedStat
                        delay={0}
                        icon={<Sprout size={22} />}
                        title="Main Crop"
                        value={farmer.crop}
                        bg="bg-green-50"
                        color="text-green-600"
                    />

                    <AnimatedStat
                        delay={0.08}
                        icon={<Ruler size={22} />}
                        title="Land Area"
                        value={farmer.land}
                        bg="bg-blue-50"
                        color="text-blue-600"
                    />

                    <AnimatedStat
                        delay={0.16}
                        icon={<Droplets size={22} />}
                        title="Irrigation"
                        value={farmer.irrigation}
                        bg="bg-cyan-50"
                        color="text-cyan-600"
                    />

                    <AnimatedStat
                        delay={0.24}
                        icon={<Award size={22} />}
                        title="Experience"
                        value={farmer.experience}
                        bg="bg-amber-50"
                        color="text-amber-600"
                    />

                </div>


                {/* ==========================================
                    PERSONAL DETAILS
                ========================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="mt-10"
                >

                    <SectionHeading
                        icon={<User size={19} />}
                        title="Personal Details"
                        subtitle="Your basic contact information"
                    />


                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        "
                    >

                        <InfoCard
                            icon={<User />}
                            title="Full Name"
                            value={farmer.name}
                            color="green"
                        />

                        <InfoCard
                            icon={<Mail />}
                            title="Email Address"
                            value={farmer.email}
                            color="blue"
                        />

                        <InfoCard
                            icon={<Phone />}
                            title="Mobile Number"
                            value={farmer.phone}
                            color="purple"
                        />

                        <InfoCard
                            icon={<MapPin />}
                            title="Location"
                            value={`${farmer.village}, ${farmer.state}`}
                            color="orange"
                        />

                    </div>

                </motion.section>


                {/* ==========================================
                    FARM INFORMATION
                ========================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 25,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.1,
                    }}
                    className="mt-10"
                >

                    <SectionHeading
                        icon={<Wheat size={19} />}
                        title="Farm Information"
                        subtitle="Details that help KrishiSetu AI personalize recommendations"
                    />


                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        "
                    >

                        <InfoCard
                            icon={<Sprout />}
                            title="Primary Crop"
                            value={farmer.crop}
                            color="green"
                        />

                        <InfoCard
                            icon={<Tractor />}
                            title="Soil Type"
                            value={farmer.soil}
                            color="brown"
                        />

                        <InfoCard
                            icon={<Ruler />}
                            title="Land Area"
                            value={farmer.land}
                            color="blue"
                        />

                        <InfoCard
                            icon={<Droplets />}
                            title="Irrigation Method"
                            value={farmer.irrigation}
                            color="cyan"
                        />

                    </div>

                </motion.section>


                {/* ==========================================
                    PERSONALIZED AI CARD
                ========================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.97,
                    }}
                    whileInView={{
                        opacity: 1,
                        scale: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="
                        relative
                        overflow-hidden
                        mt-10
                        rounded-3xl
                        bg-gradient-to-r
                        from-green-50
                        via-white
                        to-emerald-50
                        border
                        border-green-100
                        p-6
                        md:p-7
                        shadow-lg
                    "
                >

                    <div
                        className="
                            absolute
                            -right-12
                            -top-12
                            w-32
                            h-32
                            rounded-full
                            bg-green-200/30
                            blur-2xl
                        "
                    />

                    <div
                        className="
                            relative
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            gap-5
                        "
                    >

                        <motion.div
                            animate={{
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                            className="
                                flex-shrink-0
                                w-14
                                h-14
                                rounded-2xl
                                bg-green-600
                                text-white
                                flex
                                items-center
                                justify-center
                                shadow-lg
                            "
                        >

                            <Leaf size={27} />

                        </motion.div>


                        <div className="flex-1">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    mb-1
                                "
                            >

                                <h3
                                    className="
                                        font-black
                                        text-gray-800
                                    "
                                >
                                    Personalized Farming
                                </h3>

                                <span
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        bg-green-100
                                        text-green-700
                                        px-2
                                        py-1
                                        rounded-full
                                    "
                                >
                                    AI
                                </span>

                            </div>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    leading-relaxed
                                "
                            >
                                KrishiSetu AI can use your crop, soil,
                                land and irrigation information to provide
                                more relevant farming guidance.
                            </p>

                        </div>


                        <Link
                            to="/"
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                bg-green-700
                                hover:bg-green-800
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                text-sm
                                font-bold
                                transition
                                shadow-lg
                                hover:-translate-y-0.5
                            "
                        >

                            Explore AI

                            <ChevronRight size={16} />

                        </Link>

                    </div>

                </motion.div>


                {/* ==========================================
                    FOOTER
                ========================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        mt-10
                        pb-4
                        text-xs
                        text-gray-400
                    "
                >

                    <Leaf size={14} />

                    KrishiSetu AI • Smart Technology for Smarter Farming

                </motion.div>

            </div>

        </div>
    );
}


/* ======================================================
   PROFILE PILL
====================================================== */

function ProfilePill({
    icon,
    text,
}: {
    icon: React.ReactNode;
    text: string;
}) {

    return (
        <span
            className="
                inline-flex
                items-center
                gap-2
                bg-white/10
                border
                border-white/15
                rounded-full
                px-3
                py-1.5
                text-xs
                font-medium
                text-green-50
                backdrop-blur-sm
            "
        >
            {icon}
            {text}
        </span>
    );
}


/* ======================================================
   SECTION HEADING
====================================================== */

function SectionHeading({
    icon,
    title,
    subtitle,
}: {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}) {

    return (
        <div
            className="
                flex
                items-center
                gap-3
                mb-5
            "
        >

            <div
                className="
                    w-10
                    h-10
                    rounded-xl
                    bg-green-100
                    text-green-700
                    flex
                    items-center
                    justify-center
                "
            >
                {icon}
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
                    {title}
                </h2>

                <p
                    className="
                        text-xs
                        md:text-sm
                        text-gray-500
                        mt-0.5
                    "
                >
                    {subtitle}
                </p>

            </div>

        </div>
    );
}


/* ======================================================
   ANIMATED STAT
====================================================== */

function AnimatedStat({
    icon,
    title,
    value,
    bg,
    color,
    delay,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    bg: string;
    color: string;
    delay: number;
}) {

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
                delay,
            }}
            whileHover={{
                y: -6,
                scale: 1.015,
            }}
            className="
                group
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-4
                md:p-5
                shadow-sm
                hover:shadow-xl
                transition-shadow
                duration-300
            "
        >

            <div
                className={`
                    w-11
                    h-11
                    rounded-xl
                    ${bg}
                    ${color}
                    flex
                    items-center
                    justify-center
                    mb-3
                    group-hover:scale-110
                    transition-transform
                `}
            >
                {icon}
            </div>

            <p
                className="
                    text-xs
                    text-gray-400
                    font-medium
                "
            >
                {title}
            </p>

            <h3
                className="
                    mt-1
                    font-black
                    text-gray-800
                    text-sm
                    md:text-base
                    truncate
                "
                title={value}
            >
                {value}
            </h3>

        </motion.div>
    );
}


/* ======================================================
   INFO CARD
====================================================== */

function InfoCard({
    icon,
    title,
    value,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
    color: string;
}) {

    const colors: Record<
        string,
        string
    > = {

        green:
            "bg-green-50 text-green-600",

        blue:
            "bg-blue-50 text-blue-600",

        purple:
            "bg-purple-50 text-purple-600",

        orange:
            "bg-orange-50 text-orange-600",

        cyan:
            "bg-cyan-50 text-cyan-600",

        brown:
            "bg-amber-50 text-amber-700",
    };


    return (
        <motion.div
            whileHover={{
                y: -4,
            }}
            className="
                group
                bg-white
                rounded-2xl
                border
                border-gray-100
                p-5
                flex
                items-center
                gap-4
                shadow-sm
                hover:shadow-xl
                transition-all
                duration-300
            "
        >

            <div
                className={`
                    flex-shrink-0
                    w-12
                    h-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    ${colors[color]}
                    group-hover:scale-105
                    transition-transform
                `}
            >
                {icon}
            </div>


            <div className="min-w-0">

                <p
                    className="
                        text-xs
                        uppercase
                        tracking-wide
                        font-semibold
                        text-gray-400
                    "
                >
                    {title}
                </p>

                <p
                    className="
                        mt-1
                        text-sm
                        md:text-base
                        font-bold
                        text-gray-800
                        break-words
                    "
                >
                    {value}
                </p>

            </div>

        </motion.div>
    );
}


export default FarmerProfile;