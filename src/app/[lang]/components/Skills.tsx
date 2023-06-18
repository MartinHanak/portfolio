export function Skills() {
    return (
        <div id="Skills" className="flex flex-col justify-center items-stretch">

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
        <div className="border-t-2 border-solid border-black">
            <div>
                <h3 className="text-2xl font-bold select-none">{name}</h3>
            </div>
            <div>
                skills here...
            </div>
        </div>
    )
}