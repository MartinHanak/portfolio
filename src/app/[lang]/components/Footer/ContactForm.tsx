"use client"
import { FormEvent } from "react";
import { useState } from "react";
import { BACKEND_URL } from "../../config";
import { Modal } from "./Modal";

interface ContactForm {
    id: string,
    heading: string,
    emailHeading: string,
    messageHeading: string,
    send: string
}


export function ContactForm({ id, heading, emailHeading, messageHeading, send }: ContactForm) {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [showModal, setShowModal] = useState(false);

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


        const data = {
            message: message,
            email: email
        }

        const res = fetch(`${BACKEND_URL}/en/api`, {
            body: JSON.stringify(data),
            method: "post",
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response)
        }).catch((err) => {
            console.log(err)
        })

        // UI does not wait for fetch result
        setEmail('')
        setMessage('')
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false)
        }, 2000)

    }


    //ERROR: generateStaticParams causes submit not to work
    // https://github.com/vercel/next.js/issues/49408
    return (
        <form id={id} className="text-white relative flex flex-col justify-center items-start  md:order-2 mb-16"
            onSubmit={handleSubmit}
        >

            <Modal message="Email sent!" hidden={!showModal} />

            <h3 className='font-bold text-4xl mb-4'>{heading}</h3>

            <label className="mb-2" htmlFor="email">{emailHeading}</label>
            <input className="text-black mb-4 w-full md:w-3/4 px-4 py-2 rounded-sm" type="email" name="email" id="email" required value={email} onChange={(e) => { setEmail(e.target.value) }} />

            <label className="mb-2" htmlFor="message">{messageHeading}</label>
            <textarea required rows={7} className="text-black mb-4 w-full p-4 rounded-sm" name="message" id="message"
                value={message} onChange={(e) => { setMessage(e.target.value) }}></textarea>

            <button className="rounded-sm font-bold border-solid border-2 border-white px-4 py-2 w-full hover:bg-white hover:text-black" type="submit">{send}</button>
        </form>

    )
}