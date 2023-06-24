require('dotenv').config()
import * as nodeMailer from 'nodemailer' 


export default function sendMail(email: string, message: string) {


    const newMailMessage = {
        from: email,
        to: 'martinhanak97@gmail.com',
        subject: `Portfolio email from ${email}`,
        text: message,
        html: `<p>${message}</p>`,
    }

    const transporter = nodeMailer.createTransport({
        //port: 465,
        //host: "smtp.gmail.com",
        service: 'Gmail',
        auth: {
            user: process.env.GMAIL_EMAIL_ADDRESS,
            pass: process.env.GMAIL_EMAIL_PASSWORD,
        },
        secure: true,
    })

    transporter.sendMail(newMailMessage, function (err, info) {
        if(err)
            console.log(err)
        else
            console.log(info)
    })
}