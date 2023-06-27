'use client'

import { BigContainer } from "../BigContainer"
import { LanguageSwitch } from "./LanguageSwitch"
import { useState, useEffect, useRef, useCallback } from "react"


export interface LanguageSwitchLabels {
    language: string,
    czech: string,
    english: string
}

export interface NavbarLinks {
    home: string,
    about: string,
    projects: string,
    skills: string
    contact: string,
}

export interface Navbar {
    languageSwitch: LanguageSwitchLabels
    navbar: NavbarLinks
}

export function Navbar({ languageSwitch, navbar }: Navbar) {

    const pageIds: (keyof typeof navbar)[] = ["home", "about", "skills", "projects", "contact"];
    const hoverColors: string[] = ["hover:bg-red-500", "hover:bg-yellow-500", "hover:bg-cyan-500", "hover:bg-orange-500", "hover:bg-green-500",]

    const [display, setDisplay] = useState(false);
    const previousScroll = useRef(0);


    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= previousScroll.current) {
                setDisplay(true);
            } else if (display) {
                setDisplay(false)
            }

            previousScroll.current = currentScrollY;

        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);

    }, [display])


    return (
        <nav className={`sticky  ${display ? 'top-0' : '-top-[100%]'}  transition-all duration-1000 will-change-scroll z-[100]`}>

            <BigContainer>
                <div className=" flex flex-row justify-between items-start">
                    <LanguageSwitch
                        language={languageSwitch.language}
                        czech={languageSwitch.czech}
                        english={languageSwitch.english}
                    />


                    <div className="hexagon-navbar mt-4
                    border-solid border-black border-2
                    flex flex-col  md:flex-row flex-wrap 
                     " >

                        <div className="hexagon md:hidden">
                            <a>
                                <div className="inner-hexagon font-bold text-lg">
                                    Menu
                                </div>
                            </a>
                        </div>


                        {pageIds.map((elementID: keyof typeof navbar, index: number) => {
                            return (
                                <div key={elementID} className="hexagon hover:scale-110 duration-500">
                                    <a href={`#${navbar[elementID]}`}>
                                        <div className={`inner-hexagon font-bold text-lg ${hoverColors[index]}`}>
                                            {navbar[elementID]}
                                        </div>
                                    </a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </BigContainer>
        </nav>
    )
}