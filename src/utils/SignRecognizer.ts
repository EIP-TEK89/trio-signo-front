import * as ort from "onnxruntime-web";
import { HandLandmarker, FilesetResolver, NormalizedLandmark, DrawingUtils, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import axios from "axios";

export default class SignRecognizer {
    private session: ort.InferenceSession | null = null;
    private handLandmarker: HandLandmarker | null = null;

    constructor(onnxModelPath: string, handLandmarkerPath: string) {
        this.loadOnnxModel(onnxModelPath)
        this.loadHandLandmarker(handLandmarkerPath)
    }

    /** Charger le modèle ONNX */
    async loadOnnxModel(path: string): Promise<void> {
        console.log("Loading ONNX model...");

        this.session = await ort.InferenceSession.create(path, {
            executionProviders: ['wasm'], // ✅ Ensure WebAssembly is used
          });
        console.log("ONNX model loaded !");
    }

    /** Charger le modèle MediaPipe Hand Landmarker */
    async loadHandLandmarker(path: string): Promise<void> {
        console.log("Loading Hand Landmarker model...");
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
          );
          this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
              delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2
          });
        console.log("Hand Landmarker model load !");
    }

    async detectHands(elem: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): Promise<HandLandmarkerResult | null> {
        if (!this.handLandmarker) {
            console.error("Hand Landmarker model is not loaded yet!");
            return null;
        }

        let startTimeMs = performance.now();
        return this.handLandmarker.detectForVideo(elem, startTimeMs);
    }





}
