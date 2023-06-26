import { ExternalLinkIcon } from "./ExternalLinkIcon"
import { GithubIcon } from "./GithubIcon"

interface ButtonLink {
    href: string,
    buttonText: string

}

export function ButtonLink({ href, buttonText }: ButtonLink) {
    return (
        <a href={href} target="_blank" className="flex items-center justify-between p-2 gap-2 border-solid border-black border-2 hover:bg-gray-800 hover:text-white group">
            <span className='text-lg font-bold'>{buttonText}</span>
            <div className="h-8 w-8">
                {buttonText === "GitHub" ? <GithubIcon /> : <ExternalLinkIcon />}
            </div>
        </a>
    )
}