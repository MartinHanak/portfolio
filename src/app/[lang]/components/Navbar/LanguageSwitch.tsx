"use client"
import Link from 'next/link'
import { LanguageSwitchLabels } from './Navbar'
import { useState, useRef, useEffect } from 'react';

import CzechFlag from '../../../../../public/Czech_flag.svg'
import EnglishFlag from '../../../../../public/UK_flag.svg'


export function LanguageSwitch({ language, czech, english }: LanguageSwitchLabels) {

    const [display, setDisplay] = useState(false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {

        function handleClickOutside(event: Event) {
            if (wrapperRef.current
                && event.target instanceof HTMLElement
                && !wrapperRef.current.contains(event.target)) {
                setDisplay(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [wrapperRef])



    return (
        <div ref={wrapperRef}
            className="hexagon-language-switch md:mt-4
        flex flex-col md:flex-row flex-wrap  gap-1 md:gap-0
        -mr-32 md:mr-0
        "
            onMouseLeave={() => setDisplay(false)}>


            <div className="hexagon hover:transform-none select-none cursor-pointer"
                onMouseEnter={() => setDisplay(true)}
                onClick={() => setDisplay((prev: boolean) => !prev)}

            >
                <div className="inner-hexagon flex-col gap-1">
                    <span className='block pt-2'>{language}</span>
                    <div className='h-auto w-6 border-solid border-black border-[1px]'>{language === "Language" ? <EnglishFlag /> : <CzechFlag />}</div>
                </div>
            </div>


            <Link href={`/en`} className={`${display ? 'opacity-1' : 'opacity-0 pointer-events-none'}  transition-all duration-1000`}>
                <div className={`hexagon 
                    transition-all duration-1000 transform ${display ? ' scale-1' : 'scale-0 '}
                    hover:scale-110 hover:duration-500 hover:delay-0`}>
                    <div className="inner-hexagon englishBg">
                        <span className='block text-center w-full py-2 bg-black bg-opacity-70 text-white font-bold '>{english}</span>
                    </div>
                </div>
            </Link>

            <Link href={`/cs`} className={`${display ? 'opacity-1' : 'opacity-0 pointer-events-none'}  
                transition-all duration-1000 delay-100 `}>
                <div className={`hexagon 
                    transition-all duration-1000 delay-100 transform ${display ? ' scale-1' : 'scale-0 '} hover:scale-110 hover:duration-500 hover:delay-0`}>
                    <div className="inner-hexagon czechBg">
                        <span className='block text-center w-full py-2 bg-black bg-opacity-70 text-white font-bold '>{czech}</span>
                    </div>
                </div>
            </Link>

        </div>
    )
}