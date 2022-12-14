type CanvasSettings = {
    autoAdaptResolution?: boolean;
};

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
    static refreshRate: number;
    /** Is the current device a mobile phone? Needed for performance tweaks. Read-only. */
    static isRunOnPhone = (function(a){
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})
        /** @ts-ignore */
        (navigator.userAgent||navigator.vendor||window.opera);

    /** Max frames per second. Read-only.*/
    fps:number;
    /** Ideal time between two frames. Read-only. */
    fixedDeltaTime:number;
    /** Time took to render previous frame. */
    deltaTime:DOMHighResTimeStamp;
    /** If true the canvas won't update (image and calculations paused). */
    isPaused=true;

    /** Canvas targeted by this class. */
    #canvas:HTMLCanvasElement;
    /** Rendering context 2d of the targeted canvas. */
    #ctx:CanvasRenderingContext2D;
    /** Should the targeted canvas width and height be adapted to clientWidth and clientHeight on window resize? */
    autoAdaptResolution:boolean;

    physicsIntervalId:number;
    renderIntervalId:number;

    /** Array that contains all the objects to render. */
    objects:any[];

    constructor(id:string, objects:any[]=[],settings?:CanvasSettings) {
        const c = document.getElementById(id);
        if (c instanceof HTMLCanvasElement) {
            this.#canvas = c;
            this.#ctx = c.getContext("2d");
            this.objects = objects;
            this.#applySettings(settings);
            this.#init().then(v => this.#start(v));
        }
        else throw `Couldn't find canvas with id '${id}'`;
    }
    #applySettings({autoAdaptResolution}:CanvasSettings={autoAdaptResolution:false}) {
        this.autoAdaptResolution = autoAdaptResolution;
    }
    /** Method used to detect screen refresh rate. If refresh rate was already calculated => resolve with that value */
    #init(): Promise<number> {
        return new Promise(resolve => {

            if (CanvasManager.refreshRate !== undefined) {
                resolve(CanvasManager.refreshRate);
                return;
            }

            /** timestamps[0] is the start of the elapsed time; timestamps[i] (with 0<i<fpsSamples+1) is where all the sample fps timestamps are. */
            const timestamps:number[] = [];
            let id, framesToWait = CanvasManager.waitFrames;

            function frameStep(timestamp:number) {
                if (framesToWait > 0) {
                    framesToWait--;
                    if (framesToWait === 0) timestamps.push(timestamp);
                }
                else if (timestamps.length-1 < CanvasManager.fpsSamples) {
                    timestamps.push(timestamp);
                }
                else {
                    const avg = timestamps
                                      .map((v,i)=>v-timestamps[i-1]) // calc deltaTime between each timestamp
                                      .slice(1) // remove timestamps[0] which is non relevant to the calculation
                                      .reduce((a,b)=>a+b)/(timestamps.length-1) - CanvasManager.fpsCalculationEpsilon * 2; // divide the sum of the deltas by the sampleCount
                    let o;
                    if (avg <= 2.777778) o = 360;
                    else if (avg <= 4.166667) o = 240;
                    else if (avg <= 6.060606) o = 165;
                    else if (avg <= 6.944444) o = 144;
                    else if (avg <= 8.333333) o = 120;
                    else if (avg <= 11.111111) o = 90;
                    else if (avg <= 13.333333) o = 75;
                    else if (avg <= 16.666667) o = 60;
                    else if (avg <= 33.333333) o = 30;
                    else o = Math.floor(1000/avg);

                    Object.defineProperty(CanvasManager,"refreshRate",{value:o,writable:false});
                    cancelAnimationFrame(id);
                    resolve(o);
                    return;
                }
                id = requestAnimationFrame(frameStep);
            }
            id = requestAnimationFrame(frameStep);
        });
    }
    #start(fps:number) {
        Object.defineProperty(this,"fps",{value:fps,writable:false});
        Object.defineProperty(this,"fixedDeltaTime",{value:1/fps,writable:false});
        CanvasManager.resizeEvent = false;
        this.isPaused = false;

        this.physicsIntervalId = setInterval(this.fixedPhysicsStep.bind(this), this.fixedDeltaTime);
        this.renderIntervalId = requestAnimationFrame(this.renderFrame.bind(this))
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
    renderFrame(currFrame?:DOMHighResTimeStamp,prevFrame?:DOMHighResTimeStamp) {
        this.adaptResolution();

        this.#ctx.clearRect(0,0,this.#canvas.width,this.#canvas.height);

        if (!this.isPaused || !prevFrame) {
            this.deltaTime = (currFrame - prevFrame) * 0.001;

            this.drawObjects();
        }
        this.renderIntervalId = requestAnimationFrame(nextFrame => this.renderFrame.call(this,nextFrame,currFrame));
    }
    drawObjects() {
        const ctx = this.#ctx;
        for (let i=0; i<this.objects.length; i++) {
            // do something
        }
    }
}
Object.defineProperty(CanvasManager,"isRunOnPhone",{writable:false});

window.addEventListener("resize", () => CanvasManager.resizeEvent=true);