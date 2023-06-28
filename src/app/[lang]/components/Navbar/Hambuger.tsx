"use client"

interface Hamburger {
    closed: boolean
}

export function Hamburger({ closed }: Hamburger) {
    return (
        <svg viewBox="0 -5 80 10" width="40" height="40">
            <line x1="10" x2="70" y1="0" y2="0" stroke="black" strokeWidth="10" strokeLinecap="round"
                transform={closed ? `rotate(45 40 0)` : 'translate(0 -20)'}
            />
            <line x1="10" x2="70" y1="0" y2="0" stroke="black" strokeWidth="10" strokeLinecap="round"
                transform={closed ? `translate(100 0)` : 'translate(0 0)'}
            />
            <line x1="10" x2="70" y1="0" y2="0" stroke="black" strokeWidth="10" strokeLinecap="round"
                transform={closed ? `rotate(-45 40 0)` : 'translate(0 20)'}
            />
        </svg>
    )
}