import { HandLandmarkerResult } from "@mediapipe/tasks-vision";

/** Options for customizing the drawing */
export interface DrawOptions {
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
export function drawHandLandmarkerResult(
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
