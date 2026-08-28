import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Leaf,
    Sprout,
    ShieldCheck,
    CloudSun,
    Bug,
    Sparkles,
    MessageCircle,
    ArrowRight,
    X,
    Send,
    Tractor,
    Wheat,
    Droplets,
    Bot,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
} from "framer-motion";

import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import farmerImage from "./image/farmer.png";

import {
    sendMessage,
    getChatHistory,
} from "../API/chatApi";

// ======================================================
// TYPES
// ======================================================

interface Message {
    role: "user" | "ai";
    text: string;
}

type Language = "hi" | "mr" | "en";

// ======================================================
// COMPONENT
// ======================================================

function ChatLayout() {

    // ==================================================
    // CHAT STATE
    // ==================================================

    const [messages, setMessages] =
        useState<Message[]>([
            {
                role: "ai",
                text:
                    "🙏 Namaste kisaan bhai 🌾 Main KrishiSetu AI hoon. Aap kheti, fasal, rog, mausam, mandi prices aur government schemes ke baare mein mujhse pooch sakte hain.",
            },
        ]);

    const [loading, setLoading] =
        useState(false);

    const [chatOpen, setChatOpen] =
        useState(false);

    const chatEndRef =
        useRef<HTMLDivElement | null>(null);

    // ==================================================
    // LOAD CHAT HISTORY
    // ==================================================

    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (token) {
            loadHistory();
        }

    }, []);

    // ==================================================
    // AUTO SCROLL
    // ==================================================

    useEffect(() => {

        if (chatOpen) {

            chatEndRef.current?.scrollIntoView({
                behavior: "smooth",
            });

        }

    }, [
        messages,
        loading,
        chatOpen,
    ]);

    // ==================================================
    // LOAD HISTORY
    // ==================================================

    const loadHistory = async () => {

        try {

            console.log(
                "Loading chat history..."
            );

            const data =
                await getChatHistory();

            console.log(
                "Chat history response:",
                data
            );

            if (!Array.isArray(data)) {

                console.error(
                    "Invalid chat history:",
                    data
                );

                return;
            }

            const history: Message[] =
                data
                    .slice()
                    .reverse()
                    .flatMap((chat) => [

                        {
                            role: "user",
                            text: chat.message,
                        },

                        {
                            role: "ai",
                            text: chat.response,
                        },

                    ]);

            setMessages((prev) => [

                ...prev,

                ...history,

            ]);

        }

        catch (error: any) {

            console.error(
                "CHAT HISTORY ERROR:",
                error.response?.data ||
                error.message ||
                error
            );

        }

    };

    // ==================================================
    // SEND MESSAGE
    // ==================================================

    const handleSend = async (
        message: string,
        language: Language
    ) => {

        if (!message.trim()) {
            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "Please login first."
            );

            window.location.href =
                "/login";

            return;
        }

        setMessages((prev) => [

            ...prev,

            {
                role: "user",
                text: message,
            },

        ]);

        setLoading(true);

        try {

            console.log(
                "Sending chat message:",
                {
                    message,
                    language,
                }
            );

            const data =
                await sendMessage(
                    message,
                    language
                );

            console.log(
                "Chat API response:",
                data
            );

            if (
                !data ||
                typeof data.response !== "string"
            ) {

                setMessages((prev) => [

                    ...prev,

                    {
                        role: "ai",
                        text:
                            "❌ AI ne valid response nahi diya.",
                    },

                ]);

                return;
            }

            setMessages((prev) => [

                ...prev,

                {
                    role: "ai",
                    text: data.response,
                },

            ]);

        }

        catch (error: any) {

            console.error(
                "CHAT API ERROR:",
                error.response?.status,
                error.response?.data ||
                error.message ||
                error
            );

            let errorMessage =
                "❌ Server response nahi aaya.";

            if (
                error.response?.status === 401
            ) {

                errorMessage =
                    "❌ Session expired. Please login again.";

            }

            else if (
                error.response?.status === 500
            ) {

                errorMessage =
                    "❌ Backend server error. Please try again.";

            }

            else if (
                error.message ===
                "Network Error"
            ) {

                errorMessage =
                    "❌ Backend se connection nahi ho raha.";

            }

            setMessages((prev) => [

                ...prev,

                {
                    role: "ai",
                    text: errorMessage,
                },

            ]);

        }

        finally {

            setLoading(false);

        }

    };

    // ==================================================
    // QUICK QUESTION
    // ==================================================

    const handleQuickQuestion = (
        question: string
    ) => {

        setChatOpen(true);

        handleSend(
            question,
            "en"
        );

    };

    // ==================================================
    // FEATURES
    // ==================================================

    const features = [

        {
            title: "Crop Recommendation",
            description:
                "Find suitable crops based on season, soil and farming conditions.",
            icon: Sprout,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            border: "border-green-100",
            question:
                "Which crop should I grow based on my soil and season?",
        },

        {
            title: "Disease Detection",
            description:
                "Get AI assistance to understand crop diseases and prevention.",
            icon: Bug,
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            border: "border-red-100",
            question:
                "How can I identify and prevent crop diseases?",
        },

        {
            title: "Weather Guidance",
            description:
                "Understand weather conditions and plan farming activities.",
            icon: CloudSun,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            border: "border-blue-100",
            question:
                "What weather conditions should I consider for farming?",
        },

        {
            title: "Government Schemes",
            description:
                "Discover useful government schemes and farmer benefits.",
            icon: ShieldCheck,
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            border: "border-purple-100",
            question:
                "What government schemes are available for farmers?",
        },

    ];

    // ==================================================
    // UI
    // ==================================================

    return (

        <div
            className="
                relative
                min-h-[calc(100vh-150px)]
                overflow-x-hidden
                bg-gradient-to-br
                from-green-50
                via-white
                to-emerald-50
                px-4
                py-6
                md:px-8
                md:py-10
                pb-28
            "
        >

            {/* ==================================================
                BACKGROUND ANIMATIONS
            ================================================== */}

            <motion.div
                animate={{
                    x: [0, 40, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    -top-20
                    -left-20
                    w-80
                    h-80
                    rounded-full
                    bg-green-300
                    blur-3xl
                    opacity-20
                "
            />

            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, -20, 0],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    top-[40%]
                    -right-20
                    w-80
                    h-80
                    rounded-full
                    bg-emerald-300
                    blur-3xl
                    opacity-20
                "
            />

            {/* ==================================================
                MAIN CONTAINER
            ================================================== */}

            <div
                className="
                    relative
                    max-w-7xl
                    mx-auto
                "
            >

                {/* ==================================================
                    HERO / INTRO
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: -25,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
                        text-center
                        max-w-4xl
                        mx-auto
                        mb-10
                    "
                >

                    {/* ==================================================
                        ANIMATED KRISHISETU AI LOGO
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.6,
                            rotate: -20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                        }}
                        className="
                            relative
                            mx-auto
                            w-28
                            h-28
                            md:w-32
                            md:h-32
                            mb-6
                        "
                    >

                        {/* OUTER GLOW */}

                        <motion.div
                            animate={{
                                scale: [
                                    1,
                                    1.2,
                                    1,
                                ],
                                opacity: [
                                    0.25,
                                    0.5,
                                    0.25,
                                ],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-emerald-400
                                blur-2xl
                            "
                        />

                        {/* ROTATING OUTER RING */}

                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                inset-[-8px]
                                rounded-full
                                border-2
                                border-dashed
                                border-green-500/50
                            "
                        />

                        {/* SECOND ROTATING RING */}

                        <motion.div
                            animate={{
                                rotate: -360,
                            }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                inset-[-15px]
                                rounded-full
                                border
                                border-emerald-300/30
                            "
                        />

                        {/* MAIN LOGO */}

                        <motion.div
                            animate={{
                                y: [
                                    0,
                                    -7,
                                    0,
                                ],
                                scale: [
                                    1,
                                    1.05,
                                    1,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                relative
                                w-full
                                h-full
                                rounded-[2rem]
                                bg-gradient-to-br
                                from-green-800
                                via-emerald-600
                                to-green-400
                                shadow-2xl
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                                border-4
                                border-white/30
                            "
                        >

                            {/* INNER LIGHT */}

                            <motion.div
                                animate={{
                                    x: [
                                        "-120%",
                                        "120%",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatDelay: 1,
                                    ease: "easeInOut",
                                }}
                                className="
                                    absolute
                                    top-0
                                    left-0
                                    w-1/3
                                    h-full
                                    bg-white/20
                                    skew-x-12
                                    blur-md
                                "
                            />

                            {/* LEAF */}

                            <motion.div
                                animate={{
                                    rotate: [
                                        0,
                                        -8,
                                        8,
                                        0,
                                    ],
                                    scale: [
                                        1,
                                        1.12,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >

                                <Leaf
                                    size={54}
                                    strokeWidth={1.8}
                                    className="
                                        text-white
                                        drop-shadow-lg
                                    "
                                />

                            </motion.div>

                            {/* AI DOT 1 */}

                            <motion.span
                                animate={{
                                    scale: [
                                        1,
                                        1.8,
                                        1,
                                    ],
                                    opacity: [
                                        0.5,
                                        1,
                                        0.5,
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                }}
                                className="
                                    absolute
                                    top-5
                                    left-6
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-yellow-300
                                "
                            />

                            {/* AI DOT 2 */}

                            <motion.span
                                animate={{
                                    scale: [
                                        1,
                                        1.8,
                                        1,
                                    ],
                                    opacity: [
                                        0.5,
                                        1,
                                        0.5,
                                    ],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: 0.5,
                                }}
                                className="
                                    absolute
                                    bottom-6
                                    right-6
                                    w-2
                                    h-2
                                    rounded-full
                                    bg-cyan-300
                                "
                            />

                        </motion.div>

                        {/* SPARKLE 1 */}

                        <motion.div
                            animate={{
                                scale: [
                                    1,
                                    1.4,
                                    1,
                                ],
                                rotate: [
                                    0,
                                    20,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="
                                absolute
                                -top-5
                                -right-5
                            "
                        >

                            <Sparkles
                                size={26}
                                className="text-yellow-400"
                                fill="currentColor"
                            />

                        </motion.div>

                        {/* SPARKLE 2 */}

                        <motion.div
                            animate={{
                                y: [
                                    0,
                                    -6,
                                    0,
                                ],
                                opacity: [
                                    0.4,
                                    1,
                                    0.4,
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.7,
                            }}
                            className="
                                absolute
                                bottom-0
                                -left-6
                            "
                        >

                            <Sparkles
                                size={18}
                                className="text-emerald-500"
                                fill="currentColor"
                            />

                        </motion.div>

                        {/* FLOATING PARTICLE */}

                        <motion.div
                            animate={{
                                y: [
                                    0,
                                    -15,
                                    0,
                                ],
                                x: [
                                    0,
                                    5,
                                    0,
                                ],
                                opacity: [
                                    0,
                                    1,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                delay: 1,
                            }}
                            className="
                                absolute
                                -top-8
                                left-1/2
                                w-2
                                h-2
                                rounded-full
                                bg-green-500
                            "
                        />

                    </motion.div>


                    {/* ==================================================
                        PROFESSIONAL AI STATUS
                    ================================================== */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 8,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            delay: 0.25,
                        }}
                        className="
                            flex
                            items-center
                            justify-center
                            gap-3
                            mb-5
                        "
                    >

                        {/* STATUS SIGNAL */}

                        <div
                            className="
                                relative
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <motion.span
                                animate={{
                                    scale: [
                                        1,
                                        1.8,
                                        1,
                                    ],
                                    opacity: [
                                        0.7,
                                        0,
                                        0.7,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                }}
                                className="
                                    absolute
                                    w-3
                                    h-3
                                    rounded-full
                                    bg-emerald-400
                                "
                            />

                            <span
                                className="
                                    relative
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    bg-emerald-500
                                "
                            />

                        </div>

                        {/* LEFT LINE */}

                        <div
                            className="
                                hidden
                                sm:block
                                w-10
                                md:w-16
                                h-px
                                bg-gradient-to-r
                                from-transparent
                                to-green-200
                            "
                        />

                        {/* BRAND */}

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <Sparkles
                                size={15}
                                className="text-green-600"
                            />

                            <span
                                className="
                                    text-xs
                                    md:text-sm
                                    font-semibold
                                    tracking-wide
                                    text-green-700
                                "
                            >
                                KrishiSetu AI
                            </span>

                            <span
                                className="text-gray-300"
                            >
                                /
                            </span>

                            <span
                                className="
                                    text-xs
                                    md:text-sm
                                    text-gray-500
                                "
                            >
                                Intelligent Farming
                            </span>

                        </div>

                        {/* RIGHT LINE */}

                        <div
                            className="
                                hidden
                                sm:block
                                w-10
                                md:w-16
                                h-px
                                bg-gradient-to-l
                                from-transparent
                                to-green-200
                            "
                        />

                    </motion.div>


                    {/* ==================================================
                        TITLE
                    ================================================== */}

                    <h1
                        className="
                            text-4xl
                            md:text-6xl
                            font-black
                            tracking-tight
                            text-gray-800
                        "
                    >

                        Smart Farming with{" "}

                        <span
                            className="
                                bg-gradient-to-r
                                from-green-600
                                to-emerald-500
                                bg-clip-text
                                text-transparent
                            "
                        >
                            KrishiSetu AI
                        </span>

                        {" "}🌾

                    </h1>


                    {/* DESCRIPTION */}

                    <p
                        className="
                            max-w-3xl
                            mx-auto
                            mt-5
                            text-gray-600
                            text-sm
                            md:text-lg
                            leading-relaxed
                        "
                    >

                        Your intelligent digital farming companion.
                        Get assistance with crops, diseases, weather,
                        mandi prices and government schemes — all in
                        one place.

                    </p>

                </motion.section>


                {/* ==================================================
                    FARMER + AI INFORMATION
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-6
                        mb-10
                    "
                >

                    {/* ==================================================
                        FARMER CARD
                    ================================================== */}

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-3xl
                            bg-gradient-to-br
                            from-green-800
                            via-green-700
                            to-emerald-500
                            p-7
                            md:p-9
                            text-white
                            shadow-2xl
                        "
                    >

                        {/* DECORATIVE CIRCLE */}

                        <div
                            className="
                                absolute
                                -right-16
                                -top-16
                                w-48
                                h-48
                                rounded-full
                                bg-white/10
                            "
                        />

                        <div
                            className="
                                absolute
                                -bottom-20
                                -left-10
                                w-52
                                h-52
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
                                gap-6
                                items-center
                            "
                        >

                            {/* FARMER AVATAR */}

                            <motion.div
                                animate={{
                                    scale: [
                                        1,
                                        1.04,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                                className="
                                    flex-shrink-0
                                    w-32
                                    h-32
                                    md:w-40
                                    md:h-40
                                    rounded-full
                                    bg-white/15
                                    border-4
                                    border-white/30
                                    flex
                                    items-center
                                    justify-center
                                    shadow-xl
                                    overflow-hidden
                                "
                            >

                               <img
    src={farmerImage}
    alt="Indian Farmer"
    className="
        w-full
        h-full
        object-cover
        object-center
    "
/>

                            </motion.div>


                            <div>

                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-white/15
                                        px-3
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        mb-3
                                    "
                                >

                                    <Wheat
                                        size={14}
                                    />

                                    Built for Indian Farmers

                                </div>


                                <h2
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-black
                                    "
                                >

                                    Technology for
                                    <br />

                                    <span
                                        className="
                                            text-green-200
                                        "
                                    >
                                        Every Farmer
                                    </span>

                                </h2>


                                <p
                                    className="
                                        mt-3
                                        text-green-50
                                        text-sm
                                        leading-relaxed
                                    "
                                >

                                    KrishiSetu AI helps farmers make
                                    smarter decisions using artificial
                                    intelligence, agricultural knowledge
                                    and real-time information.

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ==================================================
                        AI INFORMATION CARD
                    ================================================== */}

                    <div
                        className="
                            bg-white
                            rounded-3xl
                            border
                            border-green-100
                            shadow-xl
                            p-7
                            md:p-9
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-4
                                mb-5
                            "
                        >

                            <motion.div
                                animate={{
                                    rotate: [
                                        0,
                                        5,
                                        -5,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                                className="
                                    w-14
                                    h-14
                                    rounded-2xl
                                    bg-green-100
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Bot
                                    size={30}
                                    className="text-green-600"
                                />

                            </motion.div>


                            <div>

                                <h2
                                    className="
                                        text-2xl
                                        font-bold
                                        text-gray-800
                                    "
                                >
                                    What can KrishiSetu AI do?
                                </h2>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                    "
                                >
                                    Your smart farming companion
                                </p>

                            </div>

                        </div>


                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-3
                            "
                        >

                            {/* CROP */}

                            <div
                                className="
                                    rounded-2xl
                                    bg-green-50
                                    p-4
                                "
                            >

                                <Sprout
                                    size={22}
                                    className="
                                        text-green-600
                                        mb-2
                                    "
                                />

                                <p
                                    className="
                                        font-bold
                                        text-gray-800
                                        text-sm
                                    "
                                >
                                    Crop Advice
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Better crop decisions
                                </p>

                            </div>


                            {/* DISEASE */}

                            <div
                                className="
                                    rounded-2xl
                                    bg-red-50
                                    p-4
                                "
                            >

                                <Bug
                                    size={22}
                                    className="
                                        text-red-500
                                        mb-2
                                    "
                                />

                                <p
                                    className="
                                        font-bold
                                        text-gray-800
                                        text-sm
                                    "
                                >
                                    Disease Help
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Protect your crops
                                </p>

                            </div>


                            {/* WEATHER */}

                            <div
                                className="
                                    rounded-2xl
                                    bg-blue-50
                                    p-4
                                "
                            >

                                <CloudSun
                                    size={22}
                                    className="
                                        text-blue-500
                                        mb-2
                                    "
                                />

                                <p
                                    className="
                                        font-bold
                                        text-gray-800
                                        text-sm
                                    "
                                >
                                    Weather
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Plan farm activities
                                </p>

                            </div>


                            {/* SCHEMES */}

                            <div
                                className="
                                    rounded-2xl
                                    bg-purple-50
                                    p-4
                                "
                            >

                                <ShieldCheck
                                    size={22}
                                    className="
                                        text-purple-500
                                        mb-2
                                    "
                                />

                                <p
                                    className="
                                        font-bold
                                        text-gray-800
                                        text-sm
                                    "
                                >
                                    Schemes
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-gray-500
                                        mt-1
                                    "
                                >
                                    Find farmer benefits
                                </p>

                            </div>

                        </div>

                    </div>

                </motion.section>


                {/* ==================================================
                    FEATURE CARDS
                ================================================== */}

                <section className="mb-12">

                    <div
                        className="
                            text-center
                            mb-6
                        "
                    >

                        <span
                            className="
                                text-green-600
                                text-sm
                                font-bold
                            "
                        >
                            SMART FARMING TOOLS
                        </span>

                        <h2
                            className="
                                text-2xl
                                md:text-3xl
                                font-black
                                text-gray-800
                                mt-1
                            "
                        >
                            Everything You Need
                        </h2>

                    </div>


                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-5
                        "
                    >

                        {features.map(
                            (
                                feature,
                                index
                            ) => {

                                const Icon =
                                    feature.icon;

                                return (

                                    <motion.button
                                        key={
                                            feature.title
                                        }
                                        type="button"
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
                                            delay:
                                                index * 0.08,
                                        }}
                                        whileHover={{
                                            y: -8,
                                            scale: 1.02,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        onClick={() =>
                                            handleQuickQuestion(
                                                feature.question
                                            )
                                        }
                                        className={`
                                            group
                                            text-left
                                            bg-white
                                            rounded-3xl
                                            p-5
                                            border
                                            ${feature.border}
                                            shadow-md
                                            hover:shadow-2xl
                                            transition
                                        `}
                                    >

                                        <div
                                            className={`
                                                w-13
                                                h-13
                                                p-3
                                                rounded-2xl
                                                ${feature.iconBg}
                                                ${feature.iconColor}
                                                mb-4
                                            `}
                                        >

                                            <Icon
                                                size={26}
                                            />

                                        </div>


                                        <h3
                                            className="
                                                font-bold
                                                text-gray-800
                                            "
                                        >
                                            {
                                                feature.title
                                            }
                                        </h3>


                                        <p
                                            className="
                                                text-sm
                                                text-gray-500
                                                mt-2
                                                leading-relaxed
                                            "
                                        >
                                            {
                                                feature.description
                                            }
                                        </p>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                mt-4
                                                text-green-600
                                                text-sm
                                                font-semibold
                                            "
                                        >

                                            Ask AI

                                            <ArrowRight
                                                size={15}
                                                className="
                                                    group-hover:translate-x-1
                                                    transition
                                                "
                                            />

                                        </div>

                                    </motion.button>

                                );

                            }
                        )}

                    </div>

                </section>


                {/* ==================================================
                    FARMING STATS
                ================================================== */}

              {/* ==================================================
    KRISHISETU AI — SMART FARMING HIGHLIGHTS
================================================== */}

<motion.section
    initial={{
        opacity: 0,
        y: 35,
    }}
    whileInView={{
        opacity: 1,
        y: 0,
    }}
    viewport={{
        once: true,
        amount: 0.2,
    }}
    transition={{
        duration: 0.7,
    }}
    className="
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-green-100
        bg-white
        shadow-xl
        p-5
        md:p-8
        mb-10
    "
>
    {/* BACKGROUND DECORATION */}

    <motion.div
        animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
        }}
        transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="
            absolute
            -top-24
            -right-24
            w-64
            h-64
            rounded-full
            bg-green-100
            blur-3xl
            opacity-60
            pointer-events-none
        "
    />

    <motion.div
        animate={{
            x: [0, -25, 0],
            y: [0, 20, 0],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
        }}
        className="
            absolute
            -bottom-24
            -left-24
            w-64
            h-64
            rounded-full
            bg-emerald-100
            blur-3xl
            opacity-60
            pointer-events-none
        "
    />

    <div className="relative">

        {/* SECTION HEADER */}

        <div className="text-center mb-7">

            <div
                className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-green-50
                    border
                    border-green-100
                    text-green-700
                    text-xs
                    font-bold
                    tracking-wide
                    mb-3
                "
            >
                <Sparkles size={13} />

                KRISHISETU INTELLIGENCE
            </div>

            <h2
                className="
                    text-2xl
                    md:text-3xl
                    font-black
                    text-gray-800
                "
            >
                Smarter Decisions.
                <span
                    className="
                        ml-2
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-500
                        bg-clip-text
                        text-transparent
                    "
                >
                    Better Farming.
                </span>
            </h2>

            <p
                className="
                    text-sm
                    text-gray-500
                    mt-2
                    max-w-xl
                    mx-auto
                "
            >
                Everything you need to make confident farming
                decisions with KrishiSetu AI.
            </p>

        </div>


        {/* FEATURE GRID */}

        <div
            className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
            "
        >

            {/* ==================================================
                CROP INTELLIGENCE
            ================================================== */}

            <motion.div
                whileHover={{
                    y: -6,
                    scale: 1.02,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-green-100
                    bg-gradient-to-br
                    from-green-50
                    to-white
                    p-5
                    cursor-default
                    shadow-sm
                    hover:shadow-lg
                "
            >

                <motion.div
                    animate={{
                        rotate: [0, 8, -8, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-green-100
                        flex
                        items-center
                        justify-center
                        mb-4
                    "
                >
                    <Sprout
                        size={25}
                        className="text-green-600"
                    />
                </motion.div>

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-green-600
                    "
                >
                    AI Insight
                </span>

                <h3
                    className="
                        text-lg
                        font-black
                        text-gray-800
                        mt-1
                    "
                >
                    Crop Intelligence
                </h3>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-2
                        leading-relaxed
                    "
                >
                    Discover smarter crop choices based on
                    your farming conditions.
                </p>

                <div
                    className="
                        absolute
                        -right-8
                        -bottom-8
                        w-24
                        h-24
                        rounded-full
                        bg-green-100
                        opacity-50
                        group-hover:scale-150
                        transition-transform
                        duration-500
                    "
                />

            </motion.div>


            {/* ==================================================
                WEATHER INTELLIGENCE
            ================================================== */}

            <motion.div
                whileHover={{
                    y: -6,
                    scale: 1.02,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-blue-100
                    bg-gradient-to-br
                    from-blue-50
                    to-white
                    p-5
                    cursor-default
                    shadow-sm
                    hover:shadow-lg
                "
            >

                <motion.div
                    animate={{
                        y: [0, -4, 0],
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        mb-4
                    "
                >
                    <CloudSun
                        size={25}
                        className="text-blue-600"
                    />
                </motion.div>

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-blue-600
                    "
                >
                    Live Guidance
                </span>

                <h3
                    className="
                        text-lg
                        font-black
                        text-gray-800
                        mt-1
                    "
                >
                    Weather Intelligence
                </h3>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-2
                        leading-relaxed
                    "
                >
                    Plan irrigation, spraying and field work
                    around changing weather.
                </p>

                <div
                    className="
                        absolute
                        -right-8
                        -bottom-8
                        w-24
                        h-24
                        rounded-full
                        bg-blue-100
                        opacity-50
                        group-hover:scale-150
                        transition-transform
                        duration-500
                    "
                />

            </motion.div>


            {/* ==================================================
                RESOURCE INTELLIGENCE
            ================================================== */}

            <motion.div
                whileHover={{
                    y: -6,
                    scale: 1.02,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-cyan-100
                    bg-gradient-to-br
                    from-cyan-50
                    to-white
                    p-5
                    cursor-default
                    shadow-sm
                    hover:shadow-lg
                "
            >

                <motion.div
                    animate={{
                        scale: [1, 1.08, 1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-cyan-100
                        flex
                        items-center
                        justify-center
                        mb-4
                    "
                >
                    <Droplets
                        size={25}
                        className="text-cyan-600"
                    />
                </motion.div>

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-cyan-600
                    "
                >
                    Smart Farming
                </span>

                <h3
                    className="
                        text-lg
                        font-black
                        text-gray-800
                        mt-1
                    "
                >
                    Resource Efficiency
                </h3>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-2
                        leading-relaxed
                    "
                >
                    Use water and farm resources more
                    efficiently with AI guidance.
                </p>

                <div
                    className="
                        absolute
                        -right-8
                        -bottom-8
                        w-24
                        h-24
                        rounded-full
                        bg-cyan-100
                        opacity-50
                        group-hover:scale-150
                        transition-transform
                        duration-500
                    "
                />

            </motion.div>


            {/* ==================================================
                FARMING SUPPORT
            ================================================== */}

            <motion.div
                whileHover={{
                    y: -6,
                    scale: 1.02,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-orange-100
                    bg-gradient-to-br
                    from-orange-50
                    to-white
                    p-5
                    cursor-default
                    shadow-sm
                    hover:shadow-lg
                "
            >

                <motion.div
                    animate={{
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        w-12
                        h-12
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                        mb-4
                    "
                >
                    <Tractor
                        size={25}
                        className="text-orange-600"
                    />
                </motion.div>

                <span
                    className="
                        text-[10px]
                        font-bold
                        uppercase
                        tracking-widest
                        text-orange-600
                    "
                >
                    Farm Support
                </span>

                <h3
                    className="
                        text-lg
                        font-black
                        text-gray-800
                        mt-1
                    "
                >
                    Modern Farming
                </h3>

                <p
                    className="
                        text-xs
                        text-gray-500
                        mt-2
                        leading-relaxed
                    "
                >
                    Bring modern technology and practical
                    farming knowledge together.
                </p>

                <div
                    className="
                        absolute
                        -right-8
                        -bottom-8
                        w-24
                        h-24
                        rounded-full
                        bg-orange-100
                        opacity-50
                        group-hover:scale-150
                        transition-transform
                        duration-500
                    "
                />

            </motion.div>

        </div>


        {/* ==================================================
            BOTTOM AI STATUS
        ================================================== */}

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
            transition={{
                delay: 0.4,
            }}
            className="
                flex
                items-center
                justify-center
                gap-2
                mt-6
                text-xs
                text-gray-500
            "
        >

           

        </motion.div>

    </div>

</motion.section>


                {/* ==================================================
                    QUICK QUESTIONS
                ================================================== */}

                


               

            </div>


            {/* ==================================================
                FLOATING CHAT BUTTON
            ================================================== */}

            <div
                className="
                    fixed
                    z-50
                    bottom-5
                    right-5
                    md:bottom-7
                    md:right-7
                "
            >

                {/* CHAT TOOLTIP */}

              <AnimatePresence>
    {!chatOpen && (
        <motion.div
            initial={{
                opacity: 0,
                x: 12,
                scale: 0.85,
            }}
            animate={{
                opacity: 1,
                x: 0,
                scale: 1,
            }}
            exit={{
                opacity: 0,
                x: 12,
                scale: 0.85,
            }}
            transition={{
                duration: 0.25,
            }}
            className="
                absolute
                right-16
                md:right-20
                bottom-1
                z-50
            "
        >
            {/* CLOUD */}
            <div
                className="
                    relative
                    bg-white
                    px-3
                    py-2
                    rounded-[18px]
                    shadow-lg
                    border
                    border-green-100
                    text-green-700
                    text-[11px]
                    md:text-xs
                    font-semibold
                    whitespace-nowrap
                "
            >
                Ask KrishiSetu AI 🤖

                {/* CLOUD TAIL */}
                <div
                    className="
                        absolute
                        right-[-5px]
                        bottom-2
                        w-3
                        h-3
                        bg-white
                        border-r
                        border-t
                        border-green-100
                        rotate-45
                    "
                />
            </div>
        </motion.div>
    )}
</AnimatePresence>


                {/* PULSING RING */}

                {!chatOpen && (

                    <motion.div
                        animate={{
                            scale: [
                                1,
                                1.35,
                                1,
                            ],
                            opacity: [
                                0.5,
                                0,
                                0.5,
                            ],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="
                            absolute
                            inset-0
                            rounded-full
                            bg-green-500
                        "
                    />

                )}


                {/* CHAT CIRCLE */}

                <motion.button
                    type="button"
                    onClick={() =>
                        setChatOpen(
                            !chatOpen
                        )
                    }
                    whileHover={{
                        scale: 1.08,
                    }}
                    whileTap={{
                        scale: 0.92,
                    }}
                    className="
                        relative
                        w-14
                        h-14
                        md:w-16
                        md:h-16
                        rounded-full
                        bg-gradient-to-br
                        from-green-700
                        via-emerald-600
                        to-green-500
                        text-white
                        shadow-2xl
                        flex
                        items-center
                        justify-center
                        border-4
                        border-white
                    "
                >

                    <AnimatePresence
                        mode="wait"
                    >

                        {chatOpen ? (

                            <motion.div
                                key="close"
                                initial={{
                                    rotate: -90,
                                    opacity: 0,
                                }}
                                animate={{
                                    rotate: 0,
                                    opacity: 1,
                                }}
                                exit={{
                                    rotate: 90,
                                    opacity: 0,
                                }}
                            >

                                <X
                                    size={27}
                                />

                            </motion.div>

                        ) : (

                            <motion.div
                                key="chat"
                                initial={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale: 1,
                                    opacity: 1,
                                }}
                                exit={{
                                    scale: 0,
                                    opacity: 0,
                                }}
                            >

                                <MessageCircle
                                    size={27}
                                />

                            </motion.div>

                        )}

                    </AnimatePresence>

                </motion.button>

            </div>


            {/* ==================================================
                FLOATING CHAT WINDOW
            ================================================== */}

            <AnimatePresence>

                {chatOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 30,
                            scale: 0.92,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            y: 30,
                            scale: 0.92,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                        className="
                            fixed
                            z-40
                            right-3
                            bottom-24
                            md:right-7
                            md:bottom-28
                            w-[calc(100vw-24px)]
                            sm:w-[390px]
                            md:w-[420px]
                            h-[min(650px,calc(100vh-120px))]
                            bg-white
                            rounded-3xl
                            shadow-[0_20px_70px_rgba(0,0,0,0.20)]
                            border
                            border-green-100
                            overflow-hidden
                            flex
                            flex-col
                        "
                    >

                        {/* ==================================================
                            CHAT HEADER
                        ================================================== */}

                        <div
                            className="
                                flex-shrink-0
                                px-4
                                py-4
                                bg-gradient-to-r
                                from-green-700
                                via-emerald-600
                                to-green-500
                                text-white
                                flex
                                items-center
                                justify-between
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            -3,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        w-11
                                        h-11
                                        rounded-2xl
                                        bg-white/20
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Leaf
                                        size={25}
                                    />

                                </motion.div>


                                <div>

                                    <h2
                                        className="
                                            font-bold
                                            text-base
                                        "
                                    >
                                        KrishiSetu AI
                                    </h2>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1.5
                                            text-xs
                                            text-green-100
                                        "
                                    >

                                        <span
                                            className="
                                                w-2
                                                h-2
                                                rounded-full
                                                bg-green-300
                                            "
                                        />

                                        Online • Ready to help

                                    </div>

                                </div>

                            </div>


                            <button
                                type="button"
                                onClick={() =>
                                    setChatOpen(false)
                                }
                                className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    bg-white/15
                                    hover:bg-white/25
                                    flex
                                    items-center
                                    justify-center
                                    transition
                                "
                            >

                                <X
                                    size={20}
                                />

                            </button>

                        </div>


                        {/* ==================================================
                            CHAT MESSAGE AREA
                        ================================================== */}

                        <div
                            className="
                                flex-1
                                min-h-0
                                overflow-y-auto
                                p-3
                                md:p-4
                                space-y-3
                                bg-gradient-to-b
                                from-gray-50
                                to-green-50/40
                            "
                        >

                            {messages.map(
                                (
                                    msg,
                                    index
                                ) => (

                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 12,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                    >

                                        <MessageBubble
                                            role={
                                                msg.role
                                            }
                                            text={
                                                msg.text
                                            }
                                        />

                                    </motion.div>

                                )
                            )}


                            {/* TYPING INDICATOR */}

                            {loading && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        bg-white
                                        border
                                        border-green-100
                                        shadow-sm
                                        rounded-2xl
                                        px-4
                                        py-3
                                        w-fit
                                    "
                                >

                                    <div
                                        className="
                                            w-8
                                            h-8
                                            rounded-full
                                            bg-green-100
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <Bot
                                            size={18}
                                            className="
                                                text-green-600
                                            "
                                        />

                                    </div>


                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-medium
                                                text-gray-600
                                            "
                                        >
                                            KrishiSetu AI is thinking
                                        </p>


                                        <div
                                            className="
                                                flex
                                                gap-1
                                                mt-1
                                            "
                                        >

                                            <span
                                                className="
                                                    w-1.5
                                                    h-1.5
                                                    bg-green-500
                                                    rounded-full
                                                    animate-bounce
                                                "
                                            />

                                            <span
                                                className="
                                                    w-1.5
                                                    h-1.5
                                                    bg-green-500
                                                    rounded-full
                                                    animate-bounce
                                                    [animation-delay:150ms]
                                                "
                                            />

                                            <span
                                                className="
                                                    w-1.5
                                                    h-1.5
                                                    bg-green-500
                                                    rounded-full
                                                    animate-bounce
                                                    [animation-delay:300ms]
                                                "
                                            />

                                        </div>

                                    </div>

                                </motion.div>

                            )}


                            <div
                                ref={chatEndRef}
                            />

                        </div>


                        {/* ==================================================
                            CHAT INPUT
                        ================================================== */}

                        <div
                            className="
                                flex-shrink-0
                                border-t
                                border-green-100
                                bg-white
                            "
                        >

                            <ChatInput
                                onSend={handleSend}
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}

export default ChatLayout;