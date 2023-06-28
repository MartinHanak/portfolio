import { Locale } from "@/i18n-config";
import { SkillList } from "./SkillList";
import { useTranslation } from "@/app/i18n";

interface Skills {
    id: string,
    lang: Locale
}

export async function Skills({ id, lang }: Skills) {

    const { t } = await useTranslation(lang, 'skills');

    const descriptionArray: string[] | string = t('skillsDescription', { returnObjects: true })

    return (
        <div id={id} className="flex flex-col justify-center items-stretch my-8 mt-32">

            <h2 className="text-4xl font-bold mx-4 lg:mx-0">{t('heading')}</h2>

            {null && <div className="w-3/4">
                {Array.isArray(descriptionArray) ? descriptionArray.map((paragraphText: string, index: number) => {
                    return (<p key={index} className="mb-4">
                        {paragraphText}
                    </p>)
                })
                    : <p>descriptionArray</p>}
            </div>}

            <SkillsSection name="Frontend" description={t('frontend')} />
            <SkillsSection name="Backend" description={t('backend')} />
            <SkillsSection name="Tools" description={t('tools')} />
        </div>
    )
}

interface SkillsSection {
    name: string,
    description: string
}

async function SkillsSection({ name, description }: SkillsSection) {

    return (
        <div className="border-t-2 border-solid border-black mt-4 pt-4 grid grid-cols-1 grid-rows-content lg:grid-rows-1 lg:grid-cols-third
        group">

            <div className="mx-4 lg:mx-0">
                <h3 className="text-2xl font-bold select-none mb-4 w-auto inline-block relative overflow-hidden">
                    <span className={`after:content-[''] after:block after:h-1 ${getBackgroundColor(name)} after:w-3/4 after:mt-1  after:-translate-x-full after:transition-transform group-hover:after:-translate-x-0 after:duration-500`}>
                        {name}
                    </span>
                </h3>
                <p>
                    {description}
                </p>
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