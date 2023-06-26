import { GridCover } from "./GridCover"

export function Hero() {
    return (
        <div id="Home" className="relative w-full h-full mb-[300px]">
            <div className=" text-6xl font-bold py-16 px-4 animate-waveReverse ">
                Hello World<br />
                Test<br />
                test 2
            </div>

            <GridCover />
        </div>

    )
}