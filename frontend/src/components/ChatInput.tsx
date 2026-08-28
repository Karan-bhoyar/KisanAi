import { useState, useRef } from "react";
import {
    Mic,
    Send,
    Square,
    LoaderCircle,
} from "lucide-react";
import axios from "axios";

interface Props {
    onSend: (
        message: string,
        language: "hi" | "mr" | "en"
    ) => void;
}

function ChatInput({ onSend }: Props) {

    // ======================================================
    // STATE
    // ======================================================

    const [message, setMessage] = useState("");

    const [language, setLanguage] =
        useState<"hi" | "mr" | "en">("hi");

    // Recording microphone
    const [recording, setRecording] =
        useState(false);

    // Voice is being sent to backend / STT
    const [processingVoice, setProcessingVoice] =
        useState(false);

    // ======================================================
    // REFS
    // ======================================================

    const mediaRecorder =
        useRef<MediaRecorder | null>(null);

    const audioChunks =
        useRef<Blob[]>([]);

    const streamRef =
        useRef<MediaStream | null>(null);

    // ======================================================
    // RAILWAY BACKEND
    // ======================================================

    const API_URL =
        "https://kisanai-production-7b9c.up.railway.app";

    // ======================================================
    // START RECORDING
    // ======================================================

    const startRecording = async () => {

        // Don't start another recording while
        // voice processing is running
        if (processingVoice) {
            return;
        }

        try {

            const stream =
                await navigator.mediaDevices.getUserMedia({
                    audio: true,
                });

            streamRef.current = stream;

            // ==================================================
            // CREATE RECORDER
            // ==================================================

            const recorder =
                new MediaRecorder(stream);

            mediaRecorder.current = recorder;

            audioChunks.current = [];

            // ==================================================
            // COLLECT AUDIO
            // ==================================================

            recorder.ondataavailable = (event) => {

                if (event.data.size > 0) {

                    audioChunks.current.push(
                        event.data
                    );

                }

            };

            // ==================================================
            // RECORDING STOPPED
            // ==================================================

            recorder.onstop = async () => {

                // Immediately change UI:
                // recording -> processing
                setRecording(false);
                setProcessingVoice(true);

                // ==================================================
                // CREATE AUDIO BLOB
                // ==================================================

                const audioBlob =
                    new Blob(
                        audioChunks.current,
                        {
                            type: "audio/webm",
                        }
                    );

                // ==================================================
                // FORM DATA
                // ==================================================

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

                try {

                    // ==================================================
                    // TOKEN
                    // ==================================================

                    const token =
                        localStorage.getItem("token");

                    if (!token) {

                        alert(
                            "Please login again."
                        );

                        window.location.href =
                            "/login";

                        return;

                    }

                    // ==================================================
                    // SEND TO STT API
                    // ==================================================

                    const response =
                        await axios.post(

                            `${API_URL}/api/voice/stt`,

                            formData,

                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`,
                                },
                            }

                        );

                    console.log(
                        "Voice Response:",
                        response.data
                    );

                    // ==================================================
                    // GET TRANSCRIBED TEXT
                    // ==================================================

                    const text =
                        response.data.text ||
                        response.data.question ||
                        "";

                    if (text) {

                        // Put recognized voice
                        // inside input
                        setMessage(text);

                    } else {

                        console.error(
                            "Voice text not received:",
                            response.data
                        );

                        alert(
                            "Voice text could not be recognized."
                        );

                    }

                }

                catch (error: any) {

                    console.error(
                        "Voice API Error:",
                        error.response?.status,
                        error.response?.data ||
                        error.message
                    );

                    if (
                        error.response?.status === 401
                    ) {

                        alert(
                            "Session expired. Please login again."
                        );

                        localStorage.removeItem(
                            "token"
                        );

                        window.location.href =
                            "/login";

                    }

                    else {

                        alert(
                            "Voice service failed. Please try again."
                        );

                    }

                }

                finally {

                    // ==================================================
                    // STOP MICROPHONE
                    // ==================================================

                    streamRef.current
                        ?.getTracks()
                        .forEach(
                            (track) =>
                                track.stop()
                        );

                    streamRef.current = null;

                    mediaRecorder.current = null;

                    audioChunks.current = [];

                    // ==================================================
                    // IMPORTANT
                    // REMOVE CIRCULAR LOADER
                    // ==================================================

                    setProcessingVoice(false);

                }

            };

            // ==================================================
            // START MEDIA RECORDER
            // ==================================================

            recorder.start();

            setRecording(true);

        }

        catch (error) {

            console.error(
                "Microphone Error:",
                error
            );

            alert(
                "Please allow microphone permission."
            );

            // Make sure microphone is stopped
            streamRef.current
                ?.getTracks()
                .forEach(
                    (track) =>
                        track.stop()
                );

            streamRef.current = null;

            setRecording(false);

        }

    };

    // ======================================================
    // STOP RECORDING
    // ======================================================

    const stopRecording = () => {

        if (!mediaRecorder.current) {
            return;
        }

        if (
            mediaRecorder.current.state !==
            "inactive"
        ) {

            mediaRecorder.current.stop();

        }

        // DON'T set processingVoice here.

        // recorder.onstop will set:
        // recording = false
        // processingVoice = true

    };

    // ======================================================
    // SEND MESSAGE
    // ======================================================

    const handleSubmit = () => {

        const trimmedMessage =
            message.trim();

        if (!trimmedMessage) {
            return;
        }

        // Don't send while voice is processing
        if (processingVoice) {
            return;
        }

        console.log(
            "Sending message:",
            trimmedMessage
        );

        console.log(
            "Language:",
            language
        );

        onSend(
            trimmedMessage,
            language
        );

        setMessage("");

    };

    // ======================================================
    // UI
    // ======================================================

    return (

        <div
            className="
                p-4
                md:p-5

                flex
                gap-3

                bg-white

                border-t
                border-green-100

                items-center

                flex-wrap
            "
        >

            {/* ==================================================
                LANGUAGE
            ================================================== */}

            <select
                value={language}
                disabled={
                    recording ||
                    processingVoice
                }
                onChange={(e) =>
                    setLanguage(
                        e.target.value as
                        "hi" | "mr" | "en"
                    )
                }
                className="
                    border
                    border-gray-200
                    rounded-xl

                    px-3
                    py-3

                    text-sm

                    outline-none

                    focus:ring-2
                    focus:ring-green-500

                    disabled:opacity-50
                    disabled:cursor-not-allowed
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


            {/* ==================================================
                INPUT
            ================================================== */}

            <input
                value={message}
                disabled={
                    processingVoice
                }
                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
                onKeyDown={(e) => {

                    if (
                        e.key === "Enter" &&
                        !e.shiftKey
                    ) {

                        e.preventDefault();

                        handleSubmit();

                    }

                }}
                placeholder={
                    processingVoice
                        ? "Converting voice to text..."
                        : recording
                        ? "Listening..."
                        : "Ask farming question..."
                }
                className="
                    flex-1

                    min-w-[180px]

                    border
                    border-gray-200

                    rounded-xl

                    px-4
                    py-3

                    outline-none

                    focus:ring-2
                    focus:ring-green-500

                    disabled:bg-gray-50
                    disabled:cursor-not-allowed
                "
            />


            {/* ==================================================
                MICROPHONE / VOICE PROCESSING
            ================================================== */}

            <button
                type="button"
                disabled={
                    processingVoice
                }
                onClick={
                    recording
                        ? stopRecording
                        : startRecording
                }
                className={`
                    relative

                    w-12
                    h-12

                    flex
                    items-center
                    justify-center

                    rounded-full

                    text-white

                    shadow-md

                    transition-all

                    ${
                        recording
                            ? "bg-red-500 hover:bg-red-600"
                            : processingVoice
                            ? "bg-green-600 cursor-not-allowed"
                            : "bg-green-700 hover:bg-green-800"
                    }
                `}
            >

                {/* ==================================================
                    RECORDING
                ================================================== */}

                {recording && (

                    <>
                        {/* OUTER PULSE */}

                        <span
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-red-400/40
                                animate-ping
                            "
                        />

                        {/* STOP ICON */}

                        <Square
                            size={19}
                            fill="white"
                            className="
                                relative
                                z-10
                            "
                        />

                    </>

                )}


                {/* ==================================================
                    VOICE PROCESSING
                ================================================== */}

                {processingVoice && (

                    <>

                        {/* Rotating circular border */}

                        <span
                            className="
                                absolute
                                inset-0

                                rounded-full

                                border-[3px]
                                border-white/30

                                border-t-white

                                animate-spin
                            "
                        />

                        {/* Center microphone */}

                        <Mic
                            size={20}
                            className="
                                relative
                                z-10
                            "
                        />

                    </>

                )}


                {/* ==================================================
                    NORMAL MICROPHONE
                ================================================== */}

                {!recording &&
                    !processingVoice && (

                        <Mic
                            size={21}
                        />

                    )}

            </button>


            {/* ==================================================
                SEND BUTTON
            ================================================== */}

            <button
                type="button"
                onClick={handleSubmit}
                disabled={
                    !message.trim() ||
                    recording ||
                    processingVoice
                }
                className="
                    bg-green-700

                    hover:bg-green-800

                    text-white

                    p-3

                    rounded-xl

                    disabled:opacity-50
                    disabled:cursor-not-allowed

                    transition
                "
            >

                <Send size={22} />

            </button>

        </div>

    );

}

export default ChatInput;
