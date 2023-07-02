import { NextResponse, NextRequest } from "next/server"
import { prisma } from "@/db"
import sendMail from "../util/mail"


export async function GET(request: NextRequest) {
    let nasaURL = request.nextUrl.searchParams.get('url');
    if(!nasaURL) {

        let errorResponse = {
            status: "fail",
            message: "Incorrect or no URL provided."
        }

        return new NextResponse(JSON.stringify(errorResponse), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    } else {
        try {
            const nasaResponse = await fetch(nasaURL);
            const jsonData = await nasaResponse.json();

             return NextResponse.json(jsonData);

        } catch( error: any) {
             return new NextResponse(JSON.stringify({status: "fail", message: "Error while importing data."}), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
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