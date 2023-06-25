import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '@/app/i18n/settings'
import { useTranslation } from '@/app/i18n'
import { Locale } from '@/i18n-config'

interface LanguageSwitch {
    lang: Locale
}

export const LanguageSwitch = async ({ lang }: LanguageSwitch) => {

    const { t } = await useTranslation(lang, 'common ')

    return (
        <div className="hexagon-wrapper hexagon-language-switch">
            <div className="hexagon-container pt-4 ">

                <div className="hexagon ">
                    <div className="inner-hexagon">
                        Language
                    </div>
                </div>

                <a href={`/en`}>
                    <div className="hexagon">
                        <div className="inner-hexagon">
                            English
                        </div>
                    </div>
                </a>

                <a href={`/cs`}>
                    <div className="hexagon">
                        <div className="inner-hexagon">
                            Czech
                        </div>
                    </div>
                </a>

            </div>
        </div>
    )
}