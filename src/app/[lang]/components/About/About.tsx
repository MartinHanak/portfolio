import { useTranslation } from "@/app/i18n";
import { Locale } from "@/i18n-config"

interface About {
    id: string,
    lang: Locale
}

export async function About({ id, lang }: About) {

    const { t } = await useTranslation(lang, 'about');


    const bigText = t('bigText');
    const aboutText: string[] | string = t('about', { returnObjects: true });

    return (
        <section id={id} className="grid grid-rows-content grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-4 mt-16">
            <div className="flex flex-col justify-center items-start px-4 lg:px-0">
                <span className="block">{t('aboveName')} {t('beforeName')}</span>
                <span className="block text-4xl font-bold">{t('name')}</span>
                <span className="block text-lg mb-8">{t('belowName')}</span>

                <p className="mb-16">{t('belowBelowName')}</p>
            </div>
            <div className="px-4 lg:px-0">

                <h2 className="text-4xl font-bold mb-4 ">{t('title')}</h2>

                {Array.isArray(aboutText) ? aboutText.map((paragraphText: string, index: number) => {
                    return (
                        <p key={index} className="mb-4">{paragraphText}</p>
                    )
                })
                    : <p className="mb-4">{aboutText}</p>}
            </div>
        </section>
    )
}