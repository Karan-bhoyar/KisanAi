import { useState, useRef, useEffect } from "react";
import {
    Send,
    Leaf,
    Bot,
    Mic,
    MicOff,
    Volume2
} from "lucide-react";

import { sendMessage } from "../API/chatApi";

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

function ChatBox() {

    const [message, setMessage] = useState("");

    const [language, setLanguage] =
        useState("hi-IN");

    const [loading, setLoading] =
        useState(false);

    const [listening, setListening] =
        useState(false);

    const [messages, setMessages] = useState([
        {
            role: "ai",
            text:
                "🙏 नमस्ते! मैं किसान AI हूँ। आप खेती, फसल, रोग, बाजार भाव और सरकारी योजनाओं के बारे में पूछ सकते हैं।"
        }
    ]);

    const chatEndRef =
        useRef<HTMLDivElement | null>(null);

    const recognitionRef =
        useRef<any>(null);



    // Auto Scroll

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);



    // Speech Recognition

    useEffect(() => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition)
            return;

        const recognition =
            new SpeechRecognition();

        recognition.continuous = false;

        recognition.interimResults = false;

        recognition.lang = language;

        recognition.onresult = (event: any) => {

            const transcript =
                event.results[0][0].transcript;

            setMessage(transcript);

        };

        recognition.onend = () => {

            setListening(false);

        };

        recognitionRef.current =
            recognition;

    }, [language]);



    const startListening = () => {

        if (!recognitionRef.current) {

            alert(
                "Speech Recognition not supported."
            );

            return;

        }

        recognitionRef.current.lang =
            language;

        recognitionRef.current.start();

        setListening(true);

    };



    const stopListening = () => {

        recognitionRef.current?.stop();

        setListening(false);

    };



    const speak = (text: string) => {

        speechSynthesis.cancel();

        const utterance =
            new SpeechSynthesisUtterance(
                text
            );

        utterance.lang = language;

        utterance.rate = 1;

        speechSynthesis.speak(
            utterance
        );

    };



    const handleSend = async () => {

        if (!message.trim())
            return;

        const userMessage = message;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userMessage
            }
        ]);

        setMessage("");

        setLoading(true);

        try {

            const data =
                await sendMessage(userMessage);

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text: data.response
                }
            ]);

            speak(data.response);

        }

        catch {

            setMessages((prev) => [
                ...prev,
                {
                    role: "ai",
                    text:
                        "❌ Server se response nahi aaya."
                }
            ]);

        }

        finally {

            setLoading(false);

        }

    };

        return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 p-5">

            <div className="w-full max-w-4xl h-[85vh] bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">


                {/* HEADER */}

                <div className="bg-gradient-to-r from-green-700 to-emerald-500 text-white p-6 flex items-center gap-4">

                    <div className="bg-white/20 p-3 rounded-full">
                        <Leaf size={35} />
                    </div>

                    <div className="flex-1">

                        <h1 className="text-3xl font-bold">
                            🌾 Kisan AI
                        </h1>

                        <p className="text-green-100">
                            Smart Farming Assistant
                        </p>

                    </div>

                    {/* Language */}

                    <select

                        value={language}

                        onChange={(e) =>
                            setLanguage(e.target.value)
                        }

                        className="text-black px-3 py-2 rounded-xl"

                    >

                        <option value="en-IN">
                            English
                        </option>

                        <option value="hi-IN">
                            हिन्दी
                        </option>

                        <option value="mr-IN">
                            मराठी
                        </option>

                    </select>

                </div>



                {/* CHAT */}

                <div className="flex-1 overflow-y-auto p-6 space-y-5">

                    {

                        messages.map((msg, index) => (

                            <div

                                key={index}

                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}

                            >

                                <div

                                    className={`max-w-[75%] px-5 py-4 rounded-2xl shadow-md whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-green-700 text-white rounded-br-none"
                                        : "bg-white text-gray-700 rounded-bl-none"
                                        }`}

                                >

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-2 font-semibold">

                                            {

                                                msg.role === "ai"

                                                    ?

                                                    <>

                                                        <Bot size={18} />

                                                        Kisan AI

                                                    </>

                                                    :

                                                    <>

                                                        👨‍🌾 You

                                                    </>

                                            }

                                        </div>

                                        {

                                            msg.role === "ai"

                                            &&

                                            <button

                                                onClick={() =>
                                                    speak(msg.text)
                                                }

                                                className="text-green-700 hover:text-green-900"

                                            >

                                                <Volume2 size={18} />

                                            </button>

                                        }

                                    </div>


                                    <div className="mt-2">

                                        {msg.text}

                                    </div>

                                </div>

                            </div>

                        ))

                    }



                    {

                        loading &&

                        <div className="bg-white px-5 py-3 rounded-xl shadow animate-pulse w-fit">

                            🤖 Kisan AI सोच रहा है...

                        </div>

                    }

                    <div ref={chatEndRef} />

                </div>



                {/* INPUT */}

                <div className="border-t bg-white/80 p-5">

                    <div className="flex gap-3">

                        <input

                            className="flex-1 px-5 py-4 rounded-2xl border outline-none focus:ring-2 focus:ring-green-500"

                            placeholder="Type or speak your question..."

                            value={message}

                            onChange={(e) =>
                                setMessage(e.target.value)
                            }

                            onKeyDown={(e) => {

                                if (e.key === "Enter")

                                    handleSend();

                            }}

                        />



                        <button

                            onClick={

                                listening

                                    ?

                                    stopListening

                                    :

                                    startListening

                            }

                            className={`px-5 rounded-2xl text-white transition ${listening
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-blue-600 hover:bg-blue-700"
                                }`}

                        >

                            {

                                listening

                                    ?

                                    <MicOff size={22} />

                                    :

                                    <Mic size={22} />

                            }

                        </button>



                        <button

                            onClick={handleSend}

                            className="bg-green-700 hover:bg-green-800 text-white px-6 rounded-2xl transition"

                        >

                            <Send />

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ChatBox;