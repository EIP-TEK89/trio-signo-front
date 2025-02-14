import React, { useRef, useState } from "react";
import axios from "axios";

const VideoCaptureUploader: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const recorderRef = useRef<MediaRecorder | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [isRecording, setIsRecording] = useState(false);

    const startCaptureProcess = async () => {
        setCountdown(3);
        for (let i = 3; i > 0; i--) {
            setCountdown(i);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        setCountdown(null);

        await startRecording();
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            mediaStreamRef.current = stream;

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            const recordedChunks: Blob[] = [];
            const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

            recorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };

            recorder.onstop = async () => {
                const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                await uploadVideo(recordedBlob);
            };

            recorderRef.current = recorder;
            recorder.start();
            setIsRecording(true);

            setTimeout(() => {
                recorder.stop();
                stopVideoStream();
            }, 5000); // Enregistre pendant 5 secondes

        } catch (error) {
            console.error("Error accessing webcam:", error);
        }
    };

    const stopVideoStream = () => {
        mediaStreamRef.current?.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
        setIsRecording(false);
    };

    const uploadVideo = async (videoBlob: Blob) => {
        const formData = new FormData();
        formData.append("file", videoBlob, "video.webm");

        try {
            const response = await axios.post("http://localhost:5000/get-alphabet", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Server Response:", response.data);
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    };
    return (
        <div className="tuto">
            <video ref={videoRef} autoPlay width={540} height={480} />
            <button className="pushable"
                onClick={startCaptureProcess}
                disabled={isRecording}>
                <span className="front">
                    {isRecording ? "Recording..." : "Start Capture"}
                </span>
            </button>
            {countdown !== null && <p>{countdown}</p>}
        </div>
    );
};

export default VideoCaptureUploader;
