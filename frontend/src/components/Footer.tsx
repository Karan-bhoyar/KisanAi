import {
    Leaf,
    Sprout,
    ShieldCheck,
    MessageCircle,
    ArrowUp,
    Mail,
    ArrowRight,
} from "lucide-react";

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const features = [
        "Crop Recommendation",
        "Disease Detection",
        "Weather Guidance",
        "Market Prices",
        "Government Schemes",
    ];

    const products = [
        "Smart Farming",
        "AI Chat Assistant",
        "Voice Assistant",
        "Multilingual Support",
        "Farmer Support",
    ];

    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-green-950 via-green-900 to-emerald-900 text-white">

            {/* BACKGROUND DECORATION */}

            <div className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div className="relative mx-auto max-w-7xl px-5 md:px-8">

                {/* =================================================
                    TOP SECTION
                ================================================= */}

                <div
                    className="
                        grid
                        grid-cols-1
                        gap-10
                        py-12
                        md:grid-cols-2
                        lg:grid-cols-4
                        lg:gap-12
                    "
                >

                    {/* =================================================
                        BRAND
                    ================================================= */}

                    <div className="lg:col-span-2">

                        {/* BRAND HEADER */}

                        <div className="mb-5 flex items-center gap-3">

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-gradient-to-br
                                    from-green-400
                                    to-emerald-600
                                    shadow-lg
                                "
                            >
                                <Leaf
                                    size={26}
                                    className="text-white"
                                />
                            </div>

                            <div>

                                <h2 className="text-xl font-black tracking-tight">
                                    KrishiSetu AI
                                </h2>

                                <p className="text-xs text-green-200">
                                    Smart Farming Assistant
                                </p>

                            </div>

                        </div>

                        {/* DESCRIPTION */}

                        <p
                            className="
                                max-w-xl
                                text-sm
                                leading-7
                                text-green-100/70
                            "
                        >
                            Empowering Indian farmers with intelligent
                            technology, AI-powered agricultural guidance,
                            crop recommendations, disease detection,
                            weather insights and access to farming
                            information.
                        </p>

                        {/* BADGES */}

                        <div className="mt-6 flex flex-wrap gap-2">

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-3.5
                                    py-2
                                    text-xs
                                    font-medium
                                    text-green-100
                                "
                            >
                                <Sprout size={14} />
                                Smart Farming
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-3.5
                                    py-2
                                    text-xs
                                    font-medium
                                    text-green-100
                                "
                            >
                                <ShieldCheck size={14} />
                                AI Powered
                            </div>

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-3.5
                                    py-2
                                    text-xs
                                    font-medium
                                    text-green-100
                                "
                            >
                                <MessageCircle size={14} />
                                AI Assistant
                            </div>

                        </div>

                        {/* CONTACT CARD */}

                        <div
                            className="
                                mt-7
                                max-w-md
                                rounded-2xl
                                border
                                border-white/10
                                bg-white/5
                                p-4
                                backdrop-blur-sm
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        flex
                                        h-10
                                        w-10
                                        flex-shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-green-500/20
                                        text-green-300
                                    "
                                >
                                    <Mail size={19} />
                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-semibold text-green-200">
                                        Have a question or feedback?
                                    </p>

                                    <a
                                        href="mailto:nexus.contact.in@gmail.com"
                                        className="
                                            mt-1
                                            flex
                                            items-center
                                            gap-1.5
                                            text-sm
                                            font-semibold
                                            text-white
                                            transition-colors
                                            hover:text-lime-300
                                        "
                                    >
                                        Contact KrishiSetu AI
                                        <ArrowRight size={14} />
                                    </a>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        FEATURES
                    ================================================= */}

                    <div>

                        <h3
                            className="
                                mb-5
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.18em]
                                text-white
                            "
                        >
                            Features
                        </h3>

                        <div className="space-y-3">

                            {features.map((feature) => (
                                <div
                                    key={feature}
                                    className="
                                        group
                                        flex
                                        cursor-default
                                        items-center
                                        gap-2
                                        text-sm
                                        text-green-100/65
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    <span
                                        className="
                                            h-1
                                            w-1
                                            rounded-full
                                            bg-green-400
                                            opacity-60
                                            transition-transform
                                            duration-200
                                            group-hover:scale-150
                                        "
                                    />

                                    {feature}
                                </div>
                            ))}

                        </div>

                    </div>

                    {/* =================================================
                        PRODUCT
                    ================================================= */}

                    <div>

                        <h3
                            className="
                                mb-5
                                text-xs
                                font-black
                                uppercase
                                tracking-[0.18em]
                                text-white
                            "
                        >
                            KrishiSetu AI
                        </h3>

                        <div className="space-y-3">

                            {products.map((product) => (
                                <div
                                    key={product}
                                    className="
                                        group
                                        flex
                                        cursor-default
                                        items-center
                                        gap-2
                                        text-sm
                                        text-green-100/65
                                        transition-colors
                                        duration-200
                                        hover:text-white
                                    "
                                >
                                    <span
                                        className="
                                            h-1
                                            w-1
                                            rounded-full
                                            bg-emerald-400
                                            opacity-60
                                            transition-transform
                                            duration-200
                                            group-hover:scale-150
                                        "
                                    />

                                    {product}
                                </div>
                            ))}

                        </div>

                    </div>

                </div>

                {/* =====================================================
                    DIVIDER
                ===================================================== */}

                <div className="border-t border-white/10" />

                {/* =====================================================
                    BOTTOM SECTION
                ===================================================== */}

                <div
                    className="
                        flex
                        flex-col
                        gap-5
                        py-6
                        md:flex-row
                        md:items-center
                        md:justify-between
                    "
                >

                    {/* COPYRIGHT */}

                    <div className="text-center md:text-left">

                        <p className="text-sm text-green-100/75">

                            © 2026{" "}

                            <span className="font-bold text-white">
                                KrishiSetu AI
                            </span>

                            {" "}• Smart Farming Assistant

                        </p>

                        <p
                            className="
                                mt-1
                                text-xs
                                text-green-200/45
                            "
                        >
                            Built for smarter, sustainable and
                            technology-driven farming.
                        </p>

                    </div>

                    {/* DEVELOPER */}

                    <div className="flex flex-col items-center gap-1 md:items-end">

                        <p className="text-xs text-green-200/50">
                            Designed & Developed by
                        </p>

                        <a
                            href="mailto:your-email@example.com"
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-bold
                                text-white
                                transition-colors
                                hover:text-lime-300
                            "
                        >
                            Karan Bhoyar
                            <Mail size={14} />
                        </a>

                    </div>

                    {/* BACK TO TOP */}

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="
                            mx-auto
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/5
                            text-green-100
                            transition-all
                            duration-200
                            hover:-translate-y-1
                            hover:border-green-400/30
                            hover:bg-green-500/20
                            hover:text-white
                            md:mx-0
                        "
                        aria-label="Back to top"
                    >
                        <ArrowUp size={18} />
                    </button>

                </div>

            </div>

        </footer>
    );
}

export default Footer;
