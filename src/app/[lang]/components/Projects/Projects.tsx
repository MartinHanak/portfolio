
import { useTranslation } from '@/app/i18n'
import { Project } from './Project'
import { ProjectInfo } from './ProjectInfo';
import { Locale } from '@/i18n-config';

interface Projects {
    lang: Locale
}

export async function Projects({ lang }: Projects) {
    const { t } = await useTranslation(lang, 'gravitoriumProject');

    const t_quiz = (await useTranslation(lang, 'quizzillionaireProject')).t;
    const t_quiz_backend = (await useTranslation(lang, 'quizzillionaireProjectBackend')).t;
    const t_portfolio = (await useTranslation(lang, 'portfolioProject')).t;

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
                    otherTechList={['SCSS modules', 'NASA API', 'i18next']}
                    websiteURL={'https://www.gravitorium.com/'}
                    githubURL={'https://github.com/MartinHanak/PlanetsPlayground'}
                />
            </Project>



            <Project
                lang={lang}
                name="Quizzillionaire"
                shortDescription={t_quiz('shortDescription')}
                videoURL='/quizzillionaire.mp4'
            >
                <ProjectInfo
                    lang={lang}
                    name={"Frontend"}
                    shortDescription={t_quiz('shortDescription')}
                    longDescription={t_quiz('longDescription', { returnObjects: true })}
                    technologyDescription={t_quiz('technologyDescription', { returnObjects: true })}
                    mainTechList={['React', 'Redux Toolkit', 'Tailwind CSS']}
                    otherTechList={['Async Thunks', 'Event Source', 'Server-Sent Events']}
                    websiteURL={'https://www.quizzillionaire.com/'}
                    githubURL={'https://github.com/MartinHanak/pixel_frontend'}
                />

                <ProjectInfo
                    lang={lang}
                    name={"Backend"}
                    shortDescription={t_quiz_backend('shortDescription')}
                    longDescription={t_quiz_backend('longDescription', { returnObjects: true })}
                    technologyDescription={t_quiz_backend('technologyDescription', { returnObjects: true })}
                    mainTechList={['Express', 'Node.js', 'Sequelize']}
                    otherTechList={['JWT', 'bcrypt', 'Jest', 'SQL', 'Postgres', 'OpenAI', 'ChatGPT']}
                    websiteURL={'https://www.quizzillionaire.com/'}
                    githubURL={'https://github.com/MartinHanak/pixel_backend'}
                />
            </Project>

            <Project
                lang={lang}
                name="Portfolio"
                shortDescription={t_portfolio('shortDescription')}
                videoURL='/portfolio.mp4'
            >
                <ProjectInfo
                    lang={lang}
                    name={"Portfolio"}
                    shortDescription={t_portfolio('shortDescription')}
                    longDescription={t_portfolio('longDescription', { returnObjects: true })}
                    technologyDescription={t_portfolio('technologyDescription', { returnObjects: true })}
                    mainTechList={['Next.js', 'Tailwind CSS', 'Web Animations API']}
                    otherTechList={['i18next', 'prisma', 'MySQL', 'Server Components', 'Client Components', 'SEO']}
                    websiteURL={'https://www.martinhanak.com/'}
                    githubURL={'https://github.com/MartinHanak/portfolio'}
                />
            </Project>


        </div>
    )
}