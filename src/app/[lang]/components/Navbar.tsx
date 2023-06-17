import Link from "next/link"
import { LanguageSwitch } from "./LanguageSwitch"
const pageIds: string[] = ["Home", "About", "Skills", "Projects", "Contact"]
const hoverColors: string[] = ["hover:bg-red-500", "hover:bg-yellow-500", "hover:bg-cyan-500", "hover:bg-orange-500", "hover:bg-green-500",]

export function Navbar() {
    return (
        <nav>

            <LanguageSwitch />

            <div className="hexagon-wrapper hexagon-navbar" id="about">
                <div className="hexagon-container">

                    <div className="md:hidden">
                        <div className="hexagon">
                            <a>
                                <div className="inner-hexagon font-bold text-lg">
                                    Menu
                                </div>
                            </a>
                        </div>
                    </div>


                    {pageIds.map((elementID: string, index: number) => {
                        return (
                            <div key={elementID} className="hexagon">
                                <a href={`#${elementID}`}>
                                    <div className={`inner-hexagon font-bold text-lg ${hoverColors[index]}`}>
                                        {elementID}
                                    </div>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}