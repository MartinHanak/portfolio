import React from "react"

interface Background {
    children: React.ReactNode
}

export function Background({ children }: Background) {
    return (
        <div className="bg-gray-300 pb-8 pt-32 md:pt-64 px-4 w-full">
            {children}
        </div>
    )
}