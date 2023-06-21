import KeyframeGenerator from "./KeyframeGenerator";

export class CardAnimator {
    cards: HTMLDivElement[]
    keyframeGenerator: KeyframeGenerator

    constructor(cards :  HTMLDivElement[], keyframeGenerator : KeyframeGenerator) {
        this.cards = cards;
        this.keyframeGenerator = keyframeGenerator
    }

    playAnimation(composite?: CompositeOperation, indexDelay?: number) {
        const options = this.keyframeGenerator.getKeyframeAnimationOptions();
        const keyframes = this.keyframeGenerator.getKeyframes().keyframes;

        let chosenComposition: CompositeOperation = 'accumulate';

        if(composite) {
            chosenComposition = composite
        }

        let modifiedOptions = {
            ...options,
            composite: chosenComposition
        }

        this.cards.forEach((card, index: number) => {
            const animation = card.animate(keyframes, modifiedOptions)
            if(indexDelay) {
                animation.currentTime = index * indexDelay;
            }
        })

    }

    commitStyle() {
        this.cards.forEach((card) => {
            card.getAnimations().forEach((animation) => {
                animation.commitStyles()
            })
        })
    }



    // initial transformation = stacked cards

    // initial to open deck

    // rotation animation + shift animation

    // onClick animation

    // close animation = from current to stacked deck
}