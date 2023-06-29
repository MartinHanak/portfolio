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
            id: "rotation",
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

        const perspective = 2000;
        const zShift = 10;

        // offset for even numbers
        let angleOffset = 0;
        if(this.displayedObjects % 2 === 0) {
            angleOffset = oneRotationAngle / 2;
        }

        // initial = 0 rotaion
        frameValues.push({
            keyValuePairs: [ {
                property: 'perspective',
                value: perspective,
                units: 'px'
            }, {
                property: "rotate",
                value: angleOffset,
                units: 'deg'
            },{
                property: "opacity",
                value: 1,
            },  {
                property: 'translateZ',
                value: getTranslateZ(0),
                units: 'px'
            }],
            duration: 0
        })
        // stacionary at the beginning
        frameValues.push({
            keyValuePairs: [{
                property: "rotate",
                value: angleOffset,
                units: 'deg'  
            },{
                property: "opacity",
                value: 1,
            },  {
                property: 'translateZ',
                value: getTranslateZ(0),
                units: 'px'
            },  {
                property: 'perspective',
                value: perspective,
                units: 'px'
            }],
            duration: stationaryTime
        })

        // right cards displayed
        
        for(let i = 1; i < Math.ceil( this.displayedObjects / 2); i++) {

            // transition
            let angle = i * oneRotationAngle + angleOffset;
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate",
                    value: angle,
                    units: 'deg'  
                },{
                    property: "opacity",
                    value: 1,
                },  {
                    property: 'translateZ',
                    value: getTranslateZ(angle),
                    units: 'px'
                },  {
                    property: 'perspective',
                    value: perspective,
                    units: 'px'
                }],
                duration: transitionTime
            })

            // stationary
            angle = i * oneRotationAngle + angleOffset
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate",
                    value: angle,
                    units: 'deg'
                },{
                    property: "opacity",
                    value: 1,
                },  {
                    property: 'translateZ',
                    value:getTranslateZ(angle),
                    units: 'px'
                },  {
                    property: 'perspective',
                    value: perspective,
                    units: 'px'
                }],
                duration: stationaryTime
            })
           
        }

        // transition to 90, 90 to 180, 180 to 270, 270 to displayed angle
        const to90duration = 100;
        frameValues.push({
                keyValuePairs: [{
                    property: "rotate", 
                    value: 75,
                    units: 'deg'
                }, {
                    property: "opacity",
                    value: 0,
                },  {
                    property: 'translateZ',
                    value: getTranslateZ(75),
                    units: 'px'
                },  {
                    property: 'perspective',
                    value: perspective,
                    units: 'px'
                }
                ],
            
                duration: to90duration
            })

        for(const hiddenAngle of [90, 180, 270]) {
            frameValues.push({
                keyValuePairs: [{
                    property: "rotate", 
                    value: hiddenAngle,
                    units: 'deg'
                }, {
                    property: "opacity",
                    value: 0,
                },  {
                    property: 'translateZ',
                    value:  getTranslateZ(hiddenAngle),
                    units: 'px'
                },  {
                    property: 'perspective',
                    value: perspective,
                    units: 'px'
                }
                ],
            
                duration: hiddenTime / 3 - to90duration
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
                },  {
                    property: 'translateZ',
                    value:  getTranslateZ(angle),
                    units: 'px'
                },  {
                    property: 'perspective',
                    value: perspective,
                    units: 'px'
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
                    },  {
                        property: 'translateZ',
                        value:  getTranslateZ(angle),
                        units: 'px'
                    },  {
                        property: 'perspective',
                        value: perspective,
                        units: 'px'
                    }],
                    duration: stationaryTime
                })
            }
                        
        }
        return frameValues;
    }

    
}



// gets 0 to 1 for angles -90 to +90
function getTranslateZ(angle: number) {
    let angleInRange =  angle % 360;

    if(angleInRange > 90 && angleInRange < 180) {
        return 1
    } else if (angleInRange > 180 && angleInRange  < 270) {
        return 0
    } else {
        
        if(angleInRange > 180) {
            // values from 0 to 0.5
            return (angleInRange - 270)/90 * 0.5
        }else if(angleInRange < 180) {
            // values from 0.5 to 1.0
            return angleInRange/90 * 0.5 + 0.5;
        } else {
            return 0
        }
    }
}