import {NextRequest, NextResponse} from "next/server"
import {cookies} from 'next/headers'
import * as jose from "jose"
import {prisma} from "@/app/utils"
 
export const runtime = "edge"

export const POST = async (req: NextRequest) => {
    const {address, payout, betAmount, side} : {side: string, address: string, payout: number, betAmount: number} = await req.json()
    if (!(address || payout || betAmount || side)) {
        return NextResponse.json({msg: "Invalid Inputs"})
    }
    try{    
    await prisma.betGame.create({
        data: {
            availableAmount: payout,
            team_user: side,
            betAmount: betAmount,
            betterAddress: address
        }
    })
    
    return NextResponse.json({
        msg: "Successfully created your Bet, feel free to share it now!",
        success: true
    })

    } catch(err) {
        console.log(err)
        return NextResponse.json({msg: "Internal server error"}, {status: 403})
    }

}