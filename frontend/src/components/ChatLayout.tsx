import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

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
    Wheat,
    Bot,
    Zap,
    UserRound,
    Brain,
} from "lucide-react";

import {
    motion,
    AnimatePresence,
    useReducedMotion,
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

type FeatureAction = "chat" | "navigate";

interface Feature {
    title: string;
    description: string;
    action: FeatureAction;
    path?: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    border: string;
    gradient: string;
}

// ======================================================
// FEATURES
// ======================================================

const FEATURES: Feature[] = [
    {
        title: "Crop Recommendation",
        description:
            "Find suitable crops based on season, soil and farming conditions.",

        action: "chat",

        icon: Sprout,
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        border: "border-emerald-200",
        gradient:
            "from-emerald-50 via-white to-green-50",
    },

    {
        title: "Disease Detection",
        description:
            "Identify crop diseases and get practical prevention guidance.",

        action: "navigate",
        path: "/disease",

        icon: Bug,
        iconBg: "bg-red-100",
        iconColor: "text-red-500",
        border: "border-red-200",
        gradient:
            "from-red-50 via-white to-orange-50",
    },

    {
        title: "Weather Guidance",
        description:
            "Plan irrigation, spraying and farm activities with weather insights.",

        action: "navigate",
        path: "/weather",

        icon: CloudSun,
        iconBg: "bg-blue-100",
        iconColor: "text-blue-500",
        border: "border-blue-200",
        gradient:
            "from-blue-50 via-white to-cyan-50",
    },

    {
        title: "Market Prices",
        description:
            "Check current crop market prices and make better selling decisions.",

        action: "navigate",
        path: "/market-price",

        icon: Wheat,
        iconBg: "bg-yellow-100",
        iconColor: "text-yellow-600",
        border: "border-yellow-200",
        gradient:
            "from-yellow-50 via-white to-orange-50",
    },
];

// ======================================================
// COMPONENT
// ======================================================

function ChatLayout() {
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();

    // ==================================================
    // STATE
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

    const [voiceProcessing, setVoiceProcessing] =
        useState(false);

    // ==================================================
    // REFS
    // ==================================================

    const chatEndRef =
        useRef<HTMLDivElement | null>(null);

    const historyLoadedRef =
        useRef(false);

    // ==================================================
    // LOAD CHAT HISTORY
    // ==================================================

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || historyLoadedRef.current) {
            return;
        }

        historyLoadedRef.current = true;

        const loadHistory = async () => {
            try {
                const data = await getChatHistory();

                if (!Array.isArray(data)) {
                    return;
                }

                const history: Message[] = data
                    .slice()
                    .reverse()
                    .flatMap((chat: any) => {
                        const result: Message[] = [];

                        if (
                            typeof chat.message === "string" &&
                            chat.message.trim()
                        ) {
                            result.push({
                                role: "user",
                                text: chat.message.trim(),
                            });
                        }

                        if (
                            typeof chat.response === "string" &&
                            chat.response.trim()
                        ) {
                            result.push({
                                role: "ai",
                                text: chat.response.trim(),
                            });
                        }

                        return result;
                    });

                if (history.length > 0) {
                    setMessages((prev) => [
                        ...prev,
                        ...history,
                    ]);
                }
            } catch (error: any) {
                console.error(
                    "CHAT HISTORY ERROR:",
                    error?.response?.status,
                    error?.response?.data ||
                        error?.message ||
                        error
                );

                if (
                    error?.response?.status === 401
                ) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                }
            }
        };

        loadHistory();
    }, []);

    // ==================================================
    // ESCAPE KEY
    // ==================================================

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (
                event.key === "Escape" &&
                chatOpen
            ) {
                setChatOpen(false);
            }
        };

        window.addEventListener(
            "keydown",
            handleEscape
        );

        return () => {
            window.removeEventListener(
                "keydown",
                handleEscape
            );
        };
    }, [chatOpen]);

    // ==================================================
    // AUTO SCROLL
    // ==================================================

    useEffect(() => {
        if (!chatOpen) {
            return;
        }

        requestAnimationFrame(() => {
            chatEndRef.current?.scrollIntoView({
                behavior: "auto",
                block: "end",
            });
        });
    }, [
        messages.length,
        loading,
        voiceProcessing,
        chatOpen,
    ]);

    // ==================================================
    // OPEN CHAT
    // ==================================================

    const openChat = useCallback(() => {
        const token =
            localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        setChatOpen(true);
    }, [navigate]);

    // ==================================================
    // FEATURE CLICK
    // ==================================================

    const handleFeatureClick = useCallback(
        (feature: Feature) => {
            // -------------------------------
            // CHAT FEATURE
            // -------------------------------

            if (feature.action === "chat") {
                openChat();
                return;
            }

            // -------------------------------
            // NAVIGATION FEATURE
            // -------------------------------

            if (
                feature.action === "navigate" &&
                feature.path
            ) {
                navigate(feature.path);
            }
        },
        [navigate, openChat]
    );

    // ==================================================
    // SEND MESSAGE
    // ==================================================

    const handleSend = useCallback(
        async (
            message: string,
            language: Language
        ) => {
            const trimmedMessage =
                message.trim();

            // Empty message
            if (!trimmedMessage) {
                setVoiceProcessing(false);
                return;
            }

            // ------------------------------------------
            // AUTH CHECK
            // ------------------------------------------

            const token =
                localStorage.getItem("token");

            if (!token) {
                setVoiceProcessing(false);
                navigate("/login");
                return;
            }

            // ------------------------------------------
            // USER MESSAGE
            // ------------------------------------------

            setMessages((prev) => [
                ...prev,
                {
                    role: "user",
                    text: trimmedMessage,
                },
            ]);

            setLoading(true);

            try {
                // --------------------------------------
                // API CALL
                // --------------------------------------

                const data = await sendMessage(
                    trimmedMessage,
                    language
                );

                // --------------------------------------
                // VALIDATE RESPONSE
                // --------------------------------------

                if (
                    !data ||
                    typeof data.response !==
                        "string" ||
                    !data.response.trim()
                ) {
                    setMessages((prev) => [
                        ...prev,
                        {
                            role: "ai",
                            text:
                                "❌ AI ne valid response nahi diya. Please try again.",
                        },
                    ]);

                    return;
                }

                // --------------------------------------
                // AI RESPONSE
                // --------------------------------------

                setMessages((prev) => [
                    ...prev,
                    {
                        role: "ai",
                        text: data.response.trim(),
                    },
                ]);
            } catch (error: any) {
                console.error(
                    "CHAT API ERROR:",
                    error?.response?.status,
                    error?.response?.data ||
                        error?.message ||
                        error
                );

                let errorMessage =
                    "❌ Server response nahi aaya. Please try again.";

                // --------------------------------------
                // 401
                // --------------------------------------

                if (
                    error?.response?.status === 401
                ) {
                    errorMessage =
                        "❌ Session expired. Please login again.";

                    localStorage.removeItem("token");
                    localStorage.removeItem("user");

                    setMessages((prev) => [
                        ...prev,
                        {
                            role: "ai",
                            text: errorMessage,
                        },
                    ]);

                    setTimeout(() => {
                        navigate("/login");
                    }, 800);

                    return;
                }

                // --------------------------------------
                // 404
                // --------------------------------------

                if (
                    error?.response?.status === 404
                ) {
                    errorMessage =
                        "❌ Chat service not found. Please try again.";
                }

                // --------------------------------------
                // 500
                // --------------------------------------

                else if (
                    error?.response?.status === 500
                ) {
                    errorMessage =
                        "❌ Backend server error. Please try again.";
                }

                // --------------------------------------
                // NETWORK ERROR
                // --------------------------------------

                else if (
                    error?.message === "Network Error"
                ) {
                    errorMessage =
                        "❌ Backend se connection nahi ho raha.";
                }

                // --------------------------------------
                // GENERAL ERROR
                // --------------------------------------

                setMessages((prev) => [
                    ...prev,
                    {
                        role: "ai",
                        text: errorMessage,
                    },
                ]);
            } finally {
                setLoading(false);
                setVoiceProcessing(false);
            }
        },
        [navigate]
    );

    // ==================================================
    // VOICE PROCESSING
    // ==================================================

    const handleVoiceProcessing =
        useCallback((processing: boolean) => {
            setVoiceProcessing(processing);
        }, []);

    // ==================================================
    // CHAT ANIMATION
    // ==================================================

    const chatAnimation = reduceMotion
        ? {}
        : {
              initial: {
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
              },

              animate: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
              },

              exit: {
                  opacity: 0,
                  y: 12,
                  scale: 0.98,
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
                BACKGROUND GLOW
            ================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    overflow-hidden
                "
            >
                <div
                    className="
                        absolute
                        -top-40
                        -left-40
                        w-96
                        h-96
                        rounded-full
                        bg-green-400/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        top-1/4
                        -right-40
                        w-96
                        h-96
                        rounded-full
                        bg-emerald-400/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        w-[500px]
                        h-[300px]
                        rounded-full
                        bg-lime-400/5
                        blur-3xl
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
                    opacity-[0.06]
                    bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)]
                    bg-[size:30px_30px]
                "
            />

            {/* ==================================================
                MAIN CONTENT
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

                <section
                    className="
                        text-center
                        max-w-5xl
                        mx-auto
                        mb-14
                    "
                >
                    {/* LOGO */}

                    <motion.div
                        initial={
                            reduceMotion
                                ? false
                                : {
                                      opacity: 0,
                                      scale: 0.8,
                                  }
                        }
                        animate={
                            reduceMotion
                                ? {}
                                : {
                                      opacity: 1,
                                      scale: 1,
                                  }
                        }
                        transition={{
                            duration: 0.6,
                        }}
                        className="
                            relative
                            mx-auto
                            w-28
                            h-28
                            md:w-36
                            md:h-36
                            mb-8
                            flex
                            items-center
                            justify-center
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-[-10px]
                                rounded-full
                                border
                                border-dashed
                                border-green-300/25
                            "
                        />

                        <motion.div
                            animate={
                                reduceMotion
                                    ? {}
                                    : {
                                          rotate: [
                                              0,
                                              3,
                                              -3,
                                              0,
                                          ],
                                      }
                            }
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="
                                relative
                                z-10
                                w-24
                                h-24
                                md:w-28
                                md:h-28
                                rounded-[2rem]
                                bg-gradient-to-br
                                from-green-900
                                via-emerald-600
                                to-green-400
                                shadow-xl
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
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-white
                                    shadow-lg
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <Sprout
                                    size={34}
                                    className="text-green-700"
                                />
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* TITLE */}

                    <motion.h1
                        initial={
                            reduceMotion
                                ? false
                                : {
                                      opacity: 0,
                                      y: 20,
                                  }
                        }
                        animate={
                            reduceMotion
                                ? {}
                                : {
                                      opacity: 1,
                                      y: 0,
                                  }
                        }
                        transition={{
                            duration: 0.6,
                            delay: 0.1,
                        }}
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
                    </motion.h1>

                    <motion.p
                        initial={
                            reduceMotion
                                ? false
                                : {
                                      opacity: 0,
                                      y: 15,
                                  }
                        }
                        animate={
                            reduceMotion
                                ? {}
                                : {
                                      opacity: 1,
                                      y: 0,
                                  }
                        }
                        transition={{
                            duration: 0.6,
                            delay: 0.2,
                        }}
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
                        Your intelligent digital farming
                        companion. Get assistance with
                        crops, diseases, weather, mandi
                        prices and government schemes —
                        all in one powerful platform.
                    </motion.p>

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
                                icon: ShieldCheck,
                                text: "Farmer First",
                            },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.text}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        px-4
                                        py-2
                                        rounded-full
                                        bg-white/10
                                        border
                                        border-white/10
                                        text-green-50
                                        text-xs
                                        font-semibold
                                        backdrop-blur-sm
                                    "
                                >
                                    <Icon size={15} />
                                    {item.text}
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ==================================================
                    FARMER + AI
                ================================================== */}

                <section
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
                        whileHover={
                            reduceMotion
                                ? {}
                                : {
                                      y: -5,
                                  }
                        }
                        transition={{
                            duration: 0.2,
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
                            shadow-xl
                            border
                            border-white/10
                        "
                    >
                        <div
                            className="
                                absolute
                                -right-20
                                -top-20
                                w-64
                                h-64
                                rounded-full
                                bg-lime-300/10
                                blur-3xl
                                pointer-events-none
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
                            <div
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
                                    shadow-xl
                                    overflow-hidden
                                "
                            >
                                <img
                                    src={farmerImage}
                                    alt="Indian Farmer"
                                    loading="lazy"
                                    decoding="async"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />
                            </div>

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
                                    KrishiSetu AI helps
                                    farmers make smarter
                                    decisions using
                                    artificial intelligence,
                                    agricultural knowledge
                                    and real-time information.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* AI CARD */}

                    <motion.div
                        whileHover={
                            reduceMotion
                                ? {}
                                : {
                                      y: -5,
                                  }
                        }
                        transition={{
                            duration: 0.2,
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
                                mb-6
                            "
                        >
                            <div
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
                            </div>

                            <div>
                                <h2
                                    className="
                                        text-2xl
                                        font-black
                                        text-gray-800
                                    "
                                >
                                    What can KrishiSetu
                                    AI do?
                                </h2>

                                <p className="text-sm text-gray-500">
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
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="
                                            rounded-2xl
                                            bg-white/70
                                            border
                                            border-white
                                            p-4
                                            shadow-sm
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
                                                className={item.color}
                                            />
                                        </div>

                                        <p
                                            className="
                                                font-bold
                                                text-gray-800
                                                text-sm
                                            "
                                        >
                                            {item.title}
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-gray-500
                                                mt-1
                                            "
                                        >
                                            {item.text}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </section>

                {/* ==================================================
                    HOW IT WORKS
                ================================================== */}

                <section className="mb-14">
                    <div className="text-center mb-9">
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
                                border-white/10
                                text-lime-200
                                text-xs
                                font-black
                                tracking-widest
                            "
                        >
                            <Sparkles size={14} />
                            HOW IT WORKS
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
                            Simple. Smart. Powerful.
                        </h2>

                        <p
                            className="
                                text-green-100/70
                                text-sm
                                mt-2
                                max-w-xl
                                mx-auto
                            "
                        >
                            Get intelligent farming guidance
                            in just two simple steps.
                        </p>
                    </div>

                    <div
                        className="
                            relative
                            grid
                            grid-cols-1
                            lg:grid-cols-2
                            gap-6
                            items-stretch
                        "
                    >
                        {/* CARD 1 */}

                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                          opacity: 0,
                                          x: -50,
                                      }
                            }
                            whileInView={
                                reduceMotion
                                    ? {}
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            viewport={{
                                once: true,
                                amount: 0.25,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            whileHover={
                                reduceMotion
                                    ? {}
                                    : {
                                          y: -8,
                                      }
                            }
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-[2rem]
                                bg-gradient-to-br
                                from-white
                                via-green-50
                                to-emerald-100
                                border
                                border-white/80
                                shadow-2xl
                                p-7
                                md:p-9
                            "
                        >
                            <div
                                className="
                                    absolute
                                    -right-16
                                    -top-16
                                    w-48
                                    h-48
                                    rounded-full
                                    bg-green-300/20
                                    blur-3xl
                                    transition-transform
                                    duration-500
                                    group-hover:scale-150
                                "
                            />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between">
                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-gradient-to-br
                                            from-green-500
                                            to-emerald-700
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            shadow-lg
                                        "
                                    >
                                        <UserRound size={30} />
                                    </div>

                                    <span
                                        className="
                                            text-5xl
                                            font-black
                                            text-green-100
                                        "
                                    >
                                        01
                                    </span>
                                </div>

                                <span
                                    className="
                                        inline-block
                                        mt-7
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.2em]
                                        text-green-600
                                    "
                                >
                                    Step One
                                </span>

                                <h3
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-black
                                        text-gray-800
                                        mt-2
                                    "
                                >
                                    Tell Us About

                                    <br />

                                    <span className="text-green-600">
                                        Your Farm
                                    </span>
                                </h3>

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        md:text-base
                                        leading-7
                                        text-gray-600
                                        max-w-lg
                                    "
                                >
                                    Ask KrishiSetu AI about
                                    your crop, soil, weather,
                                    disease, mandi prices or
                                    government schemes.
                                </p>

                                <div
                                    className="
                                        mt-6
                                        flex
                                        flex-wrap
                                        gap-2
                                    "
                                >
                                    {[
                                        "Crop",
                                        "Soil",
                                        "Weather",
                                        "Disease",
                                    ].map((item) => (
                                        <span
                                            key={item}
                                            className="
                                                px-3
                                                py-1.5
                                                rounded-full
                                                bg-green-100
                                                text-green-700
                                                text-xs
                                                font-bold
                                            "
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                <div
                                    className="
                                        mt-7
                                        flex
                                        items-center
                                        gap-2
                                        text-green-700
                                        font-black
                                        text-sm
                                    "
                                >
                                    <MessageCircle size={18} />
                                    Ask your question
                                </div>
                            </div>
                        </motion.div>

                        {/* DESKTOP CONNECTOR */}

                        <div
                            className="
                                hidden
                                lg:flex
                                absolute
                                left-1/2
                                top-1/2
                                -translate-x-1/2
                                -translate-y-1/2
                                z-20
                                items-center
                                justify-center
                            "
                        >
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              x: [
                                                  0,
                                                  8,
                                                  0,
                                              ],
                                          }
                                }
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    w-14
                                    h-14
                                    rounded-full
                                    bg-white
                                    border-4
                                    border-green-100
                                    shadow-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-green-600
                                "
                            >
                                <ArrowRight size={25} />
                            </motion.div>
                        </div>

                        {/* MOBILE CONNECTOR */}

                        <div
                            className="
                                flex
                                lg:hidden
                                justify-center
                                -my-2
                                relative
                                z-20
                            "
                        >
                            <motion.div
                                animate={
                                    reduceMotion
                                        ? {}
                                        : {
                                              y: [
                                                  0,
                                                  6,
                                                  0,
                                              ],
                                          }
                                }
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="
                                    w-12
                                    h-12
                                    rounded-full
                                    bg-white
                                    border-4
                                    border-green-100
                                    shadow-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-green-600
                                "
                            >
                                <ArrowRight
                                    size={23}
                                    className="rotate-90"
                                />
                            </motion.div>
                        </div>

                        {/* CARD 2 */}

                        <motion.div
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                          opacity: 0,
                                          x: 50,
                                      }
                            }
                            whileInView={
                                reduceMotion
                                    ? {}
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            viewport={{
                                once: true,
                                amount: 0.25,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.15,
                            }}
                            whileHover={
                                reduceMotion
                                    ? {}
                                    : {
                                          y: -8,
                                      }
                            }
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-[2rem]
                                bg-gradient-to-br
                                from-emerald-950
                                via-green-800
                                to-emerald-500
                                border
                                border-white/10
                                shadow-2xl
                                p-7
                                md:p-9
                                text-white
                            "
                        >
                            <div
                                className="
                                    absolute
                                    -right-16
                                    -top-16
                                    w-56
                                    h-56
                                    rounded-full
                                    bg-lime-300/10
                                    blur-3xl
                                    transition-transform
                                    duration-500
                                    group-hover:scale-150
                                "
                            />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between">
                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-2xl
                                            bg-white/15
                                            border
                                            border-white/20
                                            text-lime-200
                                            flex
                                            items-center
                                            justify-center
                                            shadow-lg
                                        "
                                    >
                                        <Brain size={30} />
                                    </div>

                                    <span
                                        className="
                                            text-5xl
                                            font-black
                                            text-white/10
                                        "
                                    >
                                        02
                                    </span>
                                </div>

                                <span
                                    className="
                                        inline-block
                                        mt-7
                                        text-[10px]
                                        font-black
                                        uppercase
                                        tracking-[0.2em]
                                        text-lime-300
                                    "
                                >
                                    Step Two
                                </span>

                                <h3
                                    className="
                                        text-2xl
                                        md:text-3xl
                                        font-black
                                        mt-2
                                    "
                                >
                                    Get Smart

                                    <br />

                                    <span className="text-lime-300">
                                        AI Insights
                                    </span>
                                </h3>

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        md:text-base
                                        leading-7
                                        text-green-50/75
                                        max-w-lg
                                    "
                                >
                                    KrishiSetu AI analyzes
                                    your question and provides
                                    practical, easy-to-understand
                                    farming guidance.
                                </p>

                                <div
                                    className="
                                        mt-6
                                        grid
                                        grid-cols-2
                                        gap-3
                                    "
                                >
                                    {[
                                        {
                                            icon: Sprout,
                                            text: "Crop Advice",
                                        },
                                        {
                                            icon: Bug,
                                            text: "Disease Help",
                                        },
                                        {
                                            icon: CloudSun,
                                            text: "Weather",
                                        },
                                        {
                                            icon: ShieldCheck,
                                            text: "Schemes",
                                        },
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.text}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    rounded-xl
                                                    bg-white/10
                                                    border
                                                    border-white/10
                                                    px-3
                                                    py-2.5
                                                    text-xs
                                                    font-semibold
                                                "
                                            >
                                                <Icon
                                                    size={16}
                                                    className="text-lime-300"
                                                />

                                                {item.text}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div
                                    className="
                                        mt-7
                                        flex
                                        items-center
                                        gap-2
                                        text-lime-300
                                        font-black
                                        text-sm
                                    "
                                >
                                    <Sparkles size={18} />
                                    Make better decisions
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ==================================================
                    FEATURES
                ================================================== */}

                <section className="mb-14">
                    <div className="text-center mb-8">
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
                                border-white/10
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
                        {FEATURES.map(
                            (feature, index) => {
                                const Icon =
                                    feature.icon;

                                return (
                                    <motion.button
                                        key={
                                            feature.title
                                        }
                                        type="button"
                                        onClick={() =>
                                            handleFeatureClick(
                                                feature
                                            )
                                        }
                                        initial={
                                            reduceMotion
                                                ? false
                                                : {
                                                      opacity: 0,
                                                      y: 25,
                                                  }
                                        }
                                        whileInView={
                                            reduceMotion
                                                ? {}
                                                : {
                                                      opacity: 1,
                                                      y: 0,
                                                  }
                                        }
                                        viewport={{
                                            once: true,
                                            amount: 0.15,
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            delay:
                                                index *
                                                0.08,
                                        }}
                                        whileHover={
                                            reduceMotion
                                                ? {}
                                                : {
                                                      y: -6,
                                                  }
                                        }
                                        whileTap={
                                            reduceMotion
                                                ? {}
                                                : {
                                                      scale: 0.98,
                                                  }
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
                                            shadow-lg
                                            transition-shadow
                                            duration-200
                                            hover:shadow-2xl
                                            cursor-pointer
                                            w-full
                                        `}
                                        aria-label={`Open ${feature.title}`}
                                    >
                                        <div className="relative z-10">
                                            <div
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
                                                    transition-transform
                                                    duration-300
                                                    group-hover:scale-110
                                                `}
                                            >
                                                <Icon size={28} />
                                            </div>

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
                                                {feature.action ===
                                                "chat"
                                                    ? "Ask AI"
                                                    : "Open Tool"}

                                                <ArrowRight
                                                    size={16}
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover:translate-x-1
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </motion.button>
                                );
                            }
                        )}
                    </div>
                </section>
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
                            initial={
                                reduceMotion
                                    ? false
                                    : {
                                          opacity: 0,
                                          x: 8,
                                      }
                            }
                            animate={
                                reduceMotion
                                    ? {}
                                    : {
                                          opacity: 1,
                                          x: 0,
                                      }
                            }
                            exit={
                                reduceMotion
                                    ? {}
                                    : {
                                          opacity: 0,
                                          x: 8,
                                      }
                            }
                            className="
                                absolute
                                right-16
                                md:right-20
                                bottom-2
                                bg-white
                                px-4
                                py-2.5
                                rounded-2xl
                                shadow-lg
                                border
                                border-green-100
                                text-green-700
                                text-xs
                                font-bold
                                whitespace-nowrap
                            "
                        >
                            Ask KrishiSetu AI 🤖
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    type="button"
                    onClick={() => {
                        if (chatOpen) {
                            setChatOpen(false);
                        } else {
                            openChat();
                        }
                    }}
                    whileHover={
                        reduceMotion
                            ? {}
                            : {
                                  scale: 1.05,
                              }
                    }
                    whileTap={
                        reduceMotion
                            ? {}
                            : {
                                  scale: 0.95,
                              }
                    }
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
                        shadow-xl
                        flex
                        items-center
                        justify-center
                        border-4
                        border-white
                    "
                    aria-label={
                        chatOpen
                            ? "Close chat"
                            : "Open chat"
                    }
                    aria-expanded={chatOpen}
                >
                    {chatOpen ? (
                        <X size={27} />
                    ) : (
                        <MessageCircle size={27} />
                    )}
                </motion.button>
            </div>

            {/* ==================================================
                CHAT WINDOW
            ================================================== */}

            <AnimatePresence>
                {chatOpen && (
                    <motion.div
                        {...chatAnimation}
                        transition={{
                            duration: reduceMotion
                                ? 0
                                : 0.18,
                            ease: "easeOut",
                        }}
                        className="
                            fixed
                            z-[60]
                            top-1/2
                            left-1/2
                            -translate-x-1/2
                            -translate-y-1/2
                            w-[calc(100vw-20px)]
                            max-w-[420px]
                            h-[min(650px,calc(100vh-80px))]
                            min-h-[440px]
                            bg-white
                            rounded-3xl
                            shadow-2xl
                            border
                            border-green-100
                            overflow-hidden
                            flex
                            flex-col
                        "
                        role="dialog"
                        aria-modal="true"
                        aria-label="KrishiSetu AI Chat"
                    >
                        {/* HEADER */}

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
                                <div
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
                                </div>

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
                                    transition-colors
                                "
                                aria-label="Close chat"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* MESSAGES */}

                        <div
                            className="
                                flex-1
                                min-h-0
                                overflow-y-auto
                                overscroll-contain
                                p-3
                                md:p-4
                                space-y-3
                                bg-gradient-to-b
                                from-gray-50
                                to-green-50/40
                            "
                        >
                            {messages.map(
                                (msg, index) => (
                                    <div
                                        key={`${msg.role}-${index}`}
                                    >
                                        <MessageBubble
                                            role={msg.role}
                                            text={msg.text}
                                        />
                                    </div>
                                )
                            )}

                            {/* VOICE PROCESSING */}

                            {voiceProcessing && (
                                <div
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
                                            w-9
                                            h-9
                                            flex
                                            items-center
                                            justify-center
                                            rounded-full
                                            border-[3px]
                                            border-green-100
                                            border-t-green-600
                                            animate-spin
                                        "
                                    >
                                        <div
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

                                        <p
                                            className="
                                                text-[11px]
                                                text-green-600
                                                mt-1
                                            "
                                        >
                                            Listening...
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* AI THINKING */}

                            {loading && (
                                <div
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
                                            className="text-green-600"
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
                                </div>
                            )}

                            <div ref={chatEndRef} />
                        </div>

                        {/* INPUT */}

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
