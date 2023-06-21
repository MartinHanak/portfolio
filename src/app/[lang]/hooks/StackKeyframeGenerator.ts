import KeyframeGenerator, { keyframeValue } from "./KeyframeGenerator";

export default class StackKeyframeGenerator extends KeyframeGenerator {
    vector: [number, number, number];

    constructor(numberOfElements: number) {
        super(numberOfElements)
        this.vector = [-2,1,0];
    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: 1,
            id: "unstack"
        }
        return options;
    }

    getFrameValues(){
        let frameValues : keyframeValue[] = [];

        frameValues.push({
            keyValuePairs: [{
                property: 'rotate3D',
                value: 60,
                units: 'deg',
                vector: this.vector
            },{
                property: 'translateZ',
                value: 10,
                units: 'rem'
            }   
        ],
            duration: 0
        })




        frameValues.push({
            keyValuePairs: [{
                property: 'rotate3D',
                value: 0,
                units: 'deg',
                vector: this.vector
            },{
                property: 'translateZ',
                value: 0,
                units: 'rem'
            }  ],
            duration: 500
        })

        return frameValues
    }
}