import { ActionGetRequest,ActionPostRequest,ActionGetResponse, ActionPostResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { clusterApiUrl, Connection, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/app/utils";

export const runtime = "edge"

export async function GET(req:NextRequest){

    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const gameBetData = await prisma.betGame.findFirst({
        where:{
            id: id as string
        },
        select:{
            betAmount: true,
            team_user: true,
            availableAmount: true,
            id:true
        }
    })

    if (!gameBetData) {
        const response: ActionGetResponse = {
            description: "No such bounty found",
            icon: "https://imgs.search.brave.com/4jrmq74DXMRXOQoamba5WnCwQPlmckEnsjQkEnBib7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTU1/Mzg0OTMzL3Bob3Rv/L2NvbXB1dGVyLXNo/b3dpbmctYW4tZXJy/b3ItbWVzc2FnZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c05UdTlCQW81OEhP/MkZOSWpzRXNuTWY1/X2R0S2ZPSVVoUGNj/VzR1Nml0Zz0",
            title: "404 Not found :(",
            label: "No Such submission",
            disabled: true,
            error: {
                message: "No such bounty is active! Please check the blink properly"
            }
        }
        return NextResponse.json(response, {
            headers: ACTIONS_CORS_HEADERS
        })
    }

    const response: ActionGetResponse = {
        icon:"https://images.unsplash.com/photo-1719937050792-a6a15d899281?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
        description:`A match b/w NYC & Miami. I have bet on ${gameBetData?.team_user}? Do you have the guts to bet against me?? Come try to fade me if you can!`,
        label:"I'm ignored",
        title: `Bet on ${gameBetData?.team_user == "Miami" ? "NYC" : "Miami"}`,
        links: {
            actions: [
                {
                    href: `/api/actions?id=${id}&opponentBet={opponentBet}&amount=${gameBetData?.availableAmount}`,
                    label: `BET on ${gameBetData?.team_user == "Miami" ? "NYC" : "Miami"}`,
                    parameters: [
                        {
                            type: "number",
                            name: "opponentBet",
                            label: `Enter an amount`,
                            max: gameBetData.availableAmount,
                            min: 0
                        },
                    ],
            }],
        },
    }

    return NextResponse.json(response, {
        headers: ACTIONS_CORS_HEADERS
    })
}

export async function POST(req:NextRequest) {
    const postRequest: ActionPostRequest = await req.json();
    const userKey = postRequest.account;
    const user = new PublicKey(userKey);
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id');
    const amount = searchParams.get('opponentBet');
    const betAmount = searchParams.get('amount');

    const connection = new Connection(clusterApiUrl("devnet"));
    const ix = SystemProgram.transfer({
      fromPubkey: user,
      toPubkey: new PublicKey("Fh3cgDq53MF2WGnZg2pKXy9cbWH3ZgGrkz4JnUDbekxH"),
      lamports: 2
    })
    const tx = new Transaction();
    tx.add(ix)
    tx.feePayer = user;
    const bh = (await connection.getLatestBlockhash({commitment:"finalized"})).blockhash;
    console.log(`blockhash ${bh}`)
    tx.recentBlockhash = bh
    const serialTx = tx.serialize({requireAllSignatures:false,verifySignatures:false}).toString("base64");
   
    if (parseInt(betAmount as string) - parseInt(amount as string) < 0) {
        return NextResponse.json({
            transaction: serialTx,
            message: "Failed to submit bet"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }
    try {
    await prisma.betGame.update({
        where: {
            id: id as string
        },
        data: {
            availableAmount: {
                decrement: parseInt(amount as string)
            }
        }
    })
    
    const response: ActionPostResponse = {
      transaction: serialTx,
      message:`Submitted bet with publicKey ${userKey}`
    }
  
    return NextResponse.json(response, {headers: ACTIONS_CORS_HEADERS});
    } catch (err) {
        console.error(err)
        return NextResponse.json({
            transaction: serialTx,
            message: "Failed to participate"
        }, {
            headers: ACTIONS_CORS_HEADERS,
            status: 403
        })
    }
}

export async function OPTIONS(req: NextRequest){
    return new Response(null,{headers: ACTIONS_CORS_HEADERS})
}
  