import { GridCover } from "./GridCover"

interface Hero {
    id: string
}

export function Hero({ id }: Hero) {
    return (
        <div id={id} className="relative w-full h-full mb-[300px]">
            <div className=" text-6xl font-bold py-16 px-4 animate-waveReverse ">
                Hello World<br />
                Test<br />
                test 2
            </div>

            <GridCover />
        </div>

    )
}