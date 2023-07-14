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

            <div className="flex items-center justify-center mt-4 mb-16 md:mt-0 md:mb-0">
                <div className=" border-solid border-black border-4 py-4 transform scale-x-75">
                    <div className=" transform scale-x-[1.3333] flex flex-col items-stretch xsm:items-start justify-center pl-4 lg:pl-0">
                        <div className="bg-white pt-2">
                            {`${t('aboveName')} ${t('beforeName')}`}
                        </div>
                        <div className="text-3xl xsm:text-4xl font-bold bg-white">
                            {t('name')}
                        </div>
                        <div className="bg-white  xsm:text-xl md:text-base lg:text-xl pb-2 ">
                            {t('belowName')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 lg:pl-0 lg:pr-0">

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