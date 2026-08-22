import { useState } from "react";
import {
    Volume2,
    VolumeX
} from "lucide-react";


interface Props {

    role: string;

    text: string;

}



function MessageBubble({ role, text }: Props) {


    const isUser = role === "user";

    const [speaking, setSpeaking] = useState(false);



    // Remove markdown symbols **
    const cleanText = (value: string) => {

        return value
            .replace(/\*\*(.*?)\*\*/g, "$1")
            .replace(/\*/g, "");

    };



    const finalText = cleanText(text);



    const speak = () => {


        speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(finalText);



        // Language Detection

        if (/[\u0900-\u097F]/.test(finalText)) {


            // Hindi + Marathi Devanagari

            utterance.lang = "hi-IN";


        }

        else {


            utterance.lang = "en-IN";


        }



        utterance.rate = 0.9;

        utterance.pitch = 1;



        utterance.onstart = () => {

            setSpeaking(true);

        };



        utterance.onend = () => {

            setSpeaking(false);

        };



        utterance.onerror = () => {

            setSpeaking(false);

        };



        speechSynthesis.speak(
            utterance
        );


    };




    const stopSpeak = () => {

        speechSynthesis.cancel();

        setSpeaking(false);

    };




    return (


        <div
            className={`
                flex
                ${isUser ? "justify-end" : "justify-start"}
                animate-[fadeIn_0.4s_ease]
            `}
        >


            <div
                className={`
                    max-w-[70%]
                    px-5
                    py-4
                    rounded-3xl
                    shadow-md
                    text-sm
                    leading-relaxed

                    ${
                        isUser
                            ? "bg-green-700 text-white rounded-br-none"
                            : "bg-white text-gray-700 rounded-bl-none border"
                    }
                `}
            >



                <div className="flex items-center justify-between mb-2">


                    <div className="text-lg">

                        {
                            isUser
                                ? "👨‍🌾"
                                : "🤖"
                        }

                    </div>



                    {
                        !isUser &&


                        <button

                            onClick={
                                speaking
                                    ? stopSpeak
                                    : speak
                            }


                            className="
                                text-green-700
                                hover:text-green-900
                                transition
                            "


                            title={
                                speaking
                                    ? "Stop"
                                    : "Listen"
                            }

                        >

                            {
                                speaking

                                ? <VolumeX size={20}/>

                                : <Volume2 size={20}/>

                            }


                        </button>


                    }



                </div>





                <p className="whitespace-pre-wrap">

                    {finalText}

                </p>



            </div>


        </div>


    );


}


export default MessageBubble;