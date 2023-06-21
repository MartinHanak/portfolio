import { keyframeValue } from "./KeyframeGenerator";
import KeyframeGenerator from "./KeyframeGenerator";

export default class RotationKeyframeGenerator extends KeyframeGenerator {

    constructor(numberOfElements: number) {
        super(numberOfElements)
    }

    getKeyframeAnimationOptions() {
        const options : KeyframeAnimationOptions = {
            duration: this.getDuration(),
            iterations: Infinity,
            id: "rotation"
        }
        return options;
    }


    getFrameValues(){
        let frameValues : keyframeValue[] = [];

        // timings

        const totalTime = this.timePerItem * this.numberOfElements;
        const displayedTime = Math.min(this.timePerItem * this.displayedObjects, totalTime);
        const hiddenTime = totalTime - displayedTime;

        const timeForOneAngleWithTransition = displayedTime / this.displayedObjects;

        const transitionFraction = 0.2;
        const transitionTime = transitionFraction * timeForOneAngleWithTransition; 
        const stationaryTime = (1 - transitionFraction) *  timeForOneAngleWithTransition;

        // angle values

        const oneRotationAngle = 2 * this.maxDisplayedAngle / this.displayedObjects;

        // offset for even numbers
        let angleOffset = 0;
        if(this.displayedObjects % 2 === 0) {
            angleOffset = oneRotationAngle / 2;
        }

        // initial = 0 rotaion
        frameValues.push({
            keyValuePairs: [{
                property: "rotate",
                value: angleOffset,
                units: 'deg'
            }],
            duration: 0
        })
        // stacionary at the beginning
        frameValues.push({
            keyValuePairs: [{
                property: "rotate",
                value: angleOffset,
                units: 'deg'
                
            }],
            duration: stationaryTime
        })

        // right cards displayed
        
        for(let i = 1; i < Math.ceil( this.displayedObjects / 2); i++) {

            // transition
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate",
                    value: i * oneRotationAngle + angleOffset,
                    units: 'deg'  
                } ],
                duration: transitionTime
            })

            // stationary
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate",
                    value: i * oneRotationAngle + angleOffset,
                    units: 'deg'
                } ],
                duration: stationaryTime
            })
           
        }

        // transition to 90, 90 to 180, 180 to 270, 270 to displayed angle
        for(const hiddenAngle of [90, 180, 270]) {
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate", 
                    value: hiddenAngle,
                    units: 'deg'
                }, {
                    property: "opacity",
                    value: 0,
                }
                ],
            
                duration: hiddenTime / 3
            })
        }


        for(let i = 0; i < Math.ceil( this.displayedObjects / 2); i++) {
        
            let k = Math.floor( this.displayedObjects / 2) - i;
            let angle = 360 - angleOffset - k * oneRotationAngle;
            
           frameValues.push({
                keyValuePairs: [{
                    property: "rotate", 
                    value: angle,
                    units: 'deg'
                }, {
                    property: "opacity",
                    value: 1,
                }],
                duration: transitionTime
            })

            // 360 rotation has no stacionary time
            if(i !== Math.ceil( this.displayedObjects / 2) - 1) {
                frameValues.push({
                    keyValuePairs: [{
                        property: "rotate", 
                        value: angle,
                        units: 'deg'
                    }, {
                        property: "opacity",
                        value: 1,
                    }],
                    duration: stationaryTime
                })
            }
                        
        }
        return frameValues;
    }

    
}