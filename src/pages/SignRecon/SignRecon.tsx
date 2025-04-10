import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { getBaseUrl } from '$utils/getBaseUrl';
import VideoFetcher from '$utils/VideoFetcher';
import SignRecognizer, { ModelsPredictions } from "$utils/SignRecognizer"
import { drawHandLandmarkerResult } from '$utils/DrawLandmark';

const SignRecon: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);


    // const [borderClass, setBorderClass] = useState<string>('');


    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const videoFetcherRef = useRef<VideoFetcher | null>(null);
    const signRecognizerRef = useRef<SignRecognizer | null>(null);
    const [text, setText] = useState<string>('');


    useEffect(() => {
        // Initialize camera, by default the camera is however not recording
        // so make sure to use .toggleCamera() or .startCamera() methods.
        videoFetcherRef.current = new VideoFetcher();

        // Initialize the sign recognizer model, as the model will not be stored
        // directly on the frontend, it will be fetched from the backend.
        // We do this to being able to dynamically load model depending of the lesson.
        signRecognizerRef.current = new SignRecognizer(getBaseUrl() + ":5000/get-sign-recognizer-model/alphabet");
        // This variable helps calculating framerate, so it is not necessary to keep it.
        let timings: Array<number> = [];
        let output_sign: string;

        const drawToCanvas = async () => {
            if (videoFetcherRef.current) {

                // Fetch the video element from the video fetcher containing the latest frame.
                // Keep in mind that you can call this method more times than camera
                // framerate, so it is not guaranteed that you will get a new frame,
                // but the last one fetched.
                let video: HTMLVideoElement | null = videoFetcherRef.current.getFrame();

                // If the video is fetched, the canvas is initialized and the sign recognizer is initialized
                if (video && canvasRef.current && signRecognizerRef.current) {
                    // Get the 2D rendering context of the canvas to draw the video frame
                    canvasRef.current.width = video.videoWidth;
                    canvasRef.current.height = video.videoHeight;
                    const ctx = canvasRef.current.getContext("2d");

                    if (ctx) {
                        // Draw the video frame on the canvas
                        ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

                        // Predict the sign from the video frame
                        // DO not forget to check ModelsPredictions type to see what is returned
                        const prediction_results: ModelsPredictions = signRecognizerRef.current.predict(video);

                        // If a hand is detected, draw the hand landmarks on the canvas
                        if (prediction_results.landmarks.hand) {
                            drawHandLandmarkerResult(ctx, prediction_results.landmarks.hand);
                        }

                        // Set output_sign with the detected sign
                        output_sign = prediction_results.signLabel;
                    }

                    // The next lines only calculate the framerate
                    const time_now: number = performance.now();
                    timings.push(time_now);
                    while (timings.length && timings[0] + 1000 < time_now) {
                        timings.shift();
                    }
                    const average_ms = timings.length ? (time_now - timings[0]) / timings.length : 0;
                    setText("Framerate: " + timings.length + "FPS" + " Average time: " + (average_ms).toFixed(2) + "ms" + " Output sign: " + output_sign);
                }
            }
            // Make sure to call this function again to keep the loop going
            requestAnimationFrame(drawToCanvas);
        }

        drawToCanvas();
    }, []);

    const toggleCamera = async () => {
        if (videoFetcherRef.current) {
            await videoFetcherRef.current.toggleCamera();
        }
    };


    return (
        <div className="coursesJourneyPage">
            <div className='coursesJourney'>
                <main>
                    <div className='tuto'>
                        <canvas ref={canvasRef}></canvas>
                        <button className='toogle camera' onClick={toggleCamera}>Toggle Camera</button>
                        <p className='text'>{text}</p>
                    </div>
                </main>
            </div >
        </div >
    );
};

export default SignRecon;
