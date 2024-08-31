import {NextRequest, NextResponse} from "next/server"
import {cookies} from 'next/headers'
import * as jose from "jose"
import {prisma} from "@/app/utils"

export const runtime = "edge"

export const POST = async (req: NextRequest) => {
    const {amount, team} : {amount: number, team: string} = await req.json()
    try{const secret = new TextEncoder().encode(
        'something',
      )
    const token = cookies().get('token') 
    if (!token) NextResponse.json({msg: "No token provided"})
    const {payload} = await jose.jwtVerify(token?.value as string, secret)
    
    await prisma.betGame.create({
        data: {
            availableAmount: amount,
            team_user: team,
            userId: payload.userId as number,
            betAmount: amount,
        }
    })
    
    return NextResponse.json({
        msg: "Successfully created a betting blink",
        success: true
    })

    } catch(err) {
        console.log(err)
        return NextResponse.json({msg: "Internal server error"})
    }

}