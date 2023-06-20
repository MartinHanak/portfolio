
import { MutableRefObject, useEffect } from "react";

// assumes that elements have set transform origin in CSS

export function useCardAnimation(arrayRef: MutableRefObject<HTMLDivElement[] | null[]>, numberOfElements:number) {

    // duration = timePerItem * numberOfItems
    const timePerItem = 2000; // in seconds
    
    useEffect(() => {

        const displayedObjects = 5; // should be odd number
        const maxDisplayedAngle = 60;

        // time in one displayed angle = total time / number of displayed (without transition time)
        const totalTime = timePerItem * numberOfElements;
        const displayedTime = Math.min(timePerItem * displayedObjects, totalTime);
        const hiddenTime = totalTime - displayedTime;

        const timeForOneAngleWithTransition = displayedTime / displayedObjects;

        const transitionFraction = 0.2;
        const transitionTime = transitionFraction * timeForOneAngleWithTransition; 
        const stationaryTime = (1 - transitionFraction) *  timeForOneAngleWithTransition;

        const rotationTiming: KeyframeAnimationOptions = {
            duration: totalTime,
            iterations: Infinity,
           // composite: 'add', // composite add does not work with opacity
            //fill: 'forwards'
        }

        const shiftTiming: KeyframeAnimationOptions = {
            duration: totalTime,
            iterations: Infinity,
            composite: 'add',
        }


        const rotationKeyframes = getRotationKeyframes(displayedObjects,maxDisplayedAngle,totalTime,stationaryTime,transitionTime,hiddenTime)

        const opacityKeyframes = getOpacityKeyframes(displayedObjects, rotationKeyframes);

        //const shiftKeyframes = getShiftKeyframes(timePerItem);


        const shiftKeyframes = [
            { transform: 'translateY(0%)' },
            { transform : 'translateY(100%)' },
        ]





        arrayRef.current.map((element, index) => {
            if (element) {

               const rotationAnimation = element.animate(rotationKeyframes, rotationTiming);
               // const opacityAnimation = element.animate(opacityKeyframes, rotationTiming);

               //   composite add only on the second animation
               // order does matter
               // composite add cannot be on animation with opacity
             //    const shiftAnimation = element.animate(shiftKeyframes, shiftTiming);
                
               // shiftAnimation.currentTime = index * timePerItem ;
                rotationAnimation.currentTime = index * timePerItem ;

                //element.animate(rotationKeyframes, 200)
                /*
                element.animate(
                [{ opacity: 1 }, { opacity: 0.1, offset: 0.7 }, { opacity: 0 }],
                2000
                );
                */
            }
        })


    }, [])
    
    return []
}



function getRotationKeyframes(displayedObjects:number,maxDisplayedAngle:number,
    totalTime:number, stationaryTime:number,transitionTime:number,hiddenTime:number) {

        

        // values for 5 displayed cards, maxDisplayedAngle = 60

        // animation:
        //      still at angle x
        //      rotate to andgle y
        //      still at angle y
        // angles: 
        //      normal view: 0, 30, 60, 330, 300
        //      transition: 90, 270
        //      invisible: from 90 to 270

        // total time = numberOfObjects * timePerItem 
        // in ms

        //  keyframes shifted depending on total number
        //  always display 5
        //  all others are somewhere between 90 to 270

        // time in still position = aprox. total time / 5 (including transition to next angle)

        const oneRotationAngle = maxDisplayedAngle * 2 / displayedObjects;

        const angles = getKeyframesAngles(displayedObjects,maxDisplayedAngle);

        const offsets = getKeyframesOffsets(displayedObjects, totalTime, stationaryTime,transitionTime,hiddenTime);


        const keyframes: Keyframe[] = [];
        console.log(offsets)
        console.log(angles)
       

        angles.forEach((angle:number,index:number) => {
            let keyframe = {
                transform: `rotate(${angle}deg)`,
                opacity: 1,
                offset: offsets[index]
            }

            if (angle > maxDisplayedAngle && angle < 360 - maxDisplayedAngle) {
                keyframe.opacity = 0;
            }

            if(index === 1) {
                keyframe.transform = `rotate(${angle}deg)`
            }


            keyframes.push(keyframe)
        })
        
        console.log(keyframes);

        return keyframes;

}

function getKeyframesAngles(numOfDisplayed: number, maxDisplayedAngle:number) {
    // displayed angles = +/- maxDisplayedAngles
    // transition angles = up to 90
    // hidden = from 90 to 270
    const angles = []

    const oneRotationAngle = 2 * maxDisplayedAngle / numOfDisplayed;

    // offset for even numbers
    let angleOffset = 0;
    if(numOfDisplayed % 2 === 0) {
        angleOffset = oneRotationAngle / 2;
    }

    // right cards displayed
    for(let i = 0; i < Math.ceil( numOfDisplayed / 2); i++) {
        angles.push(i * oneRotationAngle + angleOffset);
        angles.push(i * oneRotationAngle + angleOffset);
    }

    // transition = up to 90
    angles.push(90)

    // hidden = from 90 to 270
    angles.push(180)
    angles.push(270)

    for(let i = 0; i < Math.ceil( numOfDisplayed / 2); i++) {
    
        let k = Math.floor( numOfDisplayed / 2) - i;
        let angle = 360 - angleOffset - k * oneRotationAngle;
        
        angles.push(angle);
        if(i !== Math.ceil( numOfDisplayed / 2) - 1) {
            angles.push(angle);
        }
        
    }
    return angles;
}


function getKeyframesOffsets(displayedObjects: number, totalTime: number, stationaryTime: number, transitionTime:number, hiddenTime:number) {


    // hidden time split into: 
    //      2x transition to 90 and from 270
    //      transition to and from 180

    // offsets:
    // 0 -> stationaryTime -> transitionTime 
    //      repeat until half displayed
    //      then hidden time
    //      again stationaryTime -> transitionTime  until the other half displayed
    //      last frame at 360: no stacionary time, only transition to 360;

    const offsets = [0]
    let currentTime = 0;

    for(let i = 0; i < Math.ceil(displayedObjects /2); i ++) {

        currentTime +=  stationaryTime;
        offsets.push(currentTime / totalTime)

        currentTime +=  transitionTime
        offsets.push(currentTime / totalTime)
    }

    // hidden time offsets: no stacionary times
    //      to 90
    //      from 90 to 180
    //      from 180 to 270
    //      from 270
    for(let i =0; i <3; i++) {
        currentTime += hiddenTime / 4;
        offsets.push(currentTime / totalTime)
    }

    // left cards
    for(let i = 0; i < Math.floor(displayedObjects /2); i ++) {

        currentTime += stationaryTime;
        offsets.push(currentTime / totalTime)

        currentTime +=  transitionTime;
        offsets.push(currentTime / totalTime)
    }

    //offsets.push(1)


    return offsets;
}


function getOpacityKeyframes(displayedObjects: number, keyframes: Keyframe[]) {

    let opacityFrames : Keyframe[] = [];

    keyframes.forEach((frame, index) => {
        opacityFrames.push({
            opacity: index > 5 ? 0 : 1, offset: frame.offset
        })
    })

    return opacityFrames;
}