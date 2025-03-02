import React, { useState } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRef } from 'react';

import '$pages/Courses/Courses.css';


import { getBaseUrl, getBaseUrlWithPort } from '$utils/getBaseUrl';
import VideoFetcher from '$utils/VideoFetcher';
import SignRecognizer from "$utils/SignRecognizer"
import { HandLandmarker, DrawingUtils, HandLandmarkerResult } from '@mediapipe/tasks-vision';

import { DataSample } from "$utils/Datasample";
import { Data } from '@mediapipe/drawing_utils';

/** Options for customizing the drawing */
interface DrawOptions {
    pointColor?: string;
    pointSize?: number;
    lineColor?: string;
    lineWidth?: number;
  }

/**
 * Draws hand landmarks from Google’s HandLandmarkerResult on a canvas.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
 * @param {HandLandmarkerResult} result - HandLandmarker detection result.
 * @param {DrawOptions} options - Optional styling options.
 */
function drawHandLandmarkerResult(
  ctx: CanvasRenderingContext2D,
  result: HandLandmarkerResult,
  options: DrawOptions = {}
): void {
  if (!result.landmarks || result.landmarks.length === 0) return;

  // Default styling options
  const {
    pointColor = "red",
    pointSize = 5,
    lineColor = "blue",
    lineWidth = 2,
  } = options;

  // Hand landmark connections based on Google's Mediapipe Hand Model
  const HAND_CONNECTIONS: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
    [0, 5], [5, 6], [6, 7], [7, 8], // Index finger
    [0, 9], [9, 10], [10, 11], [11, 12], // Middle finger
    [0, 13], [13, 14], [14, 15], [15, 16], // Ring finger
    [0, 17], [17, 18], [18, 19], [19, 20], // Pinky finger
    [5, 9], [9, 13], [13, 17] // Palm connections
  ];

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.fillStyle = pointColor;

  // Loop through each detected hand in the result
  for (const landmarks of result.landmarks) {
    // Draw lines between hand landmarks
    ctx.beginPath();
    for (const [start, end] of HAND_CONNECTIONS) {
      const startLandmark = landmarks[start];
      const endLandmark = landmarks[end];

      if (startLandmark && endLandmark) {
        ctx.moveTo(startLandmark.x * ctx.canvas.width, startLandmark.y * ctx.canvas.height);
        ctx.lineTo(endLandmark.x * ctx.canvas.width, endLandmark.y * ctx.canvas.height);
      }
    }
    ctx.stroke();

    // Draw landmark points
    for (const { x, y } of landmarks) {
      ctx.beginPath();
      ctx.arc(x * ctx.canvas.width, y * ctx.canvas.height, pointSize, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}


function computeFrameDifference(prevFrame: ImageData, currentFrame: ImageData): number {
    let diff = 0;
    let step = Math.round(prevFrame.data.length / 100);
    for (let i = 0; i < prevFrame.data.length; i += step) {
        diff += Math.abs(prevFrame.data[i] - currentFrame.data[i]);     // Red
        diff += Math.abs(prevFrame.data[i + 1] - currentFrame.data[i + 1]); // Green
        diff += Math.abs(prevFrame.data[i + 2] - currentFrame.data[i + 2]); // Blue
    }
    return diff;
}


const Courses: React.FC = () => {
    const navigate = useNavigate();
    const webcamRef = React.useRef<Webcam>(null);

    const [step, setStep] = useState(1);

    const [borderClass, setBorderClass] = useState<string>('');


    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const videoFetcherRef = useRef<VideoFetcher | null>(null);
    const signRecognizerRef = useRef<SignRecognizer | null>(null);
    const [text, setText] = useState<string>('');


    useEffect(() => {
        // console.log("ta mère")
        videoFetcherRef.current = new VideoFetcher();
        signRecognizerRef.current = new SignRecognizer(getBaseUrl() + ":5000/get-sign-recognizer-model/alphabet", "$assets/models/hand_landmarker.task");
        let timings: Array<number> = [];
        let prevFrame: ImageData | null = null;
        let prevLandmark: HandLandmarkerResult | null = null;
        let datasample: DataSample = new DataSample("", []);
        let output_sign: number = -1;

        const drawToCanvas = async () => {
            let video: HTMLVideoElement | null = videoFetcherRef.current.getFrame();

            // console.log("video", video);


            if (video && canvasRef.current) {
                let start_time = performance.now();
                canvasRef.current.width = video.videoWidth;
                canvasRef.current.height = video.videoHeight;
                const ctx = canvasRef.current.getContext("2d");
                if (ctx) {
                    ctx.drawImage(video, 0, 0, canvasRef.current.width, canvasRef.current.height);

                    if (video.videoWidth > 0 && video.videoHeight > 0) {
                        const currentFrame: ImageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);

                        if (!prevFrame || computeFrameDifference(prevFrame, currentFrame) > 0) {
                            const landmark: HandLandmarkerResult | null = await signRecognizerRef.current.detectHands(video);
                            if (landmark) {
                                drawHandLandmarkerResult(ctx, landmark);
                                datasample.insertGestureFromLandmarks(0, landmark);
                                while (datasample.gestures.length > 15) {
                                    datasample.gestures.pop();
                                }
                                output_sign = await signRecognizerRef.current.recognizeSign(datasample);
                            }



                            prevLandmark = landmark;
                        } else if (prevLandmark) {
                            drawHandLandmarkerResult(ctx, prevLandmark);
                        }
                        prevFrame = currentFrame;
                    }
                }
                timings.push(performance.now() - start_time);
                while (timings.length > 60) {
                    timings.shift();
                }
                let average_time: number = timings.reduce((a, b) => a + b) / timings.length;
                setText("Framerate: " + Math.round(1000 / average_time) + "FPS" + " Average time: " + average_time.toFixed(2) + "ms" + " Output sign: " + output_sign);
                // console.log("Framerate: ", Math.round(1000 / (timings.reduce((a, b) => a + b) / timings.length)), "FPS", "Average time: ", average_time, "ms");
            }
            requestAnimationFrame(drawToCanvas);
        }

        drawToCanvas();
        return () => videoFetcherRef.current.stopCamera(); // Nettoyage du stream quand le composant se démonte
    }, []);

    const toggleCamera = async () => {
        if (videoFetcherRef.current) {
            await videoFetcherRef.current.toggleCamera();
        }
    };


    return (
        <div className="coursesJourneyPage">
            <div className='coursesJourney'>
                <main className={`bodyCourses ${borderClass}`}>
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

export default Courses;
