'use client'

import { BigContainer } from "../BigContainer"
import { Hamburger } from "./Hambuger"
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
    const hoverColors: string[] = ["hover:bg-red-500", "hover:bg-orange-400", "hover:bg-yellow-400", "hover:bg-emerald-500", "hover:bg-cyan-500",]
    const delayClass: string[] = ["delay-[100ms]", "delay-[200ms]", "delay-[300ms]", "delay-[400ms]", "delay-[500ms]"]

    const [display, setDisplay] = useState(true);
    const previousScroll = useRef(0);

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const mobileMenu = useRef<HTMLDivElement | null>(null);


    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= previousScroll.current) {
                setDisplay(true);
            } else if (display) {
                setDisplay(false);
                setShowMobileMenu(false);
            }

            previousScroll.current = currentScrollY;

        }

        document.addEventListener("scroll", handleScroll);
        return () => document.removeEventListener("scroll", handleScroll);

    }, [display])

    useEffect(() => {

        function handleClickOutside(event: Event) {
            if (mobileMenu.current
                && event.target instanceof HTMLElement
                && !mobileMenu.current.contains(event.target)) {
                setShowMobileMenu(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [mobileMenu])


    return (
        <nav className={`fixed   w-full  ${display ? 'top-0' : '-top-[100%]'}  transition-all duration-1000 will-change-scroll z-[100] pointer-events-none`}>

            <BigContainer>
                <div className="w-full flex flex-row justify-between items-start">
                    <LanguageSwitch
                        language={languageSwitch.language}
                        czech={languageSwitch.czech}
                        english={languageSwitch.english}
                    />


                    <div
                        ref={mobileMenu}
                        className="hexagon-navbar md:mt-4 pointer-events-auto
                    flex flex-col  xmd:flex-row flex-wrap 
                     " >

                        <div
                            className="hexagon menuIcon cursor-pointer"
                            onClick={() => setShowMobileMenu((prev: boolean) => !prev)}
                        >
                            <a>
                                <div className="inner-hexagon font-bold text-lg select-none">
                                    <Hamburger closed={showMobileMenu} />
                                </div>
                            </a>
                        </div>


                        {pageIds.map((elementID: keyof typeof navbar, index: number) => {
                            return (
                                <div key={elementID}
                                    onClick={() => setShowMobileMenu(false)}
                                    className={`hexagon hover:scale-110 duration-500 ${delayClass[index]}
                                 xmd:opacity-100 xmd:pointer-events-auto xmd:delay-0 xmd:scale-100
                                ${showMobileMenu ? 'opacity-100 pointer-events-auto scale-100'
                                            : 'opacity-0 pointer-events-none scale-0'}
                                `}>
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