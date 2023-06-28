"use client"

import { Container } from "../Containter"
import { GridCover } from "./GridCover"
import { useRef } from "react"

interface Hero {
    id: string,
    subheading: string
}

export function Hero({ id, subheading }: Hero) {

    const headingRef = useRef<HTMLHeadingElement | null>(null);
    const subheadinRef = useRef<HTMLHeadingElement | null>(null);

    const resetAnimations = () => {
        if (headingRef.current && subheadinRef.current
            && headingRef.current instanceof HTMLHeadingElement
            && subheadinRef.current instanceof HTMLHeadingElement) {
            headingRef.current.getAnimations().forEach((animation) => {
                animation.currentTime = 0;
                animation.play()
            })

            subheadinRef.current.getAnimations().forEach((animation) => {
                animation.currentTime = 0;
                animation.play()
            })
        }
    }

    return (
        <div id={id} className="relative w-full h-full   ">
            <Container>
                <div className="pl-8 md:pl-8 pt-32 pb-64 w-full h-full
            flex flex-col  justify-center items-start gap-4
             ">

                    <h1
                        ref={headingRef}
                        style={{ fontSize: 'clamp(4rem , calc(9 / 80 * 100vw)   ,8rem)' }}
                        className="block font-bold text-8xl select-none animate-waveReverse">
                        Martin Hanák
                    </h1>
                    <h2
                        ref={subheadinRef}
                        className="block text-2xl select-none animate-waveReverse delay-1000">
                        {subheading}
                    </h2>

                    <GridCover resetParentAnimation={resetAnimations} />
                </div>
            </Container>

        </div>

    )
}