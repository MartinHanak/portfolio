
import { useTranslation } from '@/app/i18n'
import { Project } from './Project'
import { ProjectInfo } from './ProjectInfo';
import { Locale } from '@/i18n-config';

interface Projects {
    lang: Locale
}

export async function Projects({ lang }: Projects) {
    const { t } = await useTranslation(lang, 'gravitoriumProject');
    return (
        <div id="Projects">
            <h2 className="text-4xl font-bold">Projects</h2>
            <p>projects description here....</p>


            <Project
                lang={lang}
                name="Gravitorium"
                shortDescription={t('shortDescription')}
                videoURL='/gravitorium.mp4'
            >
                <ProjectInfo
                    lang={lang}
                    name={"Gravitorium"}
                    shortDescription={t('shortDescription')}
                    longDescription={t('longDescription', { returnObjects: true })}
                    technologyDescription={t('technologyDescription', { returnObjects: true })}
                    mainTechList={['React', 'React Three Fiber', 'Three.js']}
                    otherTechList={['CSS modules', 'NASA API', 'i18next']}
                    websiteURL={'https://www.gravitorium.com/'}
                    githubURL={'https://github.com/MartinHanak/PlanetsPlayground'}
                />
            </Project>


        </div>
    )
}