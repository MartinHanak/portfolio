import { useTranslation } from "@/app/i18n";
import { Project } from "./Project";
import { Locale } from "@/i18n-config";

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
        <div className="grid grid-cols-1 grid-rows-content md:grid-cols-2 md:grid-rows-1">

            <div>
                <h4>{name}</h4>
                {Array.isArray(longDescription) ? longDescription.map(
                    (paragraphText: string, index: number) => { return (<p key={index}>{paragraphText}</p>) }
                ) : <p>longDescription</p>}
            </div>

            <div>
                <h5>{t('usedTechnologiesTitle')}</h5>

                {Array.isArray(technologyDescription) ? technologyDescription.map(
                    (paragraphText: string, index: number) => { return (<p key={index}>{paragraphText}</p>) }
                ) : <p>technologyDescription</p>}

                <ul>
                    {mainTechList.map((tech: string) => {
                        return <li key={tech}>{tech}</li>
                    })}
                </ul>

                {otherTechList && <>
                    <h5>{t('otherTechnologiesTitle')}</h5>
                    <ul className="flex flex-row flex-wrap">
                        {otherTechList.map((tech: string) => <li key={tech} className="block list-none">{tech}</li>)}
                    </ul>
                </>}


            </div>
        </div>
    )
}