"use client"
import { SkillList } from "./SkillList"

interface SkillsSection {
    name: string,
    description: string,
    active: boolean,
    onClick: () => void
}


export function SkillsSection({ name, description, active, onClick }: SkillsSection) {

    return (
        <div
            onClick={onClick}
            className="border-t-2 border-solid border-black  pt-4 grid grid-cols-1 grid-rows-content lg:grid-rows-1 lg:grid-cols-third
            overflow-hidden
        group">

            <div className="mx-4 lg:mx-0">
                <h3 className="text-2xl font-bold select-none mb-4 w-auto inline-block relative overflow-hidden">
                    <span className={`after:content-[''] after:block after:h-1 ${getBackgroundColor(name)} after:w-3/4 after:mt-1  after:-translate-x-full after:transition-transform group-hover:after:-translate-x-0 after:duration-500`}>
                        {name}
                    </span>
                </h3>
                <p className="mb-8">
                    {description}
                </p>
            </div>

            <div className="">
                <SkillList active={active} name={name} />
            </div>

        </div>
    )
}


function getBackgroundColor(name: string) {
    if (name === 'Frontend') {
        return 'after:bg-yellow-500';
    } else if (name === 'Backend') {
        return 'after:bg-blue-500'
    } else {
        return 'after:bg-green-500'
    }
}