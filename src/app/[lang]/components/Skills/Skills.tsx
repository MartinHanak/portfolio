"use client"
import { SkillsSection } from "./SkillsSection"
import { useState } from "react"

interface Skills {
    id: string,
    heading: string,
    frontendText: string,
    backendText: string,
    toolsText: string
}

export function Skills({ id, heading, frontendText, backendText, toolsText }: Skills) {

    const [activeArray, setActiveArray] = useState([true, false, false]);

    function createClickHandler(index: number) {
        return () => {
            setActiveArray((prev) => {
                let newState = [...prev]
                newState[index] = !newState[index]
                return newState;
            })
        }
    }


    return (
        <div id={id} className="flex flex-col justify-center items-stretch my-8 mt-32">

            <h2 className="text-4xl font-bold mx-4 lg:mx-0 mb-8">{heading}</h2>

            <SkillsSection active={activeArray[0]} onClick={createClickHandler(0)} name="Frontend" description={frontendText} />
            <SkillsSection active={activeArray[1]} onClick={createClickHandler(1)} name="Backend" description={backendText} />
            <SkillsSection active={activeArray[2]} onClick={createClickHandler(2)} name="Tools" description={toolsText} />
        </div>
    )
}

