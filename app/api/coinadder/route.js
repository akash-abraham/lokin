import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const client= new PrismaClient()
export async function GET(req){
    const { searchParams } = new URL(req.url); // Correct 'req.url' instead of 'req.URL'
    const id = searchParams.get('id');
    const amount = searchParams.get('amount');
    try{
        const res=await client.user.update({
            where:{id:parseInt(id)},
            data:{
                points:{
                    increment:parseInt(amount)
                }
            }
        })
        return NextResponse.json({res});
    }catch(e){
        return NextResponse.json('some db error'+e);
    }
}