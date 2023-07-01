"use client"
// DOES NOT WORK WITHOUT CHECKING WINDOW:   import ReactPlayer from "react-player"
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { PlayIcon } from "./PlayIcon";
const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

export interface VideoPlayer {
    videoURL: string,
    previewImage: string
}

export function VideoPlayer({ videoURL, previewImage }: VideoPlayer) {



    return (
        <Suspense fallback={<div className="w-full h-full bg-white"></div>}>
            <div className="w-full aspect-video bg-white">

                <ReactPlayer
                    url={videoURL} width='100%' height='100%' muted playing loop
                    playIcon={<PlayIcon />}
                    light={<img src={previewImage} alt={`${videoURL} Thumbnail`} />}
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