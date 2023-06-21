import KeyframeGenerator, { keyframeValue } from "./KeyframeGenerator";

export default class ShiftKeyframeGenerator extends KeyframeGenerator {
    rotationStationaryTime: number;
    totalRotationTime: number;

    constructor(numberOfElements: number, rotationStationaryTime: number, totalRotationTime: number) {
        super(numberOfElements);
        this.rotationStationaryTime = rotationStationaryTime;
        this.totalRotationTime = totalRotationTime;
    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: Infinity,
            id: "shift"
        }
        return options;
    }

    getFrameValues(){
        let frameValues : keyframeValue[] = [];

        // timings
        const translatePercentage = 80;

        const transitionFraction = 0.33;
        const transitionTime = transitionFraction * this.rotationStationaryTime / 2 ; // 2 transition up and down during stacionary time
        const upTime = this.rotationStationaryTime - transitionTime * 2;


        // initial shift
        frameValues.push({
            keyValuePairs: [{
                property: 'translateY',
                value: translatePercentage,
                units: `%`
            }],
            duration: 0
        })

        // transition up
        frameValues.push({
            keyValuePairs: [{
                property: 'translateY',
                value: 0,
                units: `%`
            }],
            duration: transitionTime
        })

        // time up
        frameValues.push({
            keyValuePairs: [{
                property: 'translateY',
                value: 0,
                units: `%`
            }],
            duration: upTime
        })

        // transition
        frameValues.push({
            keyValuePairs: [{
                property: 'translateY',
                value: translatePercentage,
                units: `%`
            }],
            duration: transitionTime
        })

        // rest of animation = no shift
        frameValues.push({
            keyValuePairs: [{
                property: 'translateY',
                value: translatePercentage,
                units: `%`
            }],
            duration: this.totalRotationTime - upTime - 2 * transitionTime
        })

        return frameValues;
    }
}