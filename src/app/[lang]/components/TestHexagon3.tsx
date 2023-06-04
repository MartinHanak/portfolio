const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export function TestHexagon3() {
    return (
        <div className="hexagon-wrapper3">
            <div className="hexagon-container3">
                {numbers.map((number) => {
                    return (
                        <div key={number} className="hexagon3">
                            <div className="inner-hexagon3"></div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}