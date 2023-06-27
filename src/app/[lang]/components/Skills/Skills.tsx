import { SkillList } from "./SkillList";

interface Skills {
    id: string
}

export function Skills({ id }: Skills) {
    return (
        <div id={id} className="flex flex-col justify-center items-stretch my-8">

            <h2 className="text-4xl font-bold">My Skills</h2>
            <p>short description....</p>

            <SkillsSection name="Frontend" />
            <SkillsSection name="Backend" />
            <SkillsSection name="Tools" />
        </div>
    )
}

interface SkillsSection {
    name: string,
}

function SkillsSection({ name }: SkillsSection) {

    return (
        <div className="border-t-2 border-solid border-black mt-4 pt-4 grid grid-cols-1 grid-rows-content md:grid-rows-1 md:grid-cols-third
        group">

            <div>
                <h3 className="text-2xl font-bold select-none mb-4 w-auto inline-block relative overflow-hidden">
                    <span className={`after:content-[''] after:block after:h-1 ${getBackgroundColor(name)} after:w-3/4 after:mt-1  after:-translate-x-full after:transition-transform group-hover:after:-translate-x-0 after:duration-500`}>
                        {name}
                    </span>
                </h3>
            </div>

            <div className="pb-[50px]">
                <SkillList name={name} />
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