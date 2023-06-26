"use client"
import React, { useState, useEffect, useRef, ReactElement, Suspense } from 'react'
// error with Next js hydration:
//      https://github.com/cookpete/react-player/issues/1428
// solutions:
// dynamic import
// OR
// check for window object before rendering ReactPlayer

//
// DOES NOT WORK WITHOUT CHECKING WINDOW:   import ReactPlayer from "react-player"
//


import { ProjectInfo } from './ProjectInfo';
import { Locale } from '@/i18n-config';
import { VideoPlayer } from './VideoPlayer';

export interface Project {
    lang: Locale,

    name: string,
    shortDescription: string,

    videoURL: string,

    children: React.ReactNode
}


export function Project({ lang, name, shortDescription, videoURL, children }: Project) {
    const [hasWindow, setHasWindow] = useState(false);

    const playerRef = useRef();

    const [borderCornerShift, setBorderCornerShift] = useState(0.5) // in rem
    const [angledCorners, setAngledCorners] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <div className=" w-full  my-4 mb-16  bg-gray-200 p-4">

            <h3 className="text-4xl font-bold mb-2 mt-4 ml-4">{name}</h3>

            <p className='text-lg mb-8 ml-4'>{shortDescription}</p>

            <div className='relative w-full aspect-video z-10 p-2 '>

                {hasWindow ? <VideoPlayer videoURL={videoURL} /> : <div className='w-full h-full bg-white'></div>}

                <div
                    style={angledCorners ? {
                        clipPath: `polygon(0 0, 
                calc(100% - ${borderCornerShift}rem) ${borderCornerShift}rem,
                100% 100%,
                ${borderCornerShift}rem calc(100% - ${borderCornerShift}rem)
                )`} : undefined}
                    className='absolute w-3/4 h-3/4 bg-black top-0 left-0 -z-10'>
                </div>
                <div
                    style={angledCorners ? {
                        clipPath: `polygon(0 0,
                    calc(100% - ${borderCornerShift}rem) ${borderCornerShift}rem,
                    100% 100%,
                    ${borderCornerShift}rem calc(100% - ${borderCornerShift}rem)
                    )`
                    } : undefined}
                    className='absolute w-3/4 h-3/4 bg-black bottom-0 right-0 -z-10'>
                </div>
            </div>

            {children}


        </div>
    )
}