import {NextRequest, NextResponse} from "next/server"
import {cookies} from 'next/headers'
import * as jose from "jose"
import {prisma} from "@/app/utils"

export const runtime = "edge"

export const GET = async (req: NextRequest) => {
    try{const secret = new TextEncoder().encode(
        'something',
      )
    const token = cookies().get('token')
    if (!token) NextResponse.json({msg: "No token provided"})
    const {payload} = await jose.jwtVerify(token?.value as string, secret)
    
    const blinks = await prisma.betGame.findMany(
        {
            select: {
                availableAmount: true,
                team_user: true,
                userId: true,
                id: true
            }
        }
    )

    return NextResponse.json({
        msg: "Got the messages",
        success: true,
        blinks
    })

    } catch(err) {
        console.log(err)
        return NextResponse.json({msg: "Internal server error"})
    }

}