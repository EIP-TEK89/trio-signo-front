import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { getBaseUrl, getBaseUrlWithPort } from '../getBaseUrl';


interface VideoCaptureUploaderProps {
    goodAnswer: () => void;
    badAnswer: () => void;
    response: string;
}

const VideoCaptureUploader: React.FC<VideoCaptureUploaderProps> = ({ goodAnswer, badAnswer, response }) => {
    console.log(response)
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const streamingRef = useRef(false); // Référence pour suivre l'état de streaming

    const startCaptureProcess = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }

        } catch (err) {
            console.error("Error accessing webcam:", err);
        }
    };

    const stopStreaming = () => {
        setIsStreaming(false);
        streamingRef.current = false; // Met à jour la référence pour arrêter la boucle
    };

    const startStreaming = () => {
        if (!mediaStream) {
            console.error("No media stream available.");
            return;
        }

        if (isStreaming) {
            console.warn("Already streaming.");
            return;
        }

        setIsStreaming(true);
        streamingRef.current = true; // Met à jour la référence pour indiquer que le streaming est actif

        const captureFrames = async () => {
            if (!streamingRef.current || !canvasRef.current || !videoRef.current) {
                console.warn("Stopping captureFrames because streaming is off.");
                return;
            }

            const canvas = canvasRef.current;
            const video = videoRef.current;
            const context = canvas.getContext("2d");

            if (context) {
                // Configure le canvas selon la taille de la vidéo
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Dessine la vidéo sur le canvas
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                // Convertit le canvas en Blob (image)
                canvas.toBlob(async (blob) => {
                    if (!blob) return;

                    // Prépare et envoie la requête au backend
                    const formData = new FormData();
                    formData.append("file", blob);

                    try {
                        // console.log("Uploading frame to backend...");
                        var res = fetch(getBaseUrl() + ":5000/get-alphabet", {
                            method: "POST",
                            body: formData,
                        })
                        res
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                if (data.message === response || data.message == response.toUpperCase()) {
                                    stopStreaming()
                                    goodAnswer();
                                }
                            })
                            .catch((err) => {
                                console.error("Error handling response:", err);
                            });
                        // console.log("Frame uploaded successfully.", resp.json());
                        // fetch(getBaseUrl() + ":5000/get-alphabet-end", {
                        //   method: "DELETE",
                        // })
                    } catch (err) {
                        console.error("Error uploading frame:", err);
                    }
                }, "image/jpeg");

                // Capture la prochaine frame après 100ms
                setTimeout(captureFrames, 1000 / 30);
            } else {
                console.warn("No context available for canvas.");
            }
        };

        captureFrames();
    };

    useEffect(() => {
        startCaptureProcess()
    }, []);

    return (
        <div className="tuto">
            <video ref={videoRef} autoPlay width={540} height={480} />
            <canvas ref={canvasRef} hidden />
            <button className="pushable"
                onClick={startStreaming}>
                <span className="front">
                    {isStreaming ? "Enregistrement en cours..." : "Démarrer l'enregistrement"}
                </span>
            </button>
        </div>
    );
};

export default VideoCaptureUploader;
