import { ContactForm } from "./ContactForm";
import { Container } from "./Containter";

export function Footer() {
    return (
        <footer className="w-full bg-gray-950 p-4">
            <Container>
                <ContactForm />
            </Container>
        </footer>
    )
}