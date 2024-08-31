import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/app/utils"
import {cookies} from "next/headers"
import * as jose from "jose"
import nacl from "tweetnacl"
import { PublicKey } from "@solana/web3.js"

export const runtime = "edge"

export const POST = async (req: NextRequest) => {
    const {pubKey, signature}:{pubKey:any,signature:any} = await req.json();
    if (!pubKey || !signature) NextResponse.json({msg: "Invalid request, please send currect body"}, {status: 403})
    try {
        const signatureString = "You're a verified exceliWorker"
        const stringEncoded = new TextEncoder().encode(signatureString)
        let sign
        if (!signature.data) {
            sign = new Uint8Array(Object.values(signature))
        } else {
            sign = new Uint8Array(signature.data)
        }
        const pubkey = new PublicKey(pubKey).toBytes()

        const result = nacl.sign.detached.verify(
            stringEncoded,
            sign,
            pubkey
        )

        if (!result) {
            return  NextResponse.json({msg: "Invalid signature"}, {status: 403})
        }

        const user = await prisma.user.findFirst({
            where: {
                address: pubKey
            }
        })

        if(!user) {
            return NextResponse.json({msg: "Invalid user"}, {status: 403})
        }

        const secret = new TextEncoder().encode(
            'something',
          )
        const token = await new jose.SignJWT({address: pubKey, userId: user.id})
        .setProtectedHeader({alg: "HS256"})
        .sign(secret)
        
        console.log(token)
        cookies().set("token", token);

        return NextResponse.json({msg: "Signed up successfully", success: true})


    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({msg: "Failed due to internal issues"})
    }
}