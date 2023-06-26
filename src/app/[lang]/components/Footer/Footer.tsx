import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { Container } from "../Containter";
import { useTranslation } from "@/app/i18n";

export async function Footer({ lang }: { lang: string }) {

    const t_contact = (await useTranslation(lang, 'contact')).t

    const t_footer = (await useTranslation(lang, 'footer')).t


    return (
        <footer className="w-full bg-gray-900 py-16">
            <Container>
                <div className="grid grid-rows-2 grid-cols-1 gap-8 md:grid-rows-1 md:grid-cols-2 px-8">
                    <ContactForm heading={t_contact('heading')} emailHeading={t_contact('email')} messageHeading={t_contact('message')} send={t_contact('send')} />
                    <ContactInfo belowName={t_footer('belowName')} />
                </div>
            </Container>
        </footer>
    )
}