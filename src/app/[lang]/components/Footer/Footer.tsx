import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { Container } from "../Containter";
import { useTranslation } from "@/app/i18n";

interface Footer {
    id: string,
    lang: string
}

export async function Footer({ id, lang }: Footer) {

    const t_contact = (await useTranslation(lang, 'contact')).t

    const t_footer = (await useTranslation(lang, 'footer')).t


    return (
        <footer className="w-full bg-gray-900 py-16">
            <Container>
                <div className="grid grid-rows-2 grid-cols-1 gap-8 md:grid-rows-1 md:grid-cols-2 px-8">
                    <ContactForm id={id}
                        heading={t_contact('heading')}
                        emailHeading={t_contact('email')}
                        messageHeading={t_contact('message')}
                        send={t_contact('send')}
                        sentNotification={t_contact('sentNotification')} />
                    <ContactInfo belowName={t_footer('belowName')} />
                </div>
            </Container>
        </footer>
    )
}