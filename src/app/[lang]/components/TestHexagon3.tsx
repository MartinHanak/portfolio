const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export function TestHexagon3() {
    return (
        <div className="hexagon-wrapper hexagon-grid" id="about">
            <div className="hexagon-container">
                {numbers.map((number) => {
                    return (
                        <div key={number} className="hexagon">
                            <div className="inner-hexagon"></div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}