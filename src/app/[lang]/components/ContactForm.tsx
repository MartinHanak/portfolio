"use client"
import { prisma } from "../../../db"
import { redirect } from 'next/navigation';
import sendMail from "../util/mail";
import { FormEvent } from "react";


export function ContactForm() {


    /* server action solution - currently does not work with SSG in Next.js */
    /*
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
    */

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('submitting...');
    }


    //ERROR: generateStaticParams causes submit not to work
    // https://github.com/vercel/next.js/issues/49408
    return (
        <form id="Contact" className="text-white flex flex-col justify-center items-start  md:order-2 mb-16"
            onSubmit={handleSubmit}
        >

            <h3 className='font-bold text-4xl mb-4'>Contact Me</h3>

            <label className="mb-2" htmlFor="email">Your Email</label>
            <input className="text-black mb-4 w-3/4 p-2 rounded-sm" type="email" name="email" id="email" required />

            <label className="mb-2" htmlFor="message">Message</label>
            <textarea rows={7} className="text-black mb-4 w-full p-4 rounded-sm" name="message" id="message"></textarea>

            <button className="rounded-sm font-bold border-solid border-2 border-white px-4 py-2 w-full hover:bg-white hover:text-black" type="submit" >Send Message</button>
        </form>

    )
}