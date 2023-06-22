import KeyframeGenerator, { getKeyframes, keyframeValue } from "./KeyframeGenerator";



export default class StackKeyframeGenerator extends KeyframeGenerator {


    constructor(numberOfElements: number) {
        super(numberOfElements);

    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: Infinity,
            id: "stack",
            composite: 'accumulate',
            fill: 'forwards'
        }
        return options;
    }

    getFrameValues(options: getKeyframes){
        let frameValues : keyframeValue[] = [];

        let totalTime = 10000;
        let currentTimeOffset = 0

        if(options) {
            totalTime = options.totalTime,
            currentTimeOffset = options.currentTimeOffset
        }

        if(!options) {
            console.log('No options found')
        }


        const timeDifference = totalTime - currentTimeOffset;
        const maxAngleRotation = 30;

        let angle = maxAngleRotation;
        // first half animation = rotate back
        if (timeDifference < totalTime /2) {
            angle =  maxAngleRotation * timeDifference / (totalTime * 0.5)
        // second half animation = rotate forward
        } else {
            angle = - maxAngleRotation * (timeDifference - totalTime  * 0.5) / (totalTime * 0.5)
        }

        

        frameValues.push({
            keyValuePairs: [{
                property: 'rotate',
                value: 0, 
                units: 'deg'
            }],
            duration: 0
        })

        frameValues.push({
            keyValuePairs: [{
                property: 'rotate',
                value: angle, 
                units: 'deg'
            }],
            duration: 2000
        })

        return frameValues
    }
}