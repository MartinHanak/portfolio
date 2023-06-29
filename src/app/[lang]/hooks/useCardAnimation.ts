import { MutableRefObject, useEffect, useRef} from "react";
import RotationKeyframeGenerator from "./RotationKeyframeGenerator";
import { CardAnimator } from "./CardAnimator";

// assumes that elements have set transform origin in CSS

export function useCardAnimation(arrayRef: MutableRefObject<HTMLDivElement[] | null[]>, numberOfElements:number, active: boolean) {

    const pause = useRef<(() => void) | null>(null);
    const play = useRef<(() => void) | null>(null);
    
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

         console.log(`active: ${active}, cards length: ${cards.length}`)

        if(cards.length === 0) {
            return
        }

        
       const rotationGenerator = new RotationKeyframeGenerator(cards.length);
       const rotationAnimator = new CardAnimator(cards, rotationGenerator);

      
    
       rotationAnimator.playAnimation({indexDelay: 2000, composite: "replace"})
       rotationAnimator.pauseAnimation()


        pause.current = () => {
            rotationAnimator.pauseAnimation()
        }

        play.current = () => {
            rotationAnimator.unpauseAnimation()
        }

        return () => {
            cards.forEach((card) => {
                card.getAnimations().forEach((animation) => {
                    if(animation.id === "shift" || animation.id === "stack" || animation.id === "rotation") {
                        animation.cancel()
                    }
                })
            })
        }


    }, [])
    
    return {
        play: play.current,
        pause: pause.current
    }
}


