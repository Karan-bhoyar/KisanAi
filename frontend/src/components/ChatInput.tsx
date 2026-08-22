import { useState, useRef } from "react";
import { Mic, Send, Square } from "lucide-react";
import axios from "axios";


interface Props {

    onSend: (
        message: string,
        language: string
    ) => void;

}



function ChatInput({ onSend }: Props) {


    const [message, setMessage] = useState("");

    const [language, setLanguage] = useState("hi");


    const [recording, setRecording] = useState(false);



    const mediaRecorder =
        useRef<MediaRecorder | null>(null);



    const audioChunks =
        useRef<Blob[]>([]);



    const streamRef =
        useRef<MediaStream | null>(null);








    // START RECORDING

    const startRecording = async()=>{


        try{


            const stream =
                await navigator.mediaDevices.getUserMedia({

                    audio:true

                });



            streamRef.current = stream;



            const recorder =
                new MediaRecorder(stream);



            mediaRecorder.current = recorder;



            audioChunks.current = [];





            recorder.ondataavailable = (event)=>{


                if(event.data.size > 0){

                    audioChunks.current.push(
                        event.data
                    );

                }

            };








            recorder.onstop = async()=>{


                const audioBlob =
                    new Blob(

                        audioChunks.current,

                        {
                            type:"audio/webm"
                        }

                    );




                const formData =
                    new FormData();



                formData.append(

                    "file",

                    audioBlob,

                    "voice.webm"

                );



                formData.append(

                    "language",

                    language

                );






                try{


                    const token =
                        localStorage.getItem(
                            "token"
                        );




                    const response =
                        await axios.post(


                            "http://localhost:8000/api/voice/stt",


                            formData,


                            {

                                headers:{


                                    "Content-Type":
                                    "multipart/form-data",


                                    Authorization:
                                    `Bearer ${token}`


                                }


                            }


                        );




                    console.log(
                        "Voice Response:",
                        response.data
                    );




                    setMessage(

                        response.data.text

                    );



                }



                catch(error:any){


                    console.log(

                        "Voice API Error:",

                        error.response?.data
                        ||
                        error.message

                    );


                }




                // stop mic

                streamRef.current
                ?.getTracks()
                .forEach(

                    track=>
                    track.stop()

                );



            };







            recorder.start();



            setRecording(true);



        }


        catch(error){


            console.log(
                error
            );


            alert(
                "Please allow microphone permission"
            );


        }


    };









    // STOP RECORDING

    const stopRecording = ()=>{


        if(mediaRecorder.current){


            mediaRecorder.current.stop();


        }



        setRecording(false);


    };









    // SEND MESSAGE

    const handleSubmit = ()=>{


        if(!message.trim())
            return;



        onSend(

            message,

            language

        );



        setMessage("");

    };









    return (

        <div className="
            p-4
            md:p-5
            flex
            gap-3
            bg-white
            border-t
            items-center
            flex-wrap
        ">





            {/* LANGUAGE */}

            <select

                value={language}

                onChange={
                    (e)=>
                    setLanguage(e.target.value)
                }

                className="
                    border
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                "

            >

                <option value="hi">
                    Hindi
                </option>


                <option value="mr">
                    Marathi
                </option>


                <option value="en">
                    English
                </option>


            </select>








            {/* INPUT */}

            <input

                value={message}

                onChange={
                    (e)=>
                    setMessage(
                        e.target.value
                    )
                }


                onKeyDown={
                    (e)=>{

                        if(e.key==="Enter")
                        {
                            handleSubmit();
                        }

                    }
                }


                placeholder="Ask farming question..."


                className="
                    flex-1
                    min-w-[200px]
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                "

            />








            {/* MIC */}


            <button

                onClick={

                    recording

                    ?

                    stopRecording

                    :

                    startRecording

                }


                className={`
                    p-3
                    rounded-full
                    text-white

                    ${
                        recording

                        ?

                        "bg-red-500 animate-pulse"

                        :

                        "bg-green-700"

                    }

                `}

            >


                {

                    recording

                    ?

                    <Square size={20}/>

                    :

                    <Mic size={20}/>

                }


            </button>








            {/* SEND */}


            <button

                onClick={handleSubmit}

                className="
                    bg-green-700
                    hover:bg-green-800
                    text-white
                    p-3
                    rounded-xl
                "

            >

                <Send size={22}/>

            </button>




        </div>

    );

}



export default ChatInput;