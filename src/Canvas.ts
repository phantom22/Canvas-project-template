class Monitor {
    /** How many frames after the page load should the fps detector wait? Default=5 */
    static waitFrames = 5;
    /** Number of taken sample timestamps required for the fps detection. Default=10 */
    static fpsSamples = 10;
    /** Very small number that helps preventing wrong fps detection. Default=0.001 */
    static fpsCalculationEpsilon = 0.001;

    constructor(id:string) {
        const c = document.getElementById(id);
        if (c instanceof HTMLCanvasElement) {
            this.#init().then(v => this.start(v));
        }
        else throw `Couldn't find canvas with id '${id}'`;
    }
    #init(): Promise<number> {
        return new Promise(resolve => {
            /** timestamps[0] is the start of the elapsed time; timestamps[i] (with 0<i<fpsSamples+1) is where all the sample fps timestamps are. */
            const timestamps:number[] = [];
            let id, framesToWait = Monitor.waitFrames;

            function fpsStep(timestamp:number) {
                if (framesToWait > 0) {
                    framesToWait--;
                    if (framesToWait === 0) timestamps.push(timestamp);
                }
                else if (timestamps.length-1 < Monitor.fpsSamples) {
                    timestamps.push(timestamp);
                }
                else {
                    const avg = timestamps.map((v,i)=>v-timestamps[i-1]) // calc deltaTime between each timestamp
                                      .slice(1) // remove timestamps[0] which is non relevant to the calculation
                                      .reduce((a,b)=>a+b)/(timestamps.length-1) - Monitor.fpsCalculationEpsilon * 2; // divide the sum of the deltas by the sampleCount
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

                    cancelAnimationFrame(id);
                    resolve(o);
                    return;
                }
                id = requestAnimationFrame(fpsStep);
            }
            id = requestAnimationFrame(fpsStep);
        });
    }
    start(fps:number) {
        console.log(fps);
    }
}