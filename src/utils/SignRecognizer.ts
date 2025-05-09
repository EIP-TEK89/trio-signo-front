import * as ort from "onnxruntime-web";
import { HandLandmarker, FilesetResolver, HandLandmarkerResult } from "@mediapipe/tasks-vision";

import { FIELDS, FIELD_DIMENSION } from "$utils/gestures/Gestures";
import { ActiveGestures } from "./gestures/ActiveGestures";
import { DataSample } from "$utils/Datasample";

import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";
import { Clock } from "$utils/Clock";

export interface ModelConfig {
    labels: string[];
    label_explicit: string[];
    memory_frame: number;
    active_gestures: ActiveGestures;
    label_map: { [key: string]: number };
    one_side: boolean;
    name: string;
    d_model: number;
    num_heads: number;
    num_layers: number;
    ff_dim: number;
}

// This where all tracking will be stored in the future
export interface LandmarkData {
    hand: HandLandmarkerResult | null;
    // body: BodyLandmarkerResult | null;
    // face: FaceLandmarkerResult | null;
}

export interface ModelsPredictions {
    signId: number;
    signLabel: string; // Where you can get the name of the recognized sign
    landmarks: LandmarkData;
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

function ModelConfigFromJson(json: any): ModelConfig {
    return {
        labels: json.labels,
        label_explicit: json.label_explicit,
        memory_frame: json.memory_frame,
        active_gestures: new ActiveGestures(json.active_gestures),
        label_map: json.label_map,
        one_side: json.one_side,
        name: json.name,
        d_model: json.d_model,
        num_heads: json.num_heads,
        num_layers: json.num_layers,
        ff_dim: json.ff_dim,
    };
}

const HANDLANDMARKER_MODEL_PATH: string = `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`

export default class SignRecognizer {
    public sign_recongnizer_config: ModelConfig | null = null;
    private session: ort.InferenceSession | null = null;

    private isPredicting: boolean = false;
    private lastPrediction: ModelsPredictions;
    private datasample: DataSample = new DataSample("test", []);
    private prevFrame: ImageData | null = null;
    private canvas: HTMLCanvasElement = document.createElement("canvas");
    private clock: Clock = new Clock(30);

    // Handlandmarker variables
    private handLandmarker: HandLandmarker | null = null;


    constructor(onnxModelPath: string, handLandmarkerPath: string = HANDLANDMARKER_MODEL_PATH) {
        this.loadOnnxModel(onnxModelPath)
        this.loadHandLandmarker(handLandmarkerPath)

        this.lastPrediction = {
            signId: -1,
            signLabel: "Null",
            landmarks: {
                hand: null
            }
        };
    }

    /** Charger le modèle ONNX */
    async loadOnnxModel(path: string): Promise<void> {
        console.log("Loading ONNX model...");

        const response: AxiosResponse = await axios.get(path, { responseType: "arraybuffer" });

        const zip = await JSZip.loadAsync(response.data);
        let onnxFileBlob: Blob | null = null;
        let jsonFileText: string | null = null;

        // Iterate over files in the ZIP
        for (const filename of Object.keys(zip.files)) {
            if (filename.endsWith(".onnx")) {
                const onnxFile: JSZip.JSZipObject | null = zip.file(filename)
                if (onnxFile)
                    onnxFileBlob = await onnxFile.async("blob");
            }
            if (filename.endsWith(".json")) {
                const jsonFile: JSZip.JSZipObject | null = zip.file(filename)
                if (jsonFile)
                    jsonFileText = await jsonFile.async("text");
            }
        }

        // Handle missing files
        if (!onnxFileBlob) throw new Error("No .onnx file found in ZIP.");
        if (!jsonFileText) throw new Error("No .json file found in ZIP.");

        // Convert ONNX blob to URL for ONNX Runtime Web
        const modelUrl = URL.createObjectURL(onnxFileBlob);

        // Parse JSON metadata
        this.sign_recongnizer_config = ModelConfigFromJson(JSON.parse(jsonFileText));

        // console.log("ONNX Model URL:", modelUrl);
        // console.log("JSON Config:", this.sign_recongnizer_config);
        // console.log("Active Fields:", this.sign_recongnizer_config.active_gestures.getActiveFields());

        this.session = await ort.InferenceSession.create(modelUrl, {
            executionProviders: ['wasm'], // ✅ Ensure WebAssembly is used
        });
        console.log("ONNX model loaded !");
    }

    async loadHandLandmarker(path: string): Promise<void> {
        console.log("Loading Hand Landmarker model...");
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        this.handLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: path,
                delegate: "GPU"
            },
            runningMode: "VIDEO",
            numHands: 2
        });
        console.log("Hand Landmarker model loaded !");
    }

    async predictAsync(elem: HTMLVideoElement, lazy: boolean = true): Promise<ModelsPredictions> {

        if (this.isPredicting || elem.videoHeight === 0 || elem.videoWidth === 0) {
            return this.lastPrediction
        }
        this.isPredicting = true;
        if (lazy && this.canvas) {
            this.canvas.width = elem.videoWidth;
            this.canvas.height = elem.videoHeight;
            const ctx = this.canvas.getContext("2d");
            if (!ctx || this.canvas.height === 0 || this.canvas.width === 0) {
                this.isPredicting = false;
                return this.lastPrediction;
            }
            ctx.drawImage(elem, 0, 0, this.canvas.width, this.canvas.height);
            const currentFrame: ImageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

            if (this.prevFrame && computeFrameDifference(this.prevFrame, currentFrame) === 0) {
                this.isPredicting = false;
                return this.lastPrediction;
            }
            this.prevFrame = currentFrame;
        }
        const handlandmark: HandLandmarkerResult | null = await this.detectHands(elem);

        this.lastPrediction.landmarks.hand = handlandmark;
        if (this.clock.isTimeToRun()) {
            if (handlandmark) {
                this.datasample.insertGestureFromLandmarks(0, handlandmark);
                if (!this.sign_recongnizer_config) {
                    console.error("Sign recognizer config is not loaded yet!");
                    this.isPredicting = false;
                    return this.lastPrediction;
                }
                while (this.datasample.gestures.length > this.sign_recongnizer_config.memory_frame) {
                    this.datasample.gestures.pop();
                }
                this.lastPrediction.signId = await this.recognizeSign(this.datasample);
                this.lastPrediction.signLabel = this.sign_recongnizer_config.labels[this.lastPrediction.signId];
            } else {
                this.lastPrediction.signId = -1;
                this.lastPrediction.signLabel = "Null";
            }
        }
        this.isPredicting = false;
        return this.lastPrediction;
    }

    /**
     *
     * @param elem Video element where the sign to recognize is
     * @param lazy Optimize the prediction by skipping similar frames, I recommend to set it false only if you want to debug
     * @returns
     */
    predict(elem: HTMLVideoElement, lazy: boolean = true): ModelsPredictions {
        if (!this.isPredicting) {
            this.predictAsync(elem, lazy);
        }
        return this.lastPrediction;
    }

    async detectHands(elem: HTMLVideoElement): Promise<HandLandmarkerResult | null> {
        if (!this.handLandmarker) {
            console.error("Hand Landmarker model is not loaded yet!");
            return null;
        }

        let startTimeMs = performance.now();
        return this.handLandmarker.detectForVideo(elem, startTimeMs);
    }

    async recognizeSign(datasample: DataSample): Promise<number> {
        if (!this.session) {
            console.error("ONNX model is not loaded yet!");
            return -1;
        }
        if (!this.sign_recongnizer_config) {
            console.error("Sign recognizer config is not loaded yet!");
            return -1;
        }

        if (this.sign_recongnizer_config.one_side) {
            datasample.moveToOneSide();
        }

        const tensor: ort.Tensor = datasample.toTensor(this.sign_recongnizer_config.memory_frame, this.sign_recongnizer_config.active_gestures.getActiveFields());
        // console.log("Tensor shape:", tensor.dims, typeof tensor);
        const inputName = this.session.inputNames[0];

        // Create the correct 'feeds' object
        const feeds = { [inputName]: tensor };

        // Run the model
        const outputTensor: ort.InferenceSession.ReturnType = await this.session.run(feeds);
        // console.log("Output tensor:", outputTensor);

        const outputName = this.session.outputNames[0];  // Get the output name dynamically
        const outputData = outputTensor[outputName].data;

        const probabilities = softmax(outputData);

        // console.log(datasample.gestures[0], tensor)
        // console.log("Output tensor:", outputData, probabilities);

        return probabilities.indexOf(Math.max(...probabilities));;
    }
}

function softmax(arr: Float32Array): Float32Array {
    const max = Math.max(...arr);
    const exp = arr.map(x => Math.exp(x - max));  // Avoid overflow
    const sum = exp.reduce((a, b) => a + b, 0);
    return new Float32Array(exp.map(x => x / sum));
}
