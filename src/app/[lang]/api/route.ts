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
            const sendData = JSON.stringify(jsonData)

            return new Response(sendData, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            })

        } catch( error: any) {
             return new NextResponse(JSON.stringify({status: "fail", message: "Error while importing data."}), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }
    }
}

// allow CORS POST requests
export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': "GET,POST,OPTIONS",
            'Access-Control-Allow-Headers': "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
}

export async function POST(request: NextRequest) {
    const data = await request.json()
    
    if(!data.message || !data.email) {
        return NextResponse.json({ error: 'POST request does not contain email or message in its body' },
         { status: 403 });
    }

    await prisma.message.create({ data: { message: data.message, email: data.email } })

    try {
        sendMail(data.email, data.message)
    } catch (err) {
        return NextResponse.json({ error: 'Server error when mail sent.' },
         { status: 500 });
    }



    return new Response(JSON.stringify({message: 'Email sent successfully'}), {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': "POST,OPTIONS",
                    'Access-Control-Allow-Headers': "Content-Type"
                }
            })
}