import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/db"
import sendMail from "../util/mail"


export async function GET() {
    const data = {"message": "Hello World"}

    const messages = await prisma.message.findMany();

    return NextResponse.json(messages)
}

export async function POST(request: NextRequest) {
        console.log("HELLO")

    const data = await request.json()
    
    if(!data.message || !data.email) {
        return NextResponse.json({ error: 'POST request does not contain email or message in its body' }, { status: 403 });
    }

    await prisma.message.create({ data: { message: data.message, email: data.email } })

    sendMail(data.email, data.message)

    return NextResponse.json({message: 'Email sent successfully'});
}