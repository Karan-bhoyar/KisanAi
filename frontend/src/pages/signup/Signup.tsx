import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
    Mail,
    Lock,
    Leaf,
    Eye,
    EyeOff,
    Sprout,
    User,
    Phone,
    CheckCircle,
} from "lucide-react";

function Signup() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const API_URL =
        "https://kisanai-production-7b9c.up.railway.app";


    // ==========================================
    // SIGNUP
    // ==========================================

    const handleSignup = async () => {

        setError("");
        setSuccess("");

        // ==========================================
        // EMPTY FIELD VALIDATION
        // ==========================================

        if (
            !fullName.trim() ||
            !email.trim() ||
            !phone.trim() ||
            !password ||
            !confirmPassword
        ) {

            setError(
                "Please fill all fields."
            );

            return;
        }


        // ==========================================
        // FULL NAME VALIDATION
        // ==========================================

        if (fullName.trim().length < 3) {

            setError(
                "Full name must be at least 3 characters."
            );

            return;
        }


        // ==========================================
        // EMAIL VALIDATION
        // ==========================================

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email.trim())) {

            setError(
                "Please enter a valid email address."
            );

            return;
        }


        // ==========================================
        // PHONE VALIDATION
        // ==========================================

        if (!/^[0-9]{10,15}$/.test(phone)) {

            setError(
                "Phone number must contain 10 to 15 digits."
            );

            return;
        }


        // ==========================================
        // PASSWORD VALIDATION
        // ==========================================

        if (password.length < 8) {

            setError(
                "Password must be at least 8 characters."
            );

            return;
        }


        // ==========================================
        // CONFIRM PASSWORD
        // ==========================================

        if (password !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;
        }


        // ==========================================
        // API REQUEST
        // ==========================================

        try {

            setLoading(true);

            const response = await axios.post(

                `${API_URL}/auth/register`,

                {
                    full_name: fullName.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    password: password,
                    role: "Farmer",
                    language: "English",
                },

                {
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                }

            );


            console.log(
                "SIGNUP SUCCESS:",
                response.data
            );


            // ==========================================
            // SUCCESS MESSAGE
            // ==========================================

            setSuccess(
                "Account created successfully! Redirecting to login..."
            );


            // ==========================================
            // CLEAR FORM
            // ==========================================

            setFullName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");


            // ==========================================
            // REDIRECT TO LOGIN
            // ==========================================

            setTimeout(() => {

                navigate(
                    "/login",
                    {
                        replace: true,
                    }
                );

            }, 1500);


        } catch (err: any) {

            console.error(
                "SIGNUP ERROR:",
                err.response?.data || err
            );


            const detail =
                err.response?.data?.detail;


            // ==========================================
            // FASTAPI VALIDATION ERROR
            // ==========================================

            if (Array.isArray(detail)) {

                const message =
                    detail
                        .map(
                            (item: any) =>
                                item.msg
                        )
                        .join(", ");

                setError(message);

            }


            // ==========================================
            // BACKEND STRING ERROR
            // ==========================================

            else if (
                typeof detail === "string"
            ) {

                // --------------------------------------
                // DUPLICATE PHONE
                // --------------------------------------

                if (
                    detail.toLowerCase().includes(
                        "phone"
                    ) &&
                    (
                        detail.toLowerCase().includes(
                            "already"
                        ) ||
                        detail.toLowerCase().includes(
                            "duplicate"
                        ) ||
                        detail.toLowerCase().includes(
                            "unique"
                        )
                    )
                ) {

                    setError(
                        "Phone number already registered. Please use another number."
                    );

                }

                // --------------------------------------
                // DUPLICATE EMAIL
                // --------------------------------------

                else if (
                    detail.toLowerCase().includes(
                        "email"
                    ) &&
                    (
                        detail.toLowerCase().includes(
                            "already"
                        ) ||
                        detail.toLowerCase().includes(
                            "duplicate"
                        ) ||
                        detail.toLowerCase().includes(
                            "unique"
                        )
                    )
                ) {

                    setError(
                        "Email already registered. Please use another email."
                    );

                }

                // --------------------------------------
                // NORMAL BACKEND ERROR
                // --------------------------------------

                else {

                    setError(detail);

                }

            }


            // ==========================================
            // NETWORK ERROR
            // ==========================================

            else if (!err.response) {

                setError(
                    "Unable to connect to the server. Please try again."
                );

            }


            // ==========================================
            // UNKNOWN ERROR
            // ==========================================

            else {

                setError(
                    "Unable to create account. Please try again."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div
            className="
                min-h-screen
                relative
                overflow-hidden
                bg-gradient-to-br
                from-green-900
                via-green-700
                to-emerald-500
                flex
                items-center
                justify-center
                px-4
                py-8
            "
        >

            {/* ==========================================
                FLOATING CIRCLES
            ========================================== */}

            <div
                className="
                    absolute
                    w-72
                    h-72
                    bg-green-300/20
                    rounded-full
                    top-10
                    left-10
                    animate-pulse
                "
            />

            <div
                className="
                    absolute
                    w-96
                    h-96
                    bg-white/10
                    rounded-full
                    bottom-0
                    right-0
                    animate-bounce
                "
            />


            {/* ==========================================
                SIGNUP CARD
            ========================================== */}

            <div
                className="
                    relative
                    z-10
                    w-full
                    max-w-md
                    bg-white/20
                    backdrop-blur-xl
                    border
                    border-white/30
                    shadow-2xl
                    rounded-3xl
                    p-8
                "
            >


                {/* ==========================================
                    LOGO
                ========================================== */}

                <div
                    className="
                        flex
                        justify-center
                        mb-5
                    "
                >

                    <div
                        className="
                            w-20
                            h-20
                            rounded-full
                            bg-white
                            flex
                            items-center
                            justify-center
                            shadow-xl
                        "
                    >

                        <Leaf
                            size={36}
                            className="text-green-700"
                        />

                    </div>

                </div>


                {/* ==========================================
                    TITLE
                ========================================== */}

                <h1
                    className="
                        text-center
                        text-3xl
                        font-bold
                        text-white
                    "
                >
                    Create Account
                </h1>


                <p
                    className="
                        text-center
                        text-green-100
                        mt-2
                        mb-6
                    "
                >
                    Join Kisan AI 🌱
                </p>


                {/* ==========================================
                    FULL NAME
                ========================================== */}

                <div className="relative mb-4">

                    <User
                        className="
                            absolute
                            left-4
                            top-3.5
                            text-green-700
                        "
                        size={21}
                    />

                    <input
                        type="text"
                        placeholder="Full name"
                        value={fullName}
                        onChange={(e) =>
                            setFullName(e.target.value)
                        }
                        autoComplete="name"
                        className="
                            w-full
                            pl-12
                            py-3
                            rounded-xl
                            bg-white
                            outline-none
                            focus:ring-4
                            focus:ring-green-300
                            transition
                        "
                    />

                </div>


                {/* ==========================================
                    EMAIL
                ========================================== */}

                <div className="relative mb-4">

                    <Mail
                        className="
                            absolute
                            left-4
                            top-3.5
                            text-green-700
                        "
                        size={21}
                    />

                    <input
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="email"
                        className="
                            w-full
                            pl-12
                            py-3
                            rounded-xl
                            bg-white
                            outline-none
                            focus:ring-4
                            focus:ring-green-300
                            transition
                        "
                    />

                </div>


                {/* ==========================================
                    PHONE
                ========================================== */}

                <div className="relative mb-4">

                    <Phone
                        className="
                            absolute
                            left-4
                            top-3.5
                            text-green-700
                        "
                        size={21}
                    />

                    <input
                        type="tel"
                        placeholder="Phone number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(
                                e.target.value.replace(
                                    /\D/g,
                                    ""
                                )
                            )
                        }
                        maxLength={15}
                        autoComplete="tel"
                        className="
                            w-full
                            pl-12
                            py-3
                            rounded-xl
                            bg-white
                            outline-none
                            focus:ring-4
                            focus:ring-green-300
                            transition
                        "
                    />

                </div>


                {/* ==========================================
                    PASSWORD
                ========================================== */}

                <div className="relative mb-4">

                    <Lock
                        className="
                            absolute
                            left-4
                            top-3.5
                            text-green-700
                        "
                        size={21}
                    />

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        autoComplete="new-password"
                        className="
                            w-full
                            pl-12
                            pr-12
                            py-3
                            rounded-xl
                            bg-white
                            outline-none
                            focus:ring-4
                            focus:ring-green-300
                            transition
                        "
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="
                            absolute
                            right-4
                            top-3.5
                            text-gray-500
                        "
                    >

                        {showPassword ? (
                            <EyeOff size={21} />
                        ) : (
                            <Eye size={21} />
                        )}

                    </button>

                </div>


                {/* ==========================================
                    CONFIRM PASSWORD
                ========================================== */}

                <div className="relative mb-5">

                    <Lock
                        className="
                            absolute
                            left-4
                            top-3.5
                            text-green-700
                        "
                        size={21}
                    />

                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        onKeyDown={(e) => {

                            if (e.key === "Enter") {

                                handleSignup();

                            }

                        }}
                        autoComplete="new-password"
                        className="
                            w-full
                            pl-12
                            pr-12
                            py-3
                            rounded-xl
                            bg-white
                            outline-none
                            focus:ring-4
                            focus:ring-green-300
                            transition
                        "
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                        className="
                            absolute
                            right-4
                            top-3.5
                            text-gray-500
                        "
                    >

                        {showConfirmPassword ? (
                            <EyeOff size={21} />
                        ) : (
                            <Eye size={21} />
                        )}

                    </button>

                </div>


                {/* ==========================================
                    ERROR
                ========================================== */}

                {error && (

                    <div
                        className="
                            bg-red-100
                            text-red-700
                            px-4
                            py-2.5
                            rounded-lg
                            mb-4
                            text-sm
                            whitespace-nowrap
                            overflow-hidden
                            text-ellipsis
                        "
                        title={error}
                    >
                        {error}
                    </div>

                )}


                {/* ==========================================
                    SUCCESS
                ========================================== */}

                {success && (

                    <div
                        className="
                            bg-green-100
                            text-green-700
                            p-3
                            rounded-lg
                            mb-4
                            text-sm
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <CheckCircle
                            size={18}
                            className="shrink-0"
                        />

                        <span>
                            {success}
                        </span>

                    </div>

                )}


                {/* ==========================================
                    CREATE ACCOUNT BUTTON
                ========================================== */}

                <button
                    type="button"
                    onClick={handleSignup}
                    disabled={loading}
                    className="
                        w-full
                        bg-white
                        text-green-700
                        font-bold
                        py-3
                        rounded-xl
                        shadow-lg
                        hover:scale-105
                        transition
                        flex
                        items-center
                        justify-center
                        gap-2
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                    "
                >

                    <Sprout size={22} />

                    {loading
                        ? "Creating Account..."
                        : "Create Account"
                    }

                </button>


                {/* ==========================================
                    LOGIN LINK
                ========================================== */}

                <p
                    className="
                        text-center
                        text-green-100
                        text-sm
                        mt-6
                    "
                >

                    Already have an account?{" "}

                    <Link
                        to="/login"
                        className="
                            text-white
                            font-bold
                            underline
                            hover:text-green-200
                        "
                    >
                        Login
                    </Link>

                </p>


                {/* ==========================================
                    FOOTER
                ========================================== */}

                <p
                    className="
                        text-center
                        text-green-100
                        text-xs
                        mt-4
                    "
                >
                    Powered by AI 🌾
                </p>

            </div>

        </div>

    );
}

export default Signup;
