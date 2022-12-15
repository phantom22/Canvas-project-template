/**
 * @module 
 * Creates A 2D vector.
 * @param {number} x first component.
 * @param {number} y second component.
 * @returns {Vector2}
 */
const Vec2 = (x=0,y=0): Vector2 => [x,y];
/**
 * Returns a formatted string for a given vector.
 * @param {Vector2} V vector2.
 * @returns {string}
 */
Vec2.toString = (V:Vector2) => `Vector2(${V[0]},${V[1]})`;
/** Shorthand for writing Vec2(0, 1). */
Vec2.up = <Vector2>[0,1];
Object.freeze(Vec2.up);
/** Shorthand for writing Vec2(0, -1). */
Vec2.down = <Vector2>[0,-1];
Object.freeze(Vec2.down);
/** Shorthand for writing Vec2(-1, 0). */
Vec2.left = <Vector2>[-1,0];
Object.freeze(Vec2.left);
/** Shorthand for writing Vec2(1, 0). */
Vec2.right = <Vector2>[1,0];
Object.freeze(Vec2.right);
/** Shorthand for writing Vec2(1, 1). */
Vec2.one = <Vector2>[1,1];
Object.freeze(Vec2.one);
/** Shorthand for writing Vec2(0, 0). */
Vec2.zero = <Vector2>[0,0];
Object.freeze(Vec2.zero);
/**
 * Returns true if two vectors are exactly equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.equals = (A:Vector2, B:Vector2) => A===B;
/**
 * Returns true if two vectors are approximately equal.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @returns {boolean}
 */
Vec2.compare = (A:Vector2, B:Vector2) => A[0]===B[0] && A[1]===B[1];
/**
 * Returns true if any of the given vector components is not A number. 
 * @param {Vector2} V vector2.
 * @returns {boolean}
 */
Vec2.isNaN = (V:Vector2) => V[0]!==V[0] || V[1]!==V[1];
/**
 * Returns a copy of a given vector with all its NANS replaced by a default value.
 * @param {Vector2} V vector2.
 * @param {number} [d=0] default value.
 * @returns {Vector2}
 */
Vec2.repair = (V:Vector2, d=0): Vector2 => [V[0]||d, V[1]||d];
/**
 * Adds two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {Vector2}
 */
Vec2.add = (A:Vector2, B:Vector2): Vector2 => [A[0]+B[0], A[1]+B[1]];
/**
 * Subtracts one vector from another.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {Vector2}
 */
Vec2.sub = (A:Vector2, B:Vector2): Vector2 => [A[0]-B[0], A[1]-B[1]];
/**
 * Multiplies a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar. 
 * @returns {Vector2}
 */
Vec2.mul = (V:Vector2, s:number): Vector2 => [V[0]*s, V[1]*s];
/**
 * Dot Product of two vectors.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {number}
 */
Vec2.dot = (A:Vector2, B:Vector2) => A[0]*B[0]+A[1]*B[1];
/**
 * Multiplies two vectors component-wise.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {number}
 */
Vec2.scale = (A:Vector2, B:Vector2): Vector2 => [A[0]*B[0],A[1]*B[1]];
/**
 * Divides a vector by a number.
 * @param {Vector2} V vector2.
 * @param {number} s scalar.
 * @returns {Vector2}
 */
Vec2.div = (V:Vector2, s:number): Vector2 => { const t=1/s; return [V[0]*t, V[1]*t] };
/**
 * Returns the length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.magnitude = (V:Vector2) => (V[0]**2+V[1]**2)**(1/2);
/**
 * Returns the squared length of a given vector.
 * @param {Vector2} V vector2.
 * @returns {number}
 */
Vec2.sqrMagnitude = (V:Vector2) => V[0]**2+V[1]**2;
/**
 * Returns the given vector with a magnitude of 1.
 * @param {Vector2} V vector2.
 * @returns {Vector2}
 */
Vec2.normalize = (V:Vector2): Vector2 => { const t=1/Vec2.magnitude(V); return [V[0]*t, V[1]*t] };
/**
 * Returns the distance between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {number}
 */
Vec2.distance = (A:Vector2, B:Vector2) => ((A[0]-B[0])**2 + (A[1]-B[1])**2)**(1/2);
/**
 * Cross Product of two vectors.
 * @param {Vector2} A vector2 A. 
 * @param {Vector2} B vector2 B. 
 * @returns {Vector3}
 */
Vec2.cross = (A:Vector2, B:Vector2): Vector3 => [0, 0, -A[0]*B[1]+A[1]*B[0]];
/**
 * Gets the unsigned angle in radians between A and B.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B. 
 * @returns {number}
 */
Vec2.angle = (A:Vector2, B:Vector2) => Math.acos(Vec2.dot(A,B) / (Vec2.magnitude(A) * Vec2.magnitude(B)))
/**
 * Returns a copy of a given vector with its components clamped to their respective constraints.
 * @param {Vector2} V vector2.
 * @param {Vector2} x min and max for the x component.
 * @param {Vector2} y min and max for the y component.
 * @returns {Vector2}
 */
Vec2.clamp = (V:Vector2, x:Vector2, y:Vector2): Vector2 => [Utils.clamp(V[0],...x), Utils.clamp(V[1],...y)];
/**
 * Returns a copy of a given vector with its components clamped between min and max.
 * @param {Vector2} V vector2.
 * @param {number} min min value for both components.
 * @param {number} max max value for both components.
 * @returns {Vector2}
 */
Vec2.simpleClamp = (V:Vector2, min:number, max:number): Vector2 => [Utils.clamp(V[0],min,max), Utils.clamp(V[1],min,max)];
/**
 * Returns a vector that is made from the largest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.max = (...V:Vector2[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]>o[0]?V[i][0]:o[0]; o[1]=V[i][1]>o[1]?V[i][1]:o[1] } return o };
/**
 * Returns a vector that is made from the smallest components of all the passed vectors.
 * @param {Vector2[]} V 2d vectors.
 * @returns {Vector2}
 */
Vec2.min = (...V:Vector2[]) => { let o=V[0]; for (let i=0;i<V.length;i++) { o[0]=V[i][0]<o[0]?V[i][0]:o[0]; o[1]=V[i][1]<o[1]?V[i][1]:o[1] } return o };
/**
 * Linearly interpolates between vectors A and B by t.
 * @param {Vector2} A vector2 A.
 * @param {Vector2} B vector2 B.
 * @param {number} t blend value between 0 and 1.
 * @returns {Vector2}
 */
Vec2.lerp = (A:Vector2, B:Vector2, t:number): Vector2 => [Utils.lerp(A[0],B[0],t), Utils.lerp(A[1],B[1],t)];
/**
 * Converts a Vector2 to Vector3.
 * @param {Vector2} V vector2.
 * @returns {Vector3}
 */
Vec2.toVec3 = (V:Vector2): Vector3 => [...V,0];
/**
 * Converts a Vector2 to Vector4.
 * @param {Vector2} V vector2.
 * @returns {Vector4}
 */
Vec2.toVec4 = (V:Vector2): Vector4 => [...V,0,0];
/**
 * Returns a copy of the vector with all of its components rounded to nearest integer.
 * @param {Vector2} V vector2. 
 * @returns {Vector2}
 */
Vec2.round = (V:Vector2): Vector2 => [Math.round(V[0]),Math.round(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer less than or equal to a given number.
 * @param {Vector2} V vector2. 
 * @returns {Vector2}
 */
Vec2.floor = (V:Vector2): Vector2 => [Math.floor(V[0]),Math.floor(V[1])];
/**
 * Returns a copy of the vector with all of its components rounded to the largest integer higher than or equal to a given number.
 * @param {Vector2} V vector2. 
 * @returns {Vector2}
 */
Vec2.ceil = (V:Vector2): Vector2 => [Math.ceil(V[0]),Math.ceil(V[1])];
/**
 * Returns a copy of the vector with all of its components converted to their absolute values.
 * @param {Vector2} V vector2. 
 * @returns {Vector2}
 */
Vec2.abs = (V:Vector2): Vector2 => [Math.abs(V[0]),Math.abs(V[1])];
Object.freeze(Vec2);