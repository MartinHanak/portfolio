import KeyframeGenerator from "./KeyframeGenerator";

interface playAnimationOptions {
    composite?:CompositeOperation,
    indexDelay?: number
}

export class CardAnimator {
    cards: HTMLDivElement[]
    keyframeGenerator: KeyframeGenerator

    constructor(cards :  HTMLDivElement[], keyframeGenerator : KeyframeGenerator) {
        this.cards = cards;
        this.keyframeGenerator = keyframeGenerator
    }

    playAnimation(playOptions?: playAnimationOptions) {
        const options = this.keyframeGenerator.getKeyframeAnimationOptions();
        const keyframes = this.keyframeGenerator.getKeyframes().keyframes;

        let chosenComposition: CompositeOperation = 'accumulate';

        if(playOptions && playOptions.composite) {
            chosenComposition = playOptions.composite
        }

        let modifiedOptions = {
            ...options,
            composite: chosenComposition
        }

        this.cards.forEach((card, index: number) => {
            const animation = card.animate(keyframes, modifiedOptions)

            if(playOptions && playOptions.indexDelay) {
                animation.currentTime = index * playOptions.indexDelay;
            }

        })

    }

    commitStyle() {
        const computedStyles : CSSStyleDeclaration[] = [];

        this.cards.forEach((card) => {
            card.getAnimations().forEach((animation) => {

                if(animation.id === this.keyframeGenerator.getKeyframeAnimationOptions().id) {
                    computedStyles.push( getComputedStyle(card) )
                    animation.commitStyles()
                }
               
            })
        })

        return computedStyles;
    }

    pauseAnimation() {
        const animationId = this.keyframeGenerator.getKeyframeAnimationOptions().id;

        this.cards.forEach((card) => {
            card.getAnimations().forEach((animation) => {
                if(animation.id === animationId) {
                    animation.pause();
                }
            })
        })
    }

    deleteAnimation() {
        this.cards.forEach((card) => {
            card.getAnimations().forEach((animation) => {
                if(animation.id === this.keyframeGenerator.getKeyframeAnimationOptions().id) {
                    animation.cancel()
                }
            })
        })
    }


    resetAnimation() {
        this.pauseAnimation();
        
        const options : KeyframeAnimationOptions = {
            duration: 2000,
            iterations: 1,
            id: `reset${this.keyframeGenerator.getKeyframeAnimationOptions().id}`,
            composite: 'replace',
            fill: 'forwards'
        }

        const animationPromises  : Promise<string>[] = []

        this.cards.forEach((card, index) => {
        
            let currentTransform = getComputedStyle(card).getPropertyValue("transform");
            let currentOpacity = getComputedStyle(card).getPropertyValue("opacity")

            const keyframes : Keyframe[] = [
                {transform: currentTransform, opacity: currentOpacity, offset: 0 },
                {transform: 'none', opacity: 1, offset: 1 }
            ]

            const animation = card.animate(keyframes,options);

            const finishPromise = new Promise<string>((resolve) => {
                animation.addEventListener("finish", (event) => {
                    resolve("finsihed")
                })

            })

            animationPromises.push(finishPromise);            
        })

        Promise.all(animationPromises).then(() => {
            console.log("animation complete")
            this.commitStyle()
            this.deleteAnimation()
        })
        //this.commitStyle()
        
        
    }

    // initial transformation = stacked cards

    // initial to open deck

    // rotation animation + shift animation

    // onClick animation

    // close animation = from current to stacked deck
}