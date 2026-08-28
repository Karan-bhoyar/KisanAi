
import {
    Leaf,
    Sprout,
    ShieldCheck,
    MessageCircle,
    ArrowUp,
} from "lucide-react";

function Footer() {

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="relative bg-gradient-to-br from-green-950 via-green-900 to-emerald-900 text-white overflow-hidden">

            {/* Background Decoration */}

            <div
                className="
                    absolute
                    -top-24
                    -left-24
                    w-64
                    h-64
                    rounded-full
                    bg-green-500/10
                    blur-3xl
                    pointer-events-none
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    -right-24
                    w-72
                    h-72
                    rounded-full
                    bg-emerald-400/10
                    blur-3xl
                    pointer-events-none
                "
            />


            {/* MAIN CONTAINER */}

            <div className="
                relative
                max-w-7xl
                mx-auto
                px-5
                md:px-8
            ">


                {/* TOP SECTION */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-10
                    py-12
                ">


                    {/* BRAND */}

                    <div className="lg:col-span-2">

                        <div className="
                            flex
                            items-center
                            gap-3
                            mb-5
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-gradient-to-br
                                from-green-400
                                to-emerald-500
                                flex
                                items-center
                                justify-center
                                shadow-lg
                            ">

                                <Leaf
                                    size={26}
                                    className="text-white"
                                />

                            </div>


                            <div>

                                <h2 className="
                                    text-xl
                                    font-black
                                ">
                                    KrishiSetu AI
                                </h2>

                                <p className="
                                    text-xs
                                    text-green-200
                                ">
                                    Smart Farming Assistant
                                </p>

                            </div>

                        </div>


                        <p className="
                            max-w-lg
                            text-sm
                            leading-7
                            text-green-100/75
                        ">
                            Empowering Indian farmers with AI-powered
                            agricultural assistance, crop guidance,
                            disease detection, weather information and
                            farming knowledge.
                        </p>


                        {/* BADGES */}

                        <div className="
                            flex
                            flex-wrap
                            gap-2
                            mt-6
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white/5
                                border
                                border-white/10
                                px-3
                                py-2
                                text-xs
                                text-green-100
                            ">

                                <Sprout size={14} />

                                Smart Farming

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white/5
                                border
                                border-white/10
                                px-3
                                py-2
                                text-xs
                                text-green-100
                            ">

                                <ShieldCheck size={14} />

                                AI Powered

                            </div>


                            <div className="
                                flex
                                items-center
                                gap-2
                                rounded-full
                                bg-white/5
                                border
                                border-white/10
                                px-3
                                py-2
                                text-xs
                                text-green-100
                            ">

                                <MessageCircle size={14} />

                                AI Assistant

                            </div>

                        </div>

                    </div>


                    {/* FEATURES */}

                    <div>

                        <h3 className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-wider
                            mb-5
                        ">
                            Features
                        </h3>


                        <div className="space-y-3">

                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Crop Recommendation
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Disease Detection
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Weather Guidance
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Market Prices
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Government Schemes
                            </p>

                        </div>

                    </div>


                    {/* PRODUCT */}

                    <div>

                        <h3 className="
                            text-sm
                            font-bold
                            uppercase
                            tracking-wider
                            mb-5
                        ">
                            KrishiSetu AI
                        </h3>


                        <div className="space-y-3">

                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Smart Farming
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                AI Chat Assistant
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Voice Assistant
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Multilingual Support
                            </p>


                            <p className="
                                text-sm
                                text-green-100/70
                                hover:text-white
                                transition
                                cursor-pointer
                            ">
                                Farmer Support
                            </p>

                        </div>

                    </div>

                </div>


                {/* DIVIDER */}

                <div className="
                    border-t
                    border-white/10
                " />


                {/* BOTTOM */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-4
                    py-6
                ">


                    {/* COPYRIGHT */}

                    <div className="text-center md:text-left">

                        <p className="
                            text-sm
                            text-green-100/80
                        ">

                            © 2026{" "}

                            <span className="
                                font-semibold
                                text-white
                            ">
                                KrishiSetu AI
                            </span>

                            {" "}• Smart Farming Assistant

                        </p>


                        <p className="
                            text-xs
                            text-green-200/50
                            mt-1
                        ">
                            Built for smarter and sustainable farming.
                        </p>

                    </div>


                    {/* DEVELOPER */}

                    <div className="
                        flex
                        items-center
                        gap-2
                    ">

                        <span className="
                            text-xs
                            text-green-200/50
                        ">
                            Developed by
                        </span>


                        <span className="
                            text-sm
                            font-semibold
                            text-white
                        ">
                            Karan Bhoyar
                        </span>

                    </div>


                    {/* BACK TO TOP */}

                    <button
                        type="button"
                        onClick={scrollToTop}
                        className="
                            w-10
                            h-10
                            rounded-xl
                            bg-white/5
                            border
                            border-white/10
                            flex
                            items-center
                            justify-center
                            text-green-100
                            hover:bg-green-500/20
                            hover:border-green-400/30
                            hover:-translate-y-1
                            transition-all
                            duration-300
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
