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
    Tractor,
    Wheat,
    Droplets,
    Bot,
    Zap,
    Shield,
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

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "ai",
            text:
                "🙏 Namaste kisaan bhai 🌾 Main KrishiSetu AI hoon. Aap kheti, fasal, rog, mausam, mandi prices aur government schemes ke baare mein mujhse pooch sakte hain.",
        },
    ]);

    const [loading, setLoading] = useState(false);

    const [chatOpen, setChatOpen] = useState(false);

    // ==================================================
    // VOICE PROCESSING STATE
    // ==================================================

    /*
     * true:
     * Voice recording / speech processing chal raha hai
     *
     * false:
     * Voice message successfully chat me display ho gaya
     */

    const [voiceProcessing, setVoiceProcessing] =
        useState(false);

    // ==================================================
    // REFS
    // ==================================================

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
        voiceProcessing,
        chatOpen,
    ]);

    // ==================================================
    // LOAD HISTORY
    // ==================================================

    const loadHistory = async () => {

        try {

            const data =
                await getChatHistory();

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
                    .flatMap(
                        (chat: any) => [

                            {
                                role: "user" as const,
                                text: chat.message,
                            },

                            {
                                role: "ai" as const,
                                text: chat.response,
                            },

                        ]
                    );

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

            /*
             * Agar voice processing chal raha tha
             * aur empty response mila,
             * loader ko stop kar do.
             */

            setVoiceProcessing(false);

            return;
        }

        const token =
            localStorage.getItem("token");

        if (!token) {

            setVoiceProcessing(false);

            alert(
                "Please login first."
            );

            window.location.href =
                "/login";

            return;
        }

        // ==================================================
        // USER MESSAGE
        // ==================================================

        setMessages((prev) => [

            ...prev,

            {
                role: "user",
                text: message,
            },

        ]);

        // ==================================================
        // START AI LOADING
        // ==================================================

        setLoading(true);

        try {

            const data =
                await sendMessage(
                    message,
                    language
                );

            // ==================================================
            // INVALID RESPONSE
            // ==================================================

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

            // ==================================================
            // AI RESPONSE
            // ==================================================

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

            // ==================================================
            // 401
            // ==================================================

            if (
                error.response?.status === 401
            ) {

                errorMessage =
                    "❌ Session expired. Please login again.";

            }

            // ==================================================
            // 500
            // ==================================================

            else if (
                error.response?.status === 500
            ) {

                errorMessage =
                    "❌ Backend server error. Please try again.";

            }

            // ==================================================
            // NETWORK ERROR
            // ==================================================

            else if (
                error.message ===
                "Network Error"
            ) {

                errorMessage =
                    "❌ Backend se connection nahi ho raha.";

            }

            // ==================================================
            // SHOW ERROR
            // ==================================================

            setMessages((prev) => [

                ...prev,

                {
                    role: "ai",
                    text: errorMessage,
                },

            ]);

        }

        finally {

            // ==================================================
            // STOP AI LOADING
            // ==================================================

            setLoading(false);

            /*
             * IMPORTANT:
             *
             * Voice circle yahan stop hoga.
             *
             * Matlab:
             *
             * Voice →
             * Processing →
             * Message added →
             * AI response →
             * voiceProcessing false
             */

            setVoiceProcessing(false);

        }

    };

    // ==================================================
    // VOICE PROCESSING CALLBACK
    // ==================================================

    /*
     * ChatInput se call hoga.
     *
     * true  = voice processing start
     * false = voice processing finished
     */

    const handleVoiceProcessing =
        (processing: boolean) => {

            setVoiceProcessing(
                processing
            );

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
    // FEATURE DATA
    // ==================================================

    const features = [

        {
            title:
                "Crop Recommendation",

            description:
                "Find suitable crops based on season, soil and farming conditions.",

            icon: Sprout,

            iconBg:
                "bg-emerald-100",

            iconColor:
                "text-emerald-600",

            border:
                "border-emerald-200",

            gradient:
                "from-emerald-50 via-white to-green-100",

            glow:
                "bg-emerald-400/20",

            question:
                "Which crop should I grow based on my soil and season?",
        },

        {
            title:
                "Disease Detection",

            description:
                "Get AI assistance to understand crop diseases and prevention.",

            icon: Bug,

            iconBg:
                "bg-rose-100",

            iconColor:
                "text-rose-600",

            border:
                "border-rose-200",

            gradient:
                "from-rose-50 via-white to-red-100",

            glow:
                "bg-rose-400/20",

            question:
                "How can I identify and prevent crop diseases?",
        },

        {
            title:
                "Weather Guidance",

            description:
                "Understand weather conditions and plan farming activities.",

            icon: CloudSun,

            iconBg:
                "bg-sky-100",

            iconColor:
                "text-sky-600",

            border:
                "border-sky-200",

            gradient:
                "from-sky-50 via-white to-cyan-100",

            glow:
                "bg-sky-400/20",

            question:
                "What weather conditions should I consider for farming?",
        },

        {
            title:
                "Government Schemes",

            description:
                "Discover useful government schemes and farmer benefits.",

            icon: ShieldCheck,

            iconBg:
                "bg-violet-100",

            iconColor:
                "text-violet-600",

            border:
                "border-violet-200",

            gradient:
                "from-violet-50 via-white to-purple-100",

            glow:
                "bg-violet-400/20",

            question:
                "What government schemes are available for farmers?",
        },

    ];

    // ==================================================
    // ANIMATION VARIANTS
    // ==================================================

    const cardVariants = {

        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.94,
        },

        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },

    };

    // ==================================================
    // UI
    // ==================================================

    return (

        <div
            className="
                relative
                min-h-screen
                w-full
                overflow-x-hidden
                bg-gradient-to-br
                from-[#052e16]
                via-[#064e3b]
                to-[#022c22]
                px-4
                py-8
                md:px-8
                md:py-12
                pb-32
            "
        >

            {/* ==================================================
                BACKGROUND PAINT / GLOW
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >

                {/* GREEN PAINT */}

                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        -top-40
                        -left-40
                        w-[600px]
                        h-[600px]
                        rounded-full
                        bg-green-400/25
                        blur-[120px]
                    "
                />

                {/* EMERALD PAINT */}

                <motion.div
                    animate={{
                        x: [0, -70, 0],
                        y: [0, 80, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        top-[15%]
                        -right-48
                        w-[650px]
                        h-[650px]
                        rounded-full
                        bg-emerald-400/20
                        blur-[130px]
                    "
                />

                {/* LIME PAINT */}

                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: 11,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        bottom-[-250px]
                        left-[20%]
                        w-[650px]
                        h-[550px]
                        rounded-full
                        bg-lime-300/15
                        blur-[140px]
                    "
                />

                {/* BLUE PAINT */}

                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="
                        absolute
                        top-[45%]
                        left-[35%]
                        w-[450px]
                        h-[450px]
                        rounded-full
                        bg-cyan-400/10
                        blur-[120px]
                    "
                />

            </div>

            {/* ==================================================
                DOT PATTERN
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-[0.12]
                    bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
                    bg-[size:30px_30px]
                "
            />

            {/* ==================================================
                FLOATING LEAVES
            ================================================== */}

            <motion.div
                animate={{
                    y: [0, -25, 0],
                    rotate: [0, 12, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    top-[15%]
                    left-[2%]
                    hidden
                    lg:block
                    text-green-200/10
                "
            >

                <Leaf size={150} />

            </motion.div>

            <motion.div
                animate={{
                    y: [0, 25, 0],
                    rotate: [0, -12, 0],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="
                    pointer-events-none
                    absolute
                    top-[45%]
                    right-[2%]
                    hidden
                    lg:block
                    text-emerald-200/10
                "
            >

                <Sprout size={160} />

            </motion.div>

            {/* ==================================================
                MAIN
            ================================================== */}

            <div
                className="
                    relative
                    z-10
                    max-w-7xl
                    mx-auto
                "
            >

                {/* ==================================================
                    HERO
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: -40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.8,
                    }}
                    className="
                        text-center
                        max-w-5xl
                        mx-auto
                        mb-14
                    "
                >

                    {/* LOGO */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.5,
                            rotate: -30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                        }}
                        transition={{
                            duration: 1,
                            ease: "easeOut",
                        }}
                        className="
                            relative
                            mx-auto
                            w-32
                            h-32
                            md:w-40
                            md:h-40
                            mb-8
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 10,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="
                                absolute
                                inset-[-15px]
                                rounded-full
                                border
                                border-dashed
                                border-green-300/40
                            "
                        />

                        <motion.div
                            animate={{
                                scale: [
                                    0.8,
                                    1.4,
                                    1.7,
                                ],
                                opacity: [
                                    0.5,
                                    0.2,
                                    0,
                                ],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                            }}
                            className="
                                absolute
                                w-28
                                h-28
                                rounded-full
                                border-2
                                border-green-300
                            "
                        />

                        <motion.div
                            animate={{
                                y: [0, -7, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                relative
                                z-10
                                w-28
                                h-28
                                md:w-32
                                md:h-32
                                rounded-[2rem]
                                bg-gradient-to-br
                                from-green-900
                                via-emerald-600
                                to-green-400
                                shadow-[0_25px_70px_rgba(16,185,129,0.45)]
                                flex
                                items-center
                                justify-center
                                overflow-hidden
                                border
                                border-white/20
                            "
                        >

                            <div
                                className="
                                    absolute
                                    inset-0
                                    opacity-20
                                    bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
                                    bg-[size:12px_12px]
                                "
                            />

                            <motion.div
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="
                                    absolute
                                    w-20
                                    h-20
                                    rounded-full
                                    border
                                    border-white/30
                                    border-t-white
                                "
                            />

                            <motion.div
                                animate={{
                                    scale: [
                                        1,
                                        1.12,
                                        1,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="
                                    relative
                                    z-10
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-white
                                    shadow-xl
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <Sprout
                                    size={34}
                                    className="text-green-700"
                                    strokeWidth={2.4}
                                />

                            </motion.div>

                            <motion.span
                                animate={{
                                    y: [-8, 8, -8],
                                    opacity: [
                                        0.3,
                                        1,
                                        0.3,
                                    ],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                }}
                                className="
                                    absolute
                                    top-4
                                    left-5
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    bg-yellow-300
                                "
                            />

                            <motion.span
                                animate={{
                                    y: [8, -8, 8],
                                    opacity: [
                                        0.3,
                                        1,
                                        0.3,
                                    ],
                                }}
                                transition={{
                                    duration: 2.2,
                                    repeat: Infinity,
                                }}
                                className="
                                    absolute
                                    bottom-5
                                    right-5
                                    w-2.5
                                    h-2.5
                                    rounded-full
                                    bg-cyan-200
                                "
                            />

                        </motion.div>

                    </motion.div>

                    {/* TITLE */}

                    <h1
                        className="
                            text-4xl
                            md:text-6xl
                            lg:text-7xl
                            font-black
                            tracking-tight
                            text-white
                        "
                    >

                        Smart Farming

                        <br />

                        <span
                            className="
                                bg-gradient-to-r
                                from-lime-300
                                via-emerald-300
                                to-green-200
                                bg-clip-text
                                text-transparent
                            "
                        >
                            Powered by KrishiSetu AI
                        </span>

                    </h1>

                    <p
                        className="
                            max-w-3xl
                            mx-auto
                            mt-6
                            text-green-50/80
                            text-sm
                            md:text-lg
                            leading-relaxed
                        "
                    >
                        Your intelligent digital farming companion.
                        Get assistance with crops, diseases, weather,
                        mandi prices and government schemes — all in
                        one powerful platform.
                    </p>

                    {/* BADGES */}

                    <div
                        className="
                            flex
                            flex-wrap
                            justify-center
                            gap-3
                            mt-7
                        "
                    >

                        {[
                            {
                                icon: Leaf,
                                text: "AI Farming",
                            },
                            {
                                icon: Zap,
                                text: "Smart Insights",
                            },
                            {
                                icon: Shield,
                                text: "Farmer First",
                            },
                        ].map((item) => {

                            const Icon =
                                item.icon;

                            return (

                                <motion.div
                                    key={item.text}
                                    whileHover={{
                                        y: -4,
                                        scale: 1.05,
                                    }}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-white/10
                                        backdrop-blur-xl
                                        border
                                        border-white/20
                                        text-green-50
                                        text-xs
                                        font-semibold
                                    "
                                >

                                    <Icon size={15} />

                                    {item.text}

                                </motion.div>

                            );

                        })}

                    </div>

                </motion.section>

                {/* ==================================================
                    FARMER + AI SECTION
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 40,
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
                        duration: 0.8,
                    }}
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-6
                        mb-14
                    "
                >

                    {/* FARMER CARD */}

                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.01,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                        }}
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            bg-gradient-to-br
                            from-green-950
                            via-emerald-800
                            to-green-500
                            p-7
                            md:p-9
                            text-white
                            shadow-[0_25px_70px_rgba(0,0,0,0.25)]
                            border
                            border-white/10
                        "
                    >

                        <motion.div
                            animate={{
                                x: [0, 50, 0],
                                y: [0, -30, 0],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                            }}
                            className="
                                absolute
                                -right-20
                                -top-20
                                w-64
                                h-64
                                rounded-full
                                bg-lime-300/20
                                blur-3xl
                            "
                        />

                        <motion.div
                            animate={{
                                x: [0, -40, 0],
                                y: [0, 20, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                            }}
                            className="
                                absolute
                                -bottom-24
                                -left-20
                                w-72
                                h-72
                                rounded-full
                                bg-emerald-300/20
                                blur-3xl
                            "
                        />

                        <div
                            className="
                                relative
                                flex
                                flex-col
                                md:flex-row
                                gap-7
                                items-center
                            "
                        >

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
                                    bg-white/10
                                    border-4
                                    border-white/20
                                    flex
                                    items-center
                                    justify-center
                                    shadow-2xl
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
                                    "
                                />

                            </motion.div>

                            <div>

                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-white/10
                                        border
                                        border-white/10
                                        px-3
                                        py-1.5
                                        rounded-full
                                        text-xs
                                        mb-4
                                    "
                                >

                                    <Wheat size={14} />

                                    Built for Indian Farmers

                                </div>

                                <h2
                                    className="
                                        text-3xl
                                        md:text-4xl
                                        font-black
                                    "
                                >

                                    Technology for

                                    <br />

                                    <span className="text-lime-200">
                                        Every Farmer
                                    </span>

                                </h2>

                                <p
                                    className="
                                        mt-4
                                        text-green-50/80
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

                    </motion.div>

                    {/* AI CARD */}

                    <motion.div
                        whileHover={{
                            y: -8,
                            scale: 1.01,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 20,
                        }}
                        className="
                            relative
                            overflow-hidden
                            rounded-[2rem]
                            bg-gradient-to-br
                            from-white
                            via-green-50
                            to-emerald-100
                            border
                            border-white/60
                            shadow-[0_25px_70px_rgba(0,0,0,0.18)]
                            p-7
                            md:p-9
                        "
                    >

                        <motion.div
                            animate={{
                                scale: [
                                    1,
                                    1.2,
                                    1,
                                ],
                                opacity: [
                                    0.3,
                                    0.5,
                                    0.3,
                                ],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                            }}
                            className="
                                absolute
                                -right-20
                                -top-20
                                w-60
                                h-60
                                rounded-full
                                bg-green-300/30
                                blur-3xl
                            "
                        />

                        <div className="relative">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-4
                                    mb-6
                                "
                            >

                                <motion.div
                                    animate={{
                                        rotate: [
                                            0,
                                            8,
                                            -8,
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
                                        bg-gradient-to-br
                                        from-green-500
                                        to-emerald-600
                                        text-white
                                        shadow-lg
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Bot size={30} />

                                </motion.div>

                                <div>

                                    <h2
                                        className="
                                            text-2xl
                                            font-black
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

                                {[
                                    {
                                        icon: Sprout,
                                        title: "Crop Advice",
                                        text: "Better crop decisions",
                                        bg: "bg-green-100",
                                        color: "text-green-600",
                                    },
                                    {
                                        icon: Bug,
                                        title: "Disease Help",
                                        text: "Protect your crops",
                                        bg: "bg-red-100",
                                        color: "text-red-500",
                                    },
                                    {
                                        icon: CloudSun,
                                        title: "Weather",
                                        text: "Plan farm activities",
                                        bg: "bg-blue-100",
                                        color: "text-blue-500",
                                    },
                                    {
                                        icon: ShieldCheck,
                                        title: "Schemes",
                                        text: "Find farmer benefits",
                                        bg: "bg-purple-100",
                                        color: "text-purple-500",
                                    },
                                ].map(
                                    (
                                        item,
                                        index
                                    ) => {

                                        const Icon =
                                            item.icon;

                                        return (

                                            <motion.div
                                                key={
                                                    item.title
                                                }
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.9,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                viewport={{
                                                    once: true,
                                                }}
                                                transition={{
                                                    delay:
                                                        index *
                                                        0.1,
                                                }}
                                                whileHover={{
                                                    y: -5,
                                                    scale: 1.04,
                                                }}
                                                className="
                                                    rounded-2xl
                                                    bg-white/70
                                                    backdrop-blur-sm
                                                    border
                                                    border-white
                                                    p-4
                                                    shadow-sm
                                                    hover:shadow-lg
                                                    transition
                                                "
                                            >

                                                <div
                                                    className={`
                                                        w-10
                                                        h-10
                                                        rounded-xl
                                                        ${item.bg}
                                                        flex
                                                        items-center
                                                        justify-center
                                                        mb-3
                                                    `}
                                                >

                                                    <Icon
                                                        size={21}
                                                        className={
                                                            item.color
                                                        }
                                                    />

                                                </div>

                                                <p
                                                    className="
                                                        font-bold
                                                        text-gray-800
                                                        text-sm
                                                    "
                                                >
                                                    {
                                                        item.title
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-500
                                                        mt-1
                                                    "
                                                >
                                                    {
                                                        item.text
                                                    }
                                                </p>

                                            </motion.div>

                                        );

                                    }
                                )}

                            </div>

                        </div>

                    </motion.div>

                </motion.section>

                {/* ==================================================
                    FEATURE SECTION
                ================================================== */}

                <section className="mb-14">

                    <motion.div
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
                        className="
                            text-center
                            mb-8
                        "
                    >

                        <span
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-4
                                py-2
                                rounded-full
                                bg-white/10
                                border
                                border-white/20
                                text-lime-200
                                text-xs
                                font-bold
                                tracking-widest
                            "
                        >

                            <Sparkles size={14} />

                            SMART FARMING TOOLS

                        </span>

                        <h2
                            className="
                                text-3xl
                                md:text-4xl
                                font-black
                                text-white
                                mt-4
                            "
                        >
                            Everything You Need
                        </h2>

                        <p
                            className="
                                text-green-100/70
                                text-sm
                                mt-2
                            "
                        >
                            Powerful AI tools designed for modern farmers
                        </p>

                    </motion.div>

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
                                        variants={
                                            cardVariants
                                        }
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{
                                            once: true,
                                            amount: 0.2,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            delay:
                                                index *
                                                0.1,
                                        }}
                                        whileHover={{
                                            y: -12,
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        onClick={() =>
                                            handleQuickQuestion(
                                                feature.question
                                            )
                                        }
                                        className={`
                                            group
                                            relative
                                            overflow-hidden
                                            text-left
                                            rounded-[2rem]
                                            bg-gradient-to-br
                                            ${feature.gradient}
                                            border
                                            ${feature.border}
                                            p-6
                                            shadow-[0_15px_40px_rgba(0,0,0,0.15)]
                                            hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)]
                                            transition-shadow
                                        `}
                                    >

                                        <motion.div
                                            animate={{
                                                x: [
                                                    -20,
                                                    30,
                                                    -20,
                                                ],
                                                y: [
                                                    20,
                                                    -20,
                                                    20,
                                                ],
                                            }}
                                            transition={{
                                                duration:
                                                    6 +
                                                    index,
                                                repeat:
                                                    Infinity,
                                                ease:
                                                    "easeInOut",
                                            }}
                                            className={`
                                                absolute
                                                -right-16
                                                -top-16
                                                w-40
                                                h-40
                                                rounded-full
                                                ${feature.glow}
                                                blur-3xl
                                            `}
                                        />

                                        <motion.div
                                            initial={{
                                                x: "-120%",
                                            }}
                                            whileHover={{
                                                x: "120%",
                                            }}
                                            transition={{
                                                duration: 0.8,
                                            }}
                                            className="
                                                absolute
                                                top-0
                                                bottom-0
                                                w-20
                                                bg-white/40
                                                blur-xl
                                                -skew-x-12
                                            "
                                        />

                                        <div className="relative z-10">

                                            <motion.div
                                                whileHover={{
                                                    rotate: 8,
                                                    scale: 1.12,
                                                }}
                                                className={`
                                                    w-14
                                                    h-14
                                                    rounded-2xl
                                                    ${feature.iconBg}
                                                    ${feature.iconColor}
                                                    flex
                                                    items-center
                                                    justify-center
                                                    mb-5
                                                    shadow-sm
                                                `}
                                            >

                                                <Icon
                                                    size={28}
                                                />

                                            </motion.div>

                                            <span
                                                className="
                                                    text-[10px]
                                                    font-black
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-gray-500
                                                "
                                            >
                                                AI POWERED
                                            </span>

                                            <h3
                                                className="
                                                    text-lg
                                                    font-black
                                                    text-gray-800
                                                    mt-2
                                                "
                                            >
                                                {
                                                    feature.title
                                                }
                                            </h3>

                                            <p
                                                className="
                                                    text-sm
                                                    text-gray-600
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
                                                    gap-2
                                                    mt-5
                                                    text-green-700
                                                    text-sm
                                                    font-black
                                                "
                                            >

                                                Ask AI

                                                <motion.span
                                                    animate={{
                                                        x: [
                                                            0,
                                                            5,
                                                            0,
                                                        ],
                                                    }}
                                                    transition={{
                                                        duration:
                                                            1.5,
                                                        repeat:
                                                            Infinity,
                                                    }}
                                                >

                                                    <ArrowRight
                                                        size={16}
                                                    />

                                                </motion.span>

                                            </div>

                                        </div>

                                    </motion.button>

                                );

                            }
                        )}

                    </div>

                </section>

                {/* ==================================================
                    SMART FARMING INTELLIGENCE
                ================================================== */}

                <motion.section
                    initial={{
                        opacity: 0,
                        y: 40,
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
                        duration: 0.8,
                    }}
                    className="
                        relative
                        overflow-hidden
                        rounded-[2.5rem]
                        bg-gradient-to-br
                        from-white
                        via-green-50
                        to-emerald-100
                        border
                        border-white
                        shadow-[0_25px_80px_rgba(0,0,0,0.18)]
                        p-6
                        md:p-10
                        mb-10
                    "
                >

                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                        }}
                        className="
                            absolute
                            -top-32
                            -right-32
                            w-80
                            h-80
                            rounded-full
                            bg-green-300/30
                            blur-3xl
                        "
                    />

                    <motion.div
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 30, 0],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                        className="
                            absolute
                            -bottom-32
                            -left-32
                            w-80
                            h-80
                            rounded-full
                            bg-emerald-300/30
                            blur-3xl
                        "
                    />

                    <div className="relative">

                        <div className="text-center mb-8">

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-green-100
                                    border
                                    border-green-200
                                    text-green-700
                                    text-xs
                                    font-black
                                    tracking-wider
                                "
                            >

                                <Sparkles size={14} />

                                KRISHISETU INTELLIGENCE

                            </div>

                            <h2
                                className="
                                    text-3xl
                                    md:text-4xl
                                    font-black
                                    text-gray-800
                                    mt-4
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
                                    mt-3
                                    max-w-2xl
                                    mx-auto
                                "
                            >
                                Everything you need to make confident
                                farming decisions with KrishiSetu AI.
                            </p>

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

                            {/* CROP */}

                            <motion.div
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-green-200
                                    bg-gradient-to-br
                                    from-green-100
                                    via-white
                                    to-lime-50
                                    p-6
                                    shadow-md
                                    hover:shadow-xl
                                "
                            >

                                <motion.div
                                    animate={{
                                        rotate: [
                                            0,
                                            8,
                                            -8,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-green-200
                                        text-green-700
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >

                                    <Sprout size={28} />

                                </motion.div>

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-widest
                                        text-green-600
                                    "
                                >
                                    AI Insight
                                </span>

                                <h3
                                    className="
                                        text-xl
                                        font-black
                                        text-gray-800
                                        mt-2
                                    "
                                >
                                    Crop Intelligence
                                </h3>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-2
                                        leading-relaxed
                                    "
                                >
                                    Discover smarter crop choices based
                                    on your farming conditions.
                                </p>

                            </motion.div>

                            {/* WEATHER */}

                            <motion.div
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-blue-200
                                    bg-gradient-to-br
                                    from-blue-100
                                    via-white
                                    to-cyan-50
                                    p-6
                                    shadow-md
                                    hover:shadow-xl
                                "
                            >

                                <motion.div
                                    animate={{
                                        y: [
                                            0,
                                            -6,
                                            0,
                                        ],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                    }}
                                    className="
                                        w-14
                                        h-14
                                        rounded-2xl
                                        bg-blue-200
                                        text-blue-700
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >

                                    <CloudSun size={28} />

                                </motion.div>

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-widest
                                        text-blue-600
                                    "
                                >
                                    Live Guidance
                                </span>

                                <h3
                                    className="
                                        text-xl
                                        font-black
                                        text-gray-800
                                        mt-2
                                    "
                                >
                                    Weather Intelligence
                                </h3>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-2
                                        leading-relaxed
                                    "
                                >
                                    Plan irrigation, spraying and field
                                    work around changing weather.
                                </p>

                            </motion.div>

                            {/* RESOURCE */}

                            <motion.div
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-cyan-200
                                    bg-gradient-to-br
                                    from-cyan-100
                                    via-white
                                    to-teal-50
                                    p-6
                                    shadow-md
                                    hover:shadow-xl
                                "
                            >

                                <motion.div
                                    animate={{
                                        scale: [
                                            1,
                                            1.1,
                                            1,
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
                                        bg-cyan-200
                                        text-cyan-700
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >

                                    <Droplets size={28} />

                                </motion.div>

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-widest
                                        text-cyan-600
                                    "
                                >
                                    Smart Farming
                                </span>

                                <h3
                                    className="
                                        text-xl
                                        font-black
                                        text-gray-800
                                        mt-2
                                    "
                                >
                                    Resource Efficiency
                                </h3>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-2
                                        leading-relaxed
                                    "
                                >
                                    Use water and farm resources more
                                    efficiently with AI guidance.
                                </p>

                            </motion.div>

                            {/* MODERN FARMING */}

                            <motion.div
                                whileHover={{
                                    y: -10,
                                    scale: 1.03,
                                }}
                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-orange-200
                                    bg-gradient-to-br
                                    from-orange-100
                                    via-white
                                    to-amber-50
                                    p-6
                                    shadow-md
                                    hover:shadow-xl
                                "
                            >

                                <motion.div
                                    animate={{
                                        rotate: [
                                            0,
                                            -6,
                                            6,
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
                                        bg-orange-200
                                        text-orange-700
                                        flex
                                        items-center
                                        justify-center
                                        mb-5
                                    "
                                >

                                    <Tractor size={28} />

                                </motion.div>

                                <span
                                    className="
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-widest
                                        text-orange-600
                                    "
                                >
                                    Farm Support
                                </span>

                                <h3
                                    className="
                                        text-xl
                                        font-black
                                        text-gray-800
                                        mt-2
                                    "
                                >
                                    Modern Farming
                                </h3>

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-2
                                        leading-relaxed
                                    "
                                >
                                    Bring modern technology and practical
                                    farming knowledge together.
                                </p>

                            </motion.div>

                        </div>

                    </div>

                </motion.section>

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

                <AnimatePresence>

                    {!chatOpen && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 15,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                x: 15,
                                scale: 0.8,
                            }}
                            className="
                                absolute
                                right-16
                                md:right-20
                                bottom-2
                            "
                        >

                            <div
                                className="
                                    relative
                                    bg-white
                                    px-4
                                    py-2.5
                                    rounded-2xl
                                    shadow-xl
                                    border
                                    border-green-100
                                    text-green-700
                                    text-xs
                                    font-bold
                                    whitespace-nowrap
                                "
                            >
                                Ask KrishiSetu AI 🤖
                            </div>

                        </motion.div>

                    )}

                </AnimatePresence>

                {!chatOpen && (

                    <motion.div
                        animate={{
                            scale: [
                                1,
                                1.45,
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
                            bg-green-400
                        "
                    />

                )}

                <motion.button
                    type="button"
                    onClick={() =>
                        setChatOpen(
                            !chatOpen
                        )
                    }
                    whileHover={{
                        scale: 1.1,
                    }}
                    whileTap={{
                        scale: 0.9,
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
                        to-green-400
                        text-white
                        shadow-2xl
                        flex
                        items-center
                        justify-center
                        border-4
                        border-white
                    "
                >

                    <AnimatePresence mode="wait">

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

                                <X size={27} />

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
                CHAT WINDOW
            ================================================== */}

            <AnimatePresence>

                {chatOpen && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.92,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.92,
                            y: 20,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                        className="
                            fixed
                            z-[60]
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            w-[calc(100vw-24px)]
                            max-w-[420px]
                            h-[min(650px,calc(100vh-100px))]
                            min-h-[480px]
                            bg-white
                            rounded-3xl
                            shadow-[0_25px_80px_rgba(0,0,0,0.30)]
                            border
                            border-green-100
                            overflow-hidden
                            flex
                            flex-col
                        "
                    >

                        {/* ==================================================
                            HEADER
                        ================================================== */}

                        <div
                            className="
                                flex-shrink-0
                                px-4
                                py-4
                                bg-gradient-to-r
                                from-green-800
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

                                    <Leaf size={25} />

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
                                    transition
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                <X size={20} />

                            </button>

                        </div>

                        {/* ==================================================
                            MESSAGES
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
                                scrollbar-thin
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

                            {/* ==================================================
                                VOICE PROCESSING INDICATOR
                            ================================================== */}

                            {voiceProcessing && (

                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 8,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        y: 8,
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

                                    {/* ROTATING CIRCLE */}

                                    <div
                                        className="
                                            relative
                                            w-9
                                            h-9
                                            flex
                                            items-center
                                            justify-center
                                        "
                                    >

                                        <motion.div
                                            animate={{
                                                rotate: 360,
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                ease: "linear",
                                            }}
                                            className="
                                                absolute
                                                inset-0
                                                rounded-full
                                                border-[3px]
                                                border-green-100
                                                border-t-green-600
                                                border-r-green-500
                                            "
                                        />

                                        <motion.div
                                            animate={{
                                                scale: [
                                                    0.8,
                                                    1,
                                                    0.8,
                                                ],
                                                opacity: [
                                                    0.5,
                                                    1,
                                                    0.5,
                                                ],
                                            }}
                                            transition={{
                                                duration: 1.2,
                                                repeat: Infinity,
                                            }}
                                            className="
                                                w-2.5
                                                h-2.5
                                                rounded-full
                                                bg-green-600
                                            "
                                        />

                                    </div>

                                    <div>

                                        <p
                                            className="
                                                text-xs
                                                font-semibold
                                                text-gray-700
                                            "
                                        >
                                            Voice message processing
                                        </p>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                mt-1
                                            "
                                        >

                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        0.3,
                                                        1,
                                                        0.3,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                }}
                                                className="
                                                    text-[11px]
                                                    text-green-600
                                                "
                                            >
                                                Listening
                                            </motion.span>

                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        0.2,
                                                        1,
                                                        0.2,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: 0.2,
                                                }}
                                                className="
                                                    text-green-600
                                                "
                                            >
                                                •
                                            </motion.span>

                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        0.2,
                                                        1,
                                                        0.2,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: 0.4,
                                                }}
                                                className="
                                                    text-green-600
                                                "
                                            >
                                                •
                                            </motion.span>

                                            <motion.span
                                                animate={{
                                                    opacity: [
                                                        0.2,
                                                        1,
                                                        0.2,
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: 0.6,
                                                }}
                                                className="
                                                    text-green-600
                                                "
                                            >
                                                •
                                            </motion.span>

                                        </div>

                                    </div>

                                </motion.div>

                            )}

                            {/* ==================================================
                                AI TYPING INDICATOR
                            ================================================== */}

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
                            INPUT
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
                                onVoiceProcessing={
                                    handleVoiceProcessing
                                }
                                disabled={
                                    loading ||
                                    voiceProcessing
                                }
                            />

                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>
    );
}

export default ChatLayout;