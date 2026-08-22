import { Link } from "react-router-dom";
import {
    Sprout,
    Globe,
    User
} from "lucide-react";


function Header(){

    return (

        <header
            className="
            sticky
            top-0
            z-50
            bg-white/90
            backdrop-blur-lg
            border-b
            shadow-sm
            "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                h-16
                px-5
                flex
                items-center
                justify-between
                "
            >


                {/* Logo */}

                <Link
                    to="/"
                    className="
                    flex
                    items-center
                    gap-2
                    "
                >

                    <Sprout
                        size={30}
                        className="text-green-700"
                    />


                    <h1
                        className="
                        text-2xl
                        font-bold
                        text-green-700
                        "
                    >
                        Kisan AI
                    </h1>


                </Link>



                {/* Navigation */}

                <nav
                    className="
                    hidden
                    md:flex
                    gap-6
                    text-gray-700
                    font-medium
                    "
                >

                    <Link to="/">
                        Home
                    </Link>


                    <Link to="/disease">
                        Disease
                    </Link>


                    <Link to="/profile">
                        Profile
                    </Link>


                </nav>




                {/* Right */}

                <div
                    className="
                    flex
                    items-center
                    gap-4
                    "
                >


                    <button
                        className="
                        flex
                        items-center
                        gap-2
                        text-gray-700
                        "
                    >

                        <Globe size={18}/>

                        Hindi

                    </button>



                    <Link
                        to="/profile"
                        className="
                        flex
                        items-center
                        gap-2
                        bg-green-700
                        text-white
                        px-4
                        py-2
                        rounded-xl
                        "
                    >

                        <User size={18}/>

                        Profile


                    </Link>


                </div>


            </div>


        </header>

    );

}


export default Header;