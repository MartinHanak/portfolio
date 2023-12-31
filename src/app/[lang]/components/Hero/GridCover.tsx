"use client"
import React, { useState, useRef, useEffect } from "react";



interface GridCover {
    resetParentAnimation: () => void
}


export function GridCover({ resetParentAnimation }: GridCover) {
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const [previousWidth, setPreviousWidth] = useState(0);

    const [hexagonChildren, setHexagonChildren] = useState<React.ReactNode[]>([])

    const grid = useRef<null | HTMLDivElement>(null);

    const updateSize = () => {
        // only run when width changed, not height
        if (window.innerWidth !== previousWidth) {
            setPreviousWidth(window.innerWidth)

            if (grid.current !== null) {
                setWidth(grid.current.offsetWidth);
                setHeight(grid.current.offsetHeight);

                let rowLength = Number(getCssVarValue('hexagons-in-row'));
                if (isNaN(rowLength)) {
                    rowLength = 5;
                }

                let gapSize = Number(getCssVarValue('gap-size'));
                if (isNaN(gapSize)) {
                    gapSize = 4;
                }

                // row length = 1.5 * sideLength * numberOfHexagonsInRow
                const hexagonSide = (grid.current.offsetWidth - (rowLength - 1) * gapSize) / (1.5 * (rowLength - 1) + 2);

                // set new hexagonSide css var
                setCssVarValue('hexagon-side-length', `${hexagonSide}px`)

                // get all other values from new hexagon size
                const hexagonHeight = 2 * 0.866 * hexagonSide;
                const hexagonWidth = 2 * hexagonSide;

                const rowNumber = Math.floor(grid.current.offsetHeight / (hexagonHeight + gapSize));




                // wave travel speed in px/s
                const waveSpeed = 200;
                // wave start
                const center = [grid.current.offsetWidth / 3, grid.current.offsetHeight / 2]

                const hexagonArray = [];

                const time = Date.now()

                for (let col = 0; col < rowLength; col++) {
                    for (let row = 0; row < rowNumber; row++) {
                        // determine position (x,y)
                        let x = 0;
                        let y = 0;
                        if (col % 2 === 0) {
                            // even columns
                            x = 0 + (hexagonWidth + hexagonSide + 2 * gapSize) * Math.floor(col / 2);
                            y = 0 + (hexagonHeight + gapSize) * row;
                        } else {
                            // odd columns
                            x = (3 / 2 * hexagonSide + gapSize) + (hexagonWidth + 2 * gapSize + hexagonSide) * (Math.floor((col - 1) / 2))
                            y = (hexagonHeight / 2 + gapSize / 2) + (hexagonHeight + gapSize) * row;
                        }

                        // decide if displayed at all (corners can be omitted, center around text omitted)
                        let hide = false;
                        if ((col === 0 && row === 0) || (col === rowLength - 1 && row === rowNumber - 1) && rowLength % 2 === 0) {
                            hide = true;
                        }

                        // determine animation delay - depends on distance from the center
                        const hexagonCenter = [x + hexagonWidth / 2, y + hexagonHeight / 2];
                        let delay = Math.sqrt((hexagonCenter[0] - center[0]) ** 2 + (hexagonCenter[1] - center[1]) ** 2) / waveSpeed; // in s

                        // background image shift
                        //      image size set to container width + auto height
                        //      background position given by x, y WITHOUT GAPS
                        let backgroundPoxX = x - col * gapSize;
                        let backgroundPoxY = y - row * gapSize;

                        hexagonArray.push((
                            <div
                                key={`col${col}row${row}time${time}`} // unique key to force rerender if size changed
                                style={{
                                    left: x, top: y, animationDelay: `${delay}s`,
                                    //  backgroundImage: `url('${backgroundImage.src}')`,
                                    backgroundSize: `${grid.current.offsetWidth}px auto`,
                                    backgroundPosition: `left -${backgroundPoxX}px top -${backgroundPoxY}px`
                                }}
                                className={`absolute-hexagon w-4 h-4 absolute top-0 left-0 opacity-0  ${hide ? 'opacity-0' : 'animate-wave'}`}>

                            </div>
                        ))
                    }
                }

                setHexagonChildren(hexagonArray);
                // synchronize animation with parent
                resetParentAnimation();
            }
        }
    }

    useEffect(() => {
        updateSize();

        // TODO: change from updateSize to updatePositionsOnly
        // not to recreate all again
        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);

    }, [previousWidth])

    return (
        <div ref={grid}
            className="hero-hexagon-grid absolute top-0 left-0 w-full h-full ">
            {hexagonChildren}
        </div>
    )
}

function getCssVarValue(variableName: string) {

    const value: string = getComputedStyle(
        document.documentElement
    ).getPropertyValue(`--${variableName}`);

    return value;
}

function setCssVarValue(variableName: string, value: string) {
    document.documentElement.style.setProperty(`--${variableName}`, value);
}