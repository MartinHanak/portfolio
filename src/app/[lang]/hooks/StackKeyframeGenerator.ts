import KeyframeGenerator, { getKeyframes, keyframeValue } from "./KeyframeGenerator";

export default class StackKeyframeGenerator extends KeyframeGenerator {


    constructor(numberOfElements: number) {
        super(numberOfElements);
    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: 1,
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
            console.log(`options found, total: ${totalTime}, current: ${currentTimeOffset}`)
        }

        if(!options) {
            console.log('No options found')
        }


        const maxAngleRotation = 60;

        let angle = maxAngleRotation;
        // first half animation = rotate back
        if (currentTimeOffset < totalTime /2) {
            angle = - maxAngleRotation * currentTimeOffset / (totalTime );
        // second half animation = rotate forward
        } else {
            angle =  maxAngleRotation * (totalTime - currentTimeOffset) / (totalTime);
        }

        console.log(`chosen angle:${angle}`)

        

        frameValues.push({
            keyValuePairs: [{
                property: 'rotate',
                value: 0, 
                units: 'deg'
            }, {
                property: 'translateY',
                value: 0,
                units: 'px'
            }],
            duration: 0
        })

        frameValues.push({
            keyValuePairs: [{
                property: 'rotate',
                value: angle, 
                units: 'deg'
            }, {
                property: 'translateY',
                value: 0,
                units: 'px'
            }],
            duration: 2000
        })

        return frameValues
    }
}