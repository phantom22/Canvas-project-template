/**
 * @module
 * A module that contains fundamental math functions.
 */
const Utils = () => void 0;
/**
 * Returns the factorial of a number.
 * @param {number} n number
 * @returns {number}
 */
Utils.factorial = (n) => {
    let sum = 1;
    while (n > 0) {
        sum *= n;
        n--;
    }
    return sum;
};
/**
 * Clamps a value between min and max.
 * @param {number} v value.
 * @param {number} m min value.
 * @param {number} M max value.
 * @returns {number}
 */
Utils.clamp = (v, m, M) => Math.max(m, Math.min(v, M));
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value (clamped between 0 and 1).
 * @returns {number}
 */
Utils.lerp = (a, b, t) => { t = Utils.clamp(t, 0, 1); return a * (1 - t) + b * t; };
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value.
 * @returns {number}
 */
Utils.lerpUnclamped = (a, b, t) => a * (1 - t) + b * t;
/** Constant for easy conversion from degrees to radians. */
Utils.deg2rad = 1 / 180 * Math.PI;
/** Constant for easy conversion from radians to degrees. */
Utils.rad2deg = 1 / Math.PI * 180;
Object.freeze(Utils);
/**
 * @module
 * Creates A 2D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @returns {Vector2}
 */
const Vec2 = (x = 0, y = 0) => [x, y];
/**
 * Returns a formatted string for a given vector.
 * @param {Vector2} V vector2.
 * @returns {string}
 */
Vec2.toString = (V) => `Vector2(${V[0]},${V[1]})`;
/** Shorthand for writing Vec2(0, 1). */
Vec2.up = [0, 1];
Object.freeze(Vec2.up);
/** Shorthand for writing Vec2(0, -1). */
Vec2.down = [0, -1];
Object.freeze(Vec2.down);
/** Shorthand for writing Vec2(-1, 0). */
Vec2.left = [-1, 0];
Object.freeze(Vec2.left);
/** Shorthand for writing Vec2(1, 0). */
Vec2.right = [1, 0];
Object.freeze(Vec2.right);
/** Shorthand for writing Vec2(1, 1). */
Vec2.one = [1, 1];
Object.freeze(Vec2.one);
/** Shorthand for writing Vec2(0, 0). */
Vec2.zero = [0, 0];
Object.freeze(Vec2.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.equals = (A, B) => A === B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.compare = (A, B) => A[0] === B[0] && A[1] === B[1];
/**
 * Returns true if any of the given vector components is not A number.
 * @param {Vector2} V vector2.
 * @returns {boolean}
 */
Vec2.isNaN = (V) => V[0] !== V[0] || V[1] !== V[1];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector2} V vector2.
 * @param {number} [d=0] default value.
 * @returns {Vector2}
 */
Vec2.repair = (V, d = 0) => [V[0] || d, V[1] || d];
/**
 * Adds two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector2}
 */
Vec2.add = (A, B) => [A[0] + B[0], A[1] + B[1]];
/**
 * Subtracts one vector from another.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector2}
 */
Vec2.sub = (A, B) => [A[0] - B[0], A[1] - B[1]];
/**
 * Multiplies a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.mul = (V, s) => [V[0] * s, V[1] * s];
/**
 * Dot Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.dot = (A, B) => A[0] * B[0] + A[1] * B[1];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.scale = (A, B) => [A[0] * B[0], A[1] * B[1]];
/**
 * Divides a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.div = (V, s) => { const t = 1 / s; return [V[0] * t, V[1] * t]; };
/**
 * Returns the length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.magnitude = (V) => (V[0] ** 2 + V[1] ** 2) ** (1 / 2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.sqrMagnitude = (V) => V[0] ** 2 + V[1] ** 2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.normalize = (V) => { const t = 1 / Vec2.magnitude(V); return [V[0] * t, V[1] * t]; };
/**
 * Returns the distance between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.distance = (A, B) => ((A[0] - B[0]) ** 2 + (A[1] - B[1]) ** 2) ** (1 / 2);
/**
 * Cross Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {Vector3}
 */
Vec2.cross = (A, B) => [0, 0, -A[0] * B[1] + A[1] * B[0]];
/**
 * Gets the unsigned angle in radians between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {number}
 */
Vec2.angle = (A, B) => Math.acos(Vec2.dot(A, B) / (Vec2.magnitude(A) * Vec2.magnitude(B)));
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector2} V vector2.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @returns {Vector2}
 */
Vec2.clamp = (V, x, y) => [Utils.clamp(V[0], ...x), Utils.clamp(V[1], ...y)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector2} V vector2.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector2}
 */
Vec2.simpleClamp = (V, min, max) => [Utils.clamp(V[0], min, max), Utils.clamp(V[1], min, max)];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.max = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] > o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] > o[1] ? V[i][1] : o[1];
} return o; };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.min = (...V) => { let o = V[0]; for (let i = 0; i < V.length; i++) {
    o[0] = V[i][0] < o[0] ? V[i][0] : o[0];
    o[1] = V[i][1] < o[1] ? V[i][1] : o[1];
} return o; };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector2}
 */
Vec2.lerp = (A, B, t) => [Utils.lerp(A[0], B[0], t), Utils.lerp(A[1], B[1], t)];
/**
 * Converts a Vector2 to Vector3.
 * @param {Vector2} V vector2.
 * @returns {Vector3}
 */
Vec2.toVec3 = (V) => [...V, 0];
/**
 * Converts a Vector2 to Vector4.
 * @param {Vector2} V vector2.
 * @returns {Vector4}
 */
Vec2.toVec4 = (V) => [...V, 0, 0];
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.round = (V) => [Math.round(V[0]), Math.round(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.floor = (V) => [Math.floor(V[0]), Math.floor(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.ceil = (V) => [Math.ceil(V[0]), Math.ceil(V[1])];
/**
 * Returns a copy of the vector with all of its components converted to their absolute values.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.abs = (V) => [Math.abs(V[0]), Math.abs(V[1])];
Object.freeze(Vec2);
class CanvasManager {
    /** Has the window been resized? If so, this flag will be set to true. */
    static resizeEvent = false;
    /** How many frames after the page loads should the fps detector wait? Default=5 */
    static waitFrames = 5;
    /** Number of taken sample timestamps required for the fps detection. Default=10 */
    static fpsSamples = 10;
    /** Very small number that helps preventing wrong fps detection. Default=0.004973808593749851 */
    static fpsCalculationEpsilon = 0.004973808593749851;
    /** Detected refreshRate. Needs to be calculated only one time. Read-only. */
    static refreshRate;
    /** Is the current device a mobile phone? Needed for performance tweaks. Read-only. */
    static isRunOnPhone = (function (a) {
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
    })(navigator.userAgent || navigator.vendor || window.opera);
    /** Max frames per second. Read-only.*/
    fps;
    /** Ideal time between two frames. Read-only. */
    fixedDeltaTime;
    /** Time took to render previous frame. */
    deltaTime;
    /** If true the canvas won't update (image and calculations paused). */
    isPaused = true;
    /** Canvas targeted by this class. */
    #canvas;
    /** Rendering context 2d of the targeted canvas. */
    #ctx;
    /** Should the targeted canvas width and height be adapted to clientWidth and clientHeight on window resize? */
    autoAdaptResolution;
    physicsIntervalId;
    renderIntervalId;
    /** Array that contains all the objects to render. */
    objects;
    constructor(id, objects = [], settings) {
        const c = document.getElementById(id);
        if (c instanceof HTMLCanvasElement) {
            this.#canvas = c;
            this.#ctx = c.getContext("2d");
            this.objects = objects;
            this.#applySettings(settings);
            this.#init().then(v => this.#start(v));
        }
        else
            throw `Couldn't find canvas with id '${id}'`;
    }
    #applySettings({ autoAdaptResolution } = { autoAdaptResolution: false }) {
        this.autoAdaptResolution = autoAdaptResolution;
    }
    /** Method used to detect screen refresh rate. If refresh rate was already calculated => resolve with that value */
    #init() {
        return new Promise(resolve => {
            if (CanvasManager.refreshRate !== undefined) {
                resolve(CanvasManager.refreshRate);
                return;
            }
            /** timestamps[0] is the start of the elapsed time; timestamps[i] (with 0<i<fpsSamples+1) is where all the sample fps timestamps are. */
            const timestamps = [];
            let id, framesToWait = CanvasManager.waitFrames;
            function frameStep(timestamp) {
                if (framesToWait > 0) {
                    framesToWait--;
                    if (framesToWait === 0)
                        timestamps.push(timestamp);
                }
                else if (timestamps.length - 1 < CanvasManager.fpsSamples) {
                    timestamps.push(timestamp);
                }
                else {
                    const avg = timestamps
                        .map((v, i) => v - timestamps[i - 1]) // calc deltaTime between each timestamp
                        .slice(1) // remove timestamps[0] which is non relevant to the calculation
                        .reduce((a, b) => a + b) / (timestamps.length - 1) - CanvasManager.fpsCalculationEpsilon * 2; // divide the sum of the deltas by the sampleCount
                    let o;
                    if (avg <= 2.777778)
                        o = 360;
                    else if (avg <= 4.166667)
                        o = 240;
                    else if (avg <= 6.060606)
                        o = 165;
                    else if (avg <= 6.944444)
                        o = 144;
                    else if (avg <= 8.333333)
                        o = 120;
                    else if (avg <= 11.111111)
                        o = 90;
                    else if (avg <= 13.333333)
                        o = 75;
                    else if (avg <= 16.666667)
                        o = 60;
                    else if (avg <= 33.333333)
                        o = 30;
                    else
                        o = Math.floor(1000 / avg);
                    Object.defineProperty(CanvasManager, "refreshRate", { value: o, writable: false });
                    cancelAnimationFrame(id);
                    resolve(o);
                    return;
                }
                id = requestAnimationFrame(frameStep);
            }
            id = requestAnimationFrame(frameStep);
        });
    }
    #start(fps) {
        Object.defineProperty(this, "fps", { value: fps, writable: false });
        Object.defineProperty(this, "fixedDeltaTime", { value: 1 / fps, writable: false });
        CanvasManager.resizeEvent = false;
        this.isPaused = false;
        this.physicsIntervalId = setInterval(this.fixedPhysicsStep.bind(this), this.fixedDeltaTime);
        this.renderIntervalId = requestAnimationFrame(this.renderFrame.bind(this));
    }
    fixedPhysicsStep() {
        // do something
    }
    /** Works only if adaptResolution is set to true. Resets CanvasManager.resizeEvent to false after adapting canvas resolution to window resolution. */
    adaptResolution() {
        if (this.adaptResolution && CanvasManager.resizeEvent) {
            this.#canvas.width = window.innerWidth;
            this.#canvas.height = window.innerHeight;
            CanvasManager.resizeEvent = false;
        }
    }
    renderFrame(currFrame, prevFrame) {
        this.adaptResolution();
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        if (!this.isPaused || !prevFrame) {
            this.deltaTime = (currFrame - prevFrame) * 0.001;
            this.drawObjects();
        }
        this.renderIntervalId = requestAnimationFrame(nextFrame => this.renderFrame.call(this, nextFrame, currFrame));
    }
    drawObjects() {
        const ctx = this.#ctx;
        for (let i = 0; i < this.objects.length; i++) {
            // do something
        }
    }
}
Object.defineProperty(CanvasManager, "isRunOnPhone", { writable: false });
window.addEventListener("resize", () => CanvasManager.resizeEvent = true);
