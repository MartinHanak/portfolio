import { threadId } from "worker_threads";

export type performantAnimationProperties = "opacity" | "translateY" | "translateX" | "scale" | "rotate" | "translateZ" ;
export type allowed3DProperties = "rotate3D";

export interface propertyValue {
    property: performantAnimationProperties,
    value: number,
    units?: string
}

export interface propertyValue3D {
    property: allowed3DProperties,
    vector: [number, number, number],
    value: number,
    units?: string
}

export interface keyframeValue {
    keyValuePairs: (propertyValue | propertyValue3D)[],
    duration: number // in ms
}

export default class KeyframeGenerator {
    timePerItem: number;
    displayedObjects: number;
    maxDisplayedAngle: number;
    numberOfElements: number;

    constructor(numberOfElements: number) {
        this.numberOfElements = numberOfElements
        this.timePerItem = 2000;
        this.displayedObjects = 5;
        this.maxDisplayedAngle = 60;
    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: 1,
            id: "defaultOptions"
        }
        return options;
    }

    getKeyframes() {
        return this.generateKeyframes(this.getFrameValues())
    }

    private generateKeyframes(frameValues: keyframeValue[]) {
        const keyframes : Keyframe[] = [];
        const keyframeTimes : number[] = [];

        let totalDuration = 0;
        frameValues.forEach(frame => {
            totalDuration += frame.duration
        });

        let currentTime = 0;
        frameValues.forEach((frame) => {

            // move in time (should start with 0 duration frame)
            currentTime += frame.duration;

            // current time
            keyframeTimes.push(currentTime);

            // generate keyframe with correct offset
            let keyframe: Keyframe = {
                offset: currentTime / totalDuration
            }
            frame.keyValuePairs.forEach((keyValue) => {
                if(keyValue.property === 'opacity') {
                    keyframe = {
                        ...keyframe,
                        opacity: keyValue.value
                    }
                } else if (keyValue.property === 'rotate3D') {
                    keyframe = {
                        ...keyframe,
                        transform: `${keyValue.property}(${keyValue.vector[0]}, ${keyValue.vector[1]},${keyValue.vector[2]} ,${keyValue.value}${keyValue.units})`
                    }
                } else {
                    if(keyframe["transform"]) {
                        keyframe["transform"] += ` ${keyValue.property}(${keyValue.value}${keyValue.units})`
                    } else {
                        keyframe = {
                            ...keyframe,
                            transform: `${keyValue.property}(${keyValue.value}${keyValue.units})`
                        }
                    }   
                }
            })

            keyframes.push(keyframe);
        
        })

        
        return {keyframes,keyframeTimes};
    }

    getDuration() {
        const frameValues = this.getFrameValues();

        let duration = 0;

        frameValues.forEach(frameValue => {
            duration += frameValue.duration
        })

        return duration;
    }

    // default placeholder = pulsing opacity
    getFrameValues() {
        let frameValues : keyframeValue[] = [];
        frameValues.push({
            keyValuePairs: [{
                property: 'opacity',
                value: 1
            }],
            duration: 2000
        })

        frameValues.push({
            keyValuePairs: [{
                property: 'opacity',
                value: 0
            }],
            duration: 2000
        })


        frameValues.push({
            keyValuePairs: [{
                property: 'opacity',
                value:1
            }],
            duration: 2000
        })

        return frameValues;
    }

   
} 