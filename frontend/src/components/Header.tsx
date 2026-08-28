import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
Menu,
X,
User,
Globe,
Sparkles,
ChevronRight,
Sprout,
Activity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
const [menuOpen, setMenuOpen] = useState(false);
const location = useLocation();

const navItems = [
    {
        name: "Home",
        path: "/",
    },
    {
        name: "Disease Detection",
        path: "/disease",
    },
    {
        name: "Profile",
        path: "/profile",
    },
];

return (
    <header className="sticky top-0 z-50 w-full">
        {/* Premium floating navbar */}
        <div className="px-3 pt-3 md:px-6">
            <div
                className="
                    mx-auto
                    max-w-7xl
                    rounded-2xl
                    border
                    border-white/60
                    bg-white/80
                    shadow-[0_10px_40px_rgba(16,185,129,0.12)]
                    backdrop-blur-xl
                "
            >
                <div
                    className="
                        flex
                        h-[68px]
                        items-center
                        justify-between
                        px-4
                        md:px-6
                    "
                >
                    {/* ================================
                        LOGO
                    ================================= */}
                    <Link
                        to="/"
                        className="
                            group
                            relative
                            flex
                            items-center
                            gap-3
                        "
                    >
                        {/* Animated logo */}
                        <div className="relative">
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
                                    relative
                                    z-10
                                    flex
                                    h-11
                                    w-11
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-green-700
                                    via-emerald-600
                                    to-lime-500
                                    text-white
                                    shadow-lg
                                    shadow-green-500/30
                                "
                            >
                                <Sprout size={23} />
                            </motion.div>

                            {/* Glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.25, 1],
                                    opacity: [0.25, 0.05, 0.25],
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                }}
                                className="
                                    absolute
                                    inset-0
                                    rounded-2xl
                                    bg-green-400
                                    blur-xl
                                "
                            />
                        </div>

                        {/* Brand */}
                        <div className="leading-none">
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                "
                            >
                                <h1
                                    className="
                                        text-lg
                                        font-black
                                        tracking-tight
                                        text-gray-900
                                        md:text-xl
                                    "
                                >
                                    KrishiSetu
                                </h1>

                                <span
                                    className="
                                        rounded-md
                                        bg-gradient-to-r
                                        from-green-600
                                        to-emerald-500
                                        px-1.5
                                        py-0.5
                                        text-[9px]
                                        font-black
                                        tracking-wider
                                        text-white
                                    "
                                >
                                    AI
                                </span>
                            </div>

                            <p
                                className="
                                    mt-1
                                    hidden
                                    text-[10px]
                                    font-semibold
                                    tracking-wide
                                    text-gray-400
                                    sm:block
                                "
                            >
                                SMART FARMING PLATFORM
                            </p>
                        </div>
                    </Link>

                    {/* ================================
                        DESKTOP NAVIGATION
                    ================================= */}
                    <nav
                        className="
                            hidden
                            items-center
                            gap-1
                            rounded-2xl
                            bg-gray-100/70
                            p-1.5
                            lg:flex
                        "
                    >
                        {navItems.map((item) => {
                            const isActive =
                                location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        relative
                                        rounded-xl
                                        px-4
                                        py-2
                                        text-sm
                                        font-semibold
                                        transition-all
                                        duration-300

                                        ${
                                            isActive
                                                ? "bg-white text-green-700 shadow-sm"
                                                : "text-gray-500 hover:text-green-700"
                                        }
                                    `}
                                >
                                    {item.name}

                                    {isActive && (
                                        <motion.span
                                            layoutId="activeNav"
                                            className="
                                                absolute
                                                bottom-0
                                                left-1/2
                                                h-1
                                                w-1
                                                -translate-x-1/2
                                                rounded-full
                                                bg-green-500
                                            "
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ================================
                        RIGHT SIDE
                    ================================= */}
                    <div
                        className="
                            flex
                            items-center
                            gap-2
                            md:gap-3
                        "
                    >
                        {/* AI Status */}
                        <div
                            className="
                                hidden
                                items-center
                                gap-2
                                rounded-xl
                                border
                                border-green-100
                                bg-green-50
                                px-3
                                py-2
                                xl:flex
                            "
                        >
                            <div className="relative">
                                <motion.span
                                    animate={{
                                        scale: [1, 1.8, 1],
                                        opacity: [0.8, 0, 0.8],
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

                                <span
                                    className="
                                        relative
                                        block
                                        h-2
                                        w-2
                                        rounded-full
                                        bg-green-500
                                    "
                                />
                            </div>

                            <span
                                className="
                                    text-xs
                                    font-bold
                                    text-green-700
                                "
                            >
                                AI Online
                            </span>
                        </div>

                        {/* Language */}
                        <button
                            className="
                                hidden
                                items-center
                                gap-2
                                rounded-xl
                                px-3
                                py-2
                                text-sm
                                font-semibold
                                text-gray-600
                                transition
                                hover:bg-green-50
                                hover:text-green-700
                                sm:flex
                            "
                        >
                            <Globe size={18} />
                            <span>मराठी</span>
                        </button>

                        {/* Profile */}
                        <Link
                            to="/profile"
                            className="
                                group
                                hidden
                                items-center
                                gap-2
                                rounded-xl
                                bg-gradient-to-r
                                from-green-700
                                to-emerald-600
                                px-4
                                py-2.5
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-green-500/20
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:shadow-xl
                                md:flex
                            "
                        >
                            <User size={17} />

                            <span>My Profile</span>

                            <ChevronRight
                                size={15}
                                className="
                                    transition-transform
                                    group-hover:translate-x-1
                                "
                            />
                        </Link>

                        {/* Mobile menu */}
                        <button
                            onClick={() =>
                                setMenuOpen(!menuOpen)
                            }
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-gray-100
                                bg-gray-50
                                text-gray-700
                                transition
                                hover:bg-green-50
                                hover:text-green-700
                                lg:hidden
                            "
                        >
                            <AnimatePresence mode="wait">
                                {menuOpen ? (
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
                                        <X size={21} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{
                                            rotate: 90,
                                            opacity: 0,
                                        }}
                                        animate={{
                                            rotate: 0,
                                            opacity: 1,
                                        }}
                                        exit={{
                                            rotate: -90,
                                            opacity: 0,
                                        }}
                                    >
                                        <Menu size={21} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* ================================
                    MOBILE MENU
                ================================= */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                            className="
                                overflow-hidden
                                border-t
                                border-gray-100
                                lg:hidden
                            "
                        >
                            <div className="p-3">
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-1
                                    "
                                >
                                    {navItems.map(
                                        (item, index) => {
                                            const isActive =
                                                location.pathname ===
                                                item.path;

                                            return (
                                                <motion.div
                                                    key={
                                                        item.path
                                                    }
                                                    initial={{
                                                        opacity: 0,
                                                        x: -15,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay:
                                                            index *
                                                            0.07,
                                                    }}
                                                >
                                                    <Link
                                                        to={
                                                            item.path
                                                        }
                                                        onClick={() =>
                                                            setMenuOpen(
                                                                false
                                                            )
                                                        }
                                                        className={`
                                                            flex
                                                            items-center
                                                            justify-between
                                                            rounded-xl
                                                            px-4
                                                            py-3.5
                                                            text-sm
                                                            font-bold
                                                            transition

                                                            ${
                                                                isActive
                                                                    ? "bg-gradient-to-r from-green-700 to-emerald-600 text-white shadow-lg"
                                                                    : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                                            }
                                                        `}
                                                    >
                                                        <span>
                                                            {
                                                                item.name
                                                            }
                                                        </span>

                                                        <ChevronRight
                                                            size={
                                                                17
                                                            }
                                                        />
                                                    </Link>
                                                </motion.div>
                                            );
                                        }
                                    )}

                                    {/* Mobile language */}
                                    <button
                                        className="
                                            mt-2
                                            flex
                                            items-center
                                            gap-3
                                            rounded-xl
                                            bg-gray-50
                                            px-4
                                            py-3.5
                                            text-left
                                            text-sm
                                            font-bold
                                            text-gray-600
                                        "
                                    >
                                        <Globe
                                            size={18}
                                            className="text-green-600"
                                        />

                                        Language: Marathi
                                    </button>

                                    {/* Mobile profile */}
                                    <Link
                                        to="/profile"
                                        onClick={() =>
                                            setMenuOpen(false)
                                        }
                                        className="
                                            mt-2
                                            flex
                                            items-center
                                            justify-center
                                            gap-2
                                            rounded-xl
                                            bg-gradient-to-r
                                            from-green-700
                                            to-emerald-600
                                            px-4
                                            py-3.5
                                            text-sm
                                            font-black
                                            text-white
                                            shadow-lg
                                        "
                                    >
                                        <User size={18} />

                                        My Profile

                                        <ChevronRight size={17} />
                                    </Link>
                                </div>

                                {/* AI footer */}
                                <div
                                    className="
                                        mt-4
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        border-t
                                        border-gray-100
                                        pt-4
                                        text-xs
                                        text-gray-400
                                    "
                                >
                                    <Activity
                                        size={14}
                                        className="text-green-500"
                                    />

                                    <span>
                                        KrishiSetu AI is ready to help
                                    </span>

                                    <Sparkles
                                        size={13}
                                        className="text-amber-400"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </header>
);

}

export default Header;
