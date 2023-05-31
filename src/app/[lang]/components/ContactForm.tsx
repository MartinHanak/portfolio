import { prisma } from "../../../db"
import { redirect } from 'next/navigation';
import sendMail from "../util/mail";


export function ContactForm() {

    const createMessage = async (data: FormData) => {
        "use server"

        const message = data.get("message")?.valueOf()
        const email = data.get("email")?.valueOf()

        if (typeof message !== "string" || message.length === 0) {
            throw new Error("invalid message")
        }
        if (typeof email !== "string" || email.length === 0) {
            throw new Error("invalid mail")
        }

        await prisma.message.create({ data: { message: message, email: email } })
        console.log(message)

        sendMail(email, message)

        redirect('/')

    }


    //ERROR: generateStaticParams causes submit not to work
    // https://github.com/vercel/next.js/issues/49408
    return (
        <form action={createMessage}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />

            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" cols={30} rows={10}></textarea>

            <button type="submit" >Send Message</button>
        </form>
    )
}