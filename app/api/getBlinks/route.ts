import {NextRequest, NextResponse} from "next/server"
import {cookies} from 'next/headers'
import * as jose from "jose"
import {prisma} from "@/app/utils"

export const runtime = "edge"

export const GET = async (req: NextRequest) => {
    try{
    const blinks = await prisma.betGame.findMany(
        {
            select: {
                availableAmount: true,
                team_user: true,
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
        return NextResponse.json({msg: "Internal server error"}, {status: 403})
    }

}