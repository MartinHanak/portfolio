const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

export function TestHexagon2() {
    return (

        <div className="hexagon-container2">
            {numbers.map((number) => {
                return (
                    <div key={number} className="hexagon2"></div>
                )
            })}
        </div>

    )
}