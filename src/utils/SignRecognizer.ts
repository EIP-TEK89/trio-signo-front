import * as ort from "onnxruntime-web";
import { HandLandmarker, FilesetResolver, NormalizedLandmark, DrawingUtils, HandLandmarkerResult } from "@mediapipe/tasks-vision";

import { FIELDS, FIELD_DIMENSION } from "$utils/gestures/Gestures";
import { ActiveGestures } from "./gestures/ActiveGestures";
import { DataSample } from "$utils/Datasample";

import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";

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

export default class SignRecognizer {
    public sign_recongnizer_config: ModelConfig | null = null;
    private session: ort.InferenceSession | null = null;
    private handLandmarker: HandLandmarker | null = null;

    constructor(onnxModelPath: string, handLandmarkerPath: string) {
        this.loadOnnxModel(onnxModelPath)
        this.loadHandLandmarker(handLandmarkerPath)
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
        console.log("JSON Config:", this.sign_recongnizer_config);
        console.log("Active Fields:", this.sign_recongnizer_config.active_gestures.getActiveFields());

        this.session = await ort.InferenceSession.create(modelUrl, {
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
        console.log("Hand Landmarker model loaded !");
    }

    async detectHands(elem: HTMLCanvasElement | HTMLImageElement | HTMLVideoElement): Promise<HandLandmarkerResult | null> {
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

        // let bestIndex: number = 0;
        // let bestValue = outputData[0];
        // for (let i = 1; i < outputTensor.output.data.length; i++) {
            //     if (outputTensor.output.data[i] > bestValue) {
                //         bestValue = outputTensor.output.data[i];
                //         bestIndex = i;
                //     }
                // }

        const probabilities = softmax(outputData);

        console.log(datasample.gestures[0], tensor)
        console.log("Output tensor:", outputData, probabilities);

        return probabilities.indexOf(Math.max(...probabilities));;
    }
}

function softmax(arr: Float32Array): Float32Array {
    const max = Math.max(...arr);
    const exp = arr.map(x => Math.exp(x - max));  // Avoid overflow
    const sum = exp.reduce((a, b) => a + b, 0);
    return new Float32Array(exp.map(x => x / sum));
}
