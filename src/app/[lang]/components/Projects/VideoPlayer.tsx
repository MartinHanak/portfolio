"use client"
// DOES NOT WORK WITHOUT CHECKING WINDOW:   import ReactPlayer from "react-player"
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface VideoPlayer {
    videoURL: string
}

export function VideoPlayer({ videoURL }: VideoPlayer) {

    const [playing, setPlaying] = useState(false);

    return (
        <Suspense fallback={<div className="w-full h-full bg-white"></div>}>
            <div className="w-full aspect-video bg-white"
                onClick={() => setPlaying(true)}>

                <ReactPlayer
                    url={videoURL} width='100%' height='100%' muted light playing={playing} loop
                    config={{
                        file: {
                            attributes: {
                                crossOrigin: "true",
                            }
                        }
                    }}
                />

            </div>
        </Suspense>
    );
}