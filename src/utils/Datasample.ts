import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import * as ort from "onnxruntime-web";

import { FIELDS, FIELD_DIMENSION } from "$utils/gestures/Gestures";
import { DataGestures } from "$utils/gestures/DataGestures";

export class DataSample {
    label: string;
    gestures: DataGestures[];
    framerate: number = 30;
    mirrorable: boolean = true;
    invalid: boolean = false;

    constructor(label: string, gestures: DataGestures[], framerate?: number, mirrorable?: boolean) {
        this.label = label;
        this.gestures = gestures;
        if (framerate !== undefined) this.framerate = framerate;
        if (mirrorable !== undefined) this.mirrorable = mirrorable;
        this.computeHandVelocity();
    }

    // static fromDict(jsonData: any): DataSample {
    //   const gestures = jsonData.gestures.map((gesture: any) => new DataGestures(gesture));
    //   return new DataSample(jsonData.label, gestures, jsonData.framerate, jsonData.mirrorable);
    // }

    // static fromJsonFile(filePath: string): Promise<DataSample> {
    //   return fetch(filePath)
    //     .then(response => response.json())
    //     .then(data => DataSample.fromDict(data));
    // }

    static unflat(label: string, rawData: number[], validFields?: string[]): DataSample {
        const gestures: DataGestures[] = [];
        const lenValidFields = (validFields ? validFields.length : FIELDS.length) * FIELD_DIMENSION;

        for (let i = 0; i < rawData.length; i += lenValidFields) {
            gestures.push(DataGestures.from1DArray(rawData.slice(i, i + lenValidFields), validFields));
        }

        return new DataSample(label, gestures);
    }

    // toDict(): any {
    //   return {
    //     label: this.label,
    //     gestures: this.gestures.map(gesture => gesture.toDict()),
    //     framerate: this.framerate,
    //     mirrorable: this.mirrorable
    //   };
    // }

    // async toJsonFile(filePath: string, indent: boolean = false): Promise<void> {
    //   const data = JSON.stringify(this.toDict(), null, indent ? 2 : 0);
    //   const blob = new Blob([data], { type: "application/json" });
    //   const url = URL.createObjectURL(blob);
    //   const a = document.createElement("a");
    //   a.href = url;
    //   a.download = filePath;
    //   document.body.appendChild(a);
    //   a.click();
    //   document.body.removeChild(a);
    // }

    flat(validFields?: string[]): number[] {
        return this.gestures.flatMap(gesture => gesture.get1DArray(validFields));
    }

    insertGestureFromLandmarks(position: number, handLandmarks: HandLandmarkerResult): DataSample {
        this.gestures.splice(position, 0, DataGestures.buildFromHandLandmarkerResult(handLandmarks));
        this.computeHandVelocity();
        return this;
    }

    samplesTo1DArray(validFields?: string[]): number[] {
        return this.gestures.flatMap(gesture => gesture.get1DArray(validFields));
    }

    setNonePointsRandomlyToRandomOrZero(proba: number = 0.1): DataSample {
        this.gestures.forEach(gesture => gesture.setNonePointsRandomlyToRandomOrZero(proba));
        return this;
    }

    computeHandVelocity(): DataSample {
        for (let i = 0; i < this.gestures.length - 1; i++) {
            if (this.gestures[i].r_hand_position && this.gestures[i + 1].r_hand_position) {
                this.gestures[i].r_hand_velocity = this.gestures[i].r_hand_position.map(
                    (val, k) => val - this.gestures[i + 1].r_hand_position![k]
                );
            }
            if (this.gestures[i].l_hand_position && this.gestures[i + 1].l_hand_position) {
                this.gestures[i].l_hand_velocity = this.gestures[i].l_hand_position.map(
                    (val, k) => val - this.gestures[i + 1].l_hand_position![k]
                );
            }
        }
        return this;
    }

    noiseSample(range: number = 0.004, validFields?: string[]): DataSample {
        this.gestures.forEach(gesture => gesture.noise(range, validFields));
        return this;
    }

    mirrorSample(x: boolean = true, y: boolean = false, z: boolean = false): DataSample {
        this.gestures.forEach(gesture => gesture.mirror(x, y, z));
        return this;
    }

    rotateSample(x: number = 0, y: number = 0, z: number = 0, validFields?: string[]): DataSample {
        this.gestures.forEach(gesture => gesture.rotate(x, y, z, validFields));
        return this;
    }

    scaleSample(x: number = 1, y: number = 1, z: number = 1, validFields?: string[]): DataSample {
        this.gestures.forEach(gesture => gesture.scale(x, y, z, validFields));
        return this;
    }

    translateSample(x: number = 0, y: number = 0, z: number = 0, validFields?: string[]): DataSample {
        this.gestures.forEach(gesture => gesture.translate(x, y, z, validFields));
        return this;
    }

    reframe(targetFrame: number): DataSample {
        if (targetFrame <= 1) {
            throw new Error("Target frame must be greater than 1");
        }

        const listLerp = (a: [number, number, number] | null, b: [number, number, number] | null, t: number) => {
            if (!a || !b) return null;
            return a.map((val, i) => val + (b[i] - val) * t) as [number, number, number];
        };

        const newGestures: DataGestures[] = [];

        for (let i = 0; i < targetFrame; i++) {
            const progression = i / (targetFrame - 1);
            const frameScaledValue = Math.min(progression * (this.gestures.length - 1), this.gestures.length - 1);
            const startFrame = Math.floor(frameScaledValue);
            const endFrame = Math.ceil(frameScaledValue);
            const interpolationCoef = frameScaledValue - startFrame;

            const newGesture = new DataGestures();

            FIELDS.forEach(field => {
                (newGesture as any)[field] = listLerp(
                    (this.gestures[startFrame] as any)[field],
                    (this.gestures[endFrame] as any)[field],
                    interpolationCoef
                );
            });

            newGestures.push(newGesture);
        }

        this.gestures = newGestures;
        this.computeHandVelocity();
        return this;
    }

    setSampleGesturesPointTo(pointFieldName: string, value: [number, number, number]): DataSample {
        this.gestures.forEach(gesture => {
            (gesture as any)[pointFieldName] = value;
        });
        return this;
    }

    swapHands(): DataSample {
        this.gestures.forEach(gesture => gesture.swapHands());
        return this;
    }

    moveToOneSide(rightSide: boolean = true): DataSample {
        this.gestures.forEach(gesture => gesture.moveToOneSide(rightSide));
        return this;
    }

    /**
   * Converts the sample gestures into an `ort.Tensor` for ONNX inference.
   * @param sequenceLength Number of frames to include in the tensor.
   * @param validFields List of valid fields to extract from gestures.
   * @returns `ort.Tensor` (ONNX Runtime)
   */
    toTensor(sequenceLength: number, validFields: string[] = FIELDS): ort.Tensor {
        const fieldCount = validFields.length * FIELD_DIMENSION;

        // Initialize a Float32Array for ONNX Tensor storage
        const data = new Float32Array(sequenceLength * fieldCount);

        for (let i = 0; i < Math.min(sequenceLength, this.gestures.length); i++) {
            const frameData = this.gestures[i].get1DArray(validFields);

            // Insert frame data into the main tensor array
            data.set(frameData, i * fieldCount);
        }

        // ONNX Tensors require an explicit shape definition
        const tensorShape = [sequenceLength, fieldCount];

        return new ort.Tensor("float32", data, tensorShape);
    }
}
