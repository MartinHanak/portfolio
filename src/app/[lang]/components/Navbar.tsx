import Link from "next/link"
import { LanguageSwitch } from "./LanguageSwitch"
const pageIds: string[] = ["Home", "About", "Skills", "Projects", "Contact"]

export function Navbar() {
    return (
        <nav>

            <LanguageSwitch />

            <div className="hexagon-wrapper hexagon-navbar" id="about">
                <div className="hexagon-container">

                    <div className="md:hidden">
                        <div className="hexagon">
                            <a href="">
                                <div className="inner-hexagon">
                                    Menu
                                </div>
                            </a>
                        </div>
                    </div>


                    {pageIds.map((elementID: string) => {
                        return (
                            <div key={elementID} className="hexagon">
                                <a href={`#${elementID}`}>
                                    <div className="inner-hexagon">
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