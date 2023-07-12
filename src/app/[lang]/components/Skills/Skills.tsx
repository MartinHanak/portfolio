"use client"
import { SkillsSection } from "./SkillsSection"
import { useState, useRef, useEffect } from "react"

interface Skills {
    id: string,
    heading: string,
    frontendText: string,
    backendText: string,
    toolsText: string
}

export function Skills({ id, heading, frontendText, backendText, toolsText }: Skills) {

    const [activeArray, setActiveArray] = useState([true, false, false]);

    const [manuallySelected, setManuallySelected] = useState([false, false, false])

    const skillsWrapper = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            if (skillsWrapper.current) {
                const bounds = skillsWrapper.current.getBoundingClientRect();
                const wrapperHeight = bounds.bottom - bounds.top;
                const absoluteTop = currentScrollY + bounds.top

                if (bounds.bottom > 0 && currentScrollY > (absoluteTop - wrapperHeight)) {

                    let windowBot = currentScrollY + windowHeight;

                    const botBoundaryOne = absoluteTop + wrapperHeight * 2 / 3;
                    const botBoundaryTwo = absoluteTop + wrapperHeight * 3 / 3;


                    if (windowBot < botBoundaryOne) {
                        setActiveArray([true, false, false])
                    } else if (windowBot < botBoundaryTwo) {
                        setActiveArray([false, true, false])
                    } else {
                        setActiveArray([false, false, true])
                    }

                }


            }
        }

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);

    }, []);

    function createClickHandler(index: number) {
        return () => {

            setManuallySelected((prev) => {
                let newState = [...prev];
                newState[index] = !newState[index];
                return newState
            })

        }
    }


    return (
        <section id={id} ref={skillsWrapper} className="flex flex-col justify-center items-stretch my-8 mt-32">

            <h2 className="text-4xl font-bold mx-4 lg:mx-0 mb-8">{heading}</h2>

            <SkillsSection active={manuallySelected[0] || activeArray[0]} onClick={createClickHandler(0)} name="Frontend" description={frontendText} />
            <SkillsSection active={manuallySelected[1] || activeArray[1]} onClick={createClickHandler(1)} name="Backend" description={backendText} />
            <SkillsSection active={manuallySelected[2] || activeArray[2]} onClick={createClickHandler(2)} name="Tools" description={toolsText} />
        </section>
    )
}

