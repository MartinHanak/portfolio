const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function TestHexagon() {
    return (
        <div className="hexagon-wrapper">
            <div className="hexagon-container">
                {numbers.map((number) => {
                    return (
                        <div key={number} className="hexagon"></div>
                    )
                })}
            </div>
        </div>
    )
}