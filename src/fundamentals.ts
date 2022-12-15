/**
 * @typedef {[number,number]} Vector2 Representation of 2D vectors and points.
 * @typedef {[number,number,number]} Vector3 Representation of 3D vectors and points.
 * @typedef {[number,number,number,number]} Vector4 Representation of 4D vectors and points.
 * @typedef {[number,number,number]} Axis Representation of an axis.
 * @typedef {[number,number,number]} EulerRotation Representation of rotation in euler angles.
 * @typedef {[number,number,number,number,number,number,number,number,number]} Matrix3 A standard 3x3 rotation matrix.
 * @typedef {[number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number]} Matrix4 A standard 4x4 transformation matrix.
 * @typedef {[number,number,number,number]} Quaternion Quaternions are used to represent rotations.
 */
/** Representation of 2D vectors and points. */
type Vector2 = [number,number];
/** Representation of 3D vectors and points. */
type Vector3 = [number,number,number];
/** Representation of 4D vectors and points. */
type Vector4 = [number,number,number,number];
/** Representation of an axis. */
type Axis = [number,number,number];
/** Representation of rotation in euler angles. */
type EulerRotation = [number,number,number];
/** A standard 3x3 rotation matrix. */
type Matrix3 = [number,number,number,number,number,number,number,number,number];
/** A standard 4x4 transformation matrix. */
type Matrix4 = [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number];
/** Quaternions are used to represent rotations.  1*/
type Quaternion = [number,number,number,number];

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
Utils.factorial = (n:number) => {
    let sum=1;
    while (n > 0) {
        sum *= n;
        n--
    }
    return sum
}
/**
 * Clamps a value between min and max.
 * @param {number} v value. 
 * @param {number} m min value. 
 * @param {number} M max value. 
 * @returns {number}
 */
Utils.clamp = (v:number, m:number, M:number) => Math.max(m, Math.min(v, M));
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value (clamped between 0 and 1). 
 * @returns {number}
 */
Utils.lerp = (a:number, b:number, t:number) => { t=Utils.clamp(t,0,1); return a*(1-t)+b*t };
/**
 * Linearly interpolates between A and B by t.
 * @param {number} a value A.
 * @param {number} b value B.
 * @param {number} t blend value. 
 * @returns {number}
 */
Utils.lerpUnclamped = (a:number, b:number, t:number) => a*(1-t)+b*t;
/** Constant for easy conversion from degrees to radians. */
Utils.deg2rad = 1/180*Math.PI;
/** Constant for easy conversion from radians to degrees. */
Utils.rad2deg = 1/Math.PI*180;
Object.freeze(Utils);