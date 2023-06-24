"use client"
import React, { useState, useEffect } from 'react'
// error with Next js hydration:
//      https://github.com/cookpete/react-player/issues/1428
// solutions:
// dynamic import
// OR
// check for window object before rendering ReactPlayer

//
// DOES NOT WORK WITHOUT CHECKING WINDOW:   import ReactPlayer from "react-player"
//
import ReactPlayer from "react-player";

interface Project {
    url: string
}


export function Project({ url }: Project) {
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    return (
        <div className="relative w-full aspect-video bg-orange-400 my-4">
            {hasWindow && <ReactPlayer url={url} width={'100%'} height={'100%'} muted playing loop
                config={{
                    file: {
                        attributes: {
                            crossOrigin: "true",
                        }
                    }
                }}
            />}
        </div>
    )
}