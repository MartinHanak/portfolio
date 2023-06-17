import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";
import { Container } from "./Containter";

export function Footer() {

    // TODO: 2 columns on PC, 1 on mobile
    // right = contact form
    // add animation to labels?
    // left = name + short description
    //  add email 
    // icons to: GitHub, (Linkedin), Mail, (twitter?)


    return (
        <footer className="w-full bg-gray-950 px-4 py-16">
            <Container>
                <div className="grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </Container>
        </footer>
    )
}