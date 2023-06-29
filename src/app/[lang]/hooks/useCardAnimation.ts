import { MutableRefObject, useEffect } from "react";
import RotationKeyframeGenerator from "./RotationKeyframeGenerator";
import ShiftKeyframeGenerator from "./ShiftKeyframeGenerator";
import { CardAnimator } from "./CardAnimator";
import StackKeyframeGenerator from "./StackKeyframeGenerator";

// assumes that elements have set transform origin in CSS

export function useCardAnimation(arrayRef: MutableRefObject<HTMLDivElement[] | null[]>, numberOfElements:number) {

    /*
    const handleClick = (element: HTMLDivElement | null, index:number) => {
        return function ( e: MouseEvent ) {

            // get current animation time
            let currentTime = 0
            element?.getAnimations().forEach((animation) => {
                if(animation.id === 'rotation') {
                    console.log(animation.currentTime)
                    currentTime = Number(animation.currentTime)
                }
            })

            // somehow? let it play until shift down finishes
            //  OR define translate Y in the new animation?

            // then pause
            let pausedAnimations : Animation[] = []
            arrayRef.current.forEach((element) => {
                element?.getAnimations().forEach((animation) => {
                    console.log(animation.id)
                    animation.pause();
                    pausedAnimations.push(animation);
                })
            })

            // play different animation:
            //      cards quickly back / forth
            //      angle to rotate: 
            //          
            let angle = 30;
            const timing : KeyframeAnimationOptions = {
                duration: 2000,
                iterations: 1,
                composite: 'add',
                id: "clickRotation"
            }
            const keyframes : Keyframe[] = [
                { transform: 'rotate(0deg)'},
                { transform: `rotate(${angle}deg)`}
            ]
            arrayRef.current.forEach((element) => {
                element?.animate(keyframes, timing)
            })

            // update paused animation time (for all elements)
        
            // unpause animation
            pausedAnimations.forEach((animation) => {
                animation.play()
            })


            

            
        }
    }
    */
    
    useEffect(() => {

        const cards : HTMLDivElement[] = [];
        arrayRef.current.forEach((element) => {
            if(element) {

                // reset all previous animations
                element.getAnimations().forEach((animation) => {
                    animation.cancel();
                })

                cards.push(element)
            }
        })

        

        
       const rotationGenerator = new RotationKeyframeGenerator(cards.length);
       const rotationAnimator = new CardAnimator(cards, rotationGenerator);

        // shift animation depends on the rotation one
       const rotationResult = rotationGenerator.getKeyframes()
       const rotationStationaryTime = rotationResult.keyframeTimes[1]
       const rotationAnimationLength = rotationGenerator.getDuration();

        const shiftGenerator = new ShiftKeyframeGenerator(cards.length,rotationStationaryTime,rotationAnimationLength)
        const shiftAnimator = new CardAnimator(cards,shiftGenerator)

        // first one has to be composite:replace, otherwise opacity is not animated
        rotationAnimator.playAnimation({indexDelay: 2000, composite: "replace"});
        shiftAnimator.playAnimation({indexDelay: 2000, composite: "add"})
        

        

        const stackKeyframeGenerator = new StackKeyframeGenerator(cards.length)

        const stackAnimator = new CardAnimator(cards,stackKeyframeGenerator) 

        setTimeout(() => {
            rotationAnimator.pauseAnimation()
            shiftAnimator.pauseAnimation()
            stackAnimator.playAnimation({currentTimeDelay: {animationId : 'rotation', totalTime : rotationAnimationLength}})
        }, 2500)
        
        

        //rotationAnimator.resetAnimation()

        /*
       const unstackGenerator = new StackKeyframeGenerator(cards.length);
        const animator = new CardAnimator(cards,unstackGenerator);
        animator.playAnimation(undefined,100);
        console.log(unstackGenerator.getKeyframes().keyframes)
        */


        // bind click events
        /*
        let clickListeners: EventListener[]  = [];
        arrayRef.current.map((element, index) => {
            const clickListener = handleClick(element,index) as EventListener;
            clickListeners.push(clickListener)
            element?.addEventListener('click',clickListener)
        })

        return () => {
            arrayRef.current.map((element,index) => {
                element?.removeEventListener('click',clickListeners[index])
            })
        }
        */


    }, [])
    
    return []
}


