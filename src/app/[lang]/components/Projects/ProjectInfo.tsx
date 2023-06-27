import { useTranslation } from "@/app/i18n";
import { Locale } from "@/i18n-config";

import { ButtonLink } from "./ButtonLink";

export interface ProjectInfo {
    lang: Locale,

    name: string,
    shortDescription: string,
    longDescription: string | string[],

    technologyDescription: string | string[],
    mainTechList: string[],
    otherTechList?: string[],

    websiteURL: string,
    githubURL: string,
}


export async function ProjectInfo({ lang, name, shortDescription, longDescription, technologyDescription, mainTechList,
    otherTechList, websiteURL, githubURL }: ProjectInfo) {

    const { t } = await useTranslation(lang, 'projects');

    return (
        <div className="grid grid-cols-1 grid-rows-content md:grid-cols-2 md:grid-rows-1 mt-8 mb-8">

            <div className="p-4 pr-8  border-solid border-black border-b-2 md:border-b-0">
                <h4 className="text-2xl md:text-4xl font-bold mb-4">{name}</h4>

                {Array.isArray(longDescription) ? longDescription.map(
                    (paragraphText: string, index: number) => { return (<p key={index} className="mb-4">{paragraphText}</p>) }
                ) : <p>longDescription</p>}

                <div className="flex flex-row flex-wrap gap-2 mt-8 mb-16">

                    <ButtonLink href={websiteURL} buttonText={t('websiteLink')} />

                    <ButtonLink href={githubURL} buttonText="GitHub" />

                </div>
            </div>

            <div className="p-4 pl-4 pt-0 mt-4
            even:md:border-solid  even:md:border-black  even:md:border-l-2  ">

                <h5 className="text-lg md:text-2xl font-bold mb-4 mt-2">{t('usedTechnologiesTitle')}</h5>


                <ul className="mb-4 pl-8">
                    {mainTechList.map((tech: string) => {
                        return (
                            <li key={tech} className={`font-bold text-lg dash-list`}>
                                {tech}
                            </li>)
                    })}
                </ul>

                {Array.isArray(technologyDescription) ? technologyDescription.map(
                    (paragraphText: string, index: number) => { return (<p key={index} className="mb-4">{paragraphText}</p>) }
                ) : <p>technologyDescription</p>}





                {otherTechList && <>
                    <h5 className="text-lg md:text-2xl font-bold mb-4 mt-8">{t('otherTechnologiesTitle')}</h5>
                    <ul className="flex flex-row flex-wrap gap-2">
                        {otherTechList.map((tech: string) => {
                            return (<li key={tech} className="block list-none bg-gray-950 text-white rounded-md text-sm px-2 py-1">
                                {tech}
                            </li>)
                        })}
                    </ul>
                </>}


            </div>
        </div>
    )
}