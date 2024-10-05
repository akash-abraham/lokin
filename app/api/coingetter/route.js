import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server";
const client=new PrismaClient();
 export async function GET(req){
    const { searchParams } = new URL(req.url); 
    const id = searchParams.get('id'); 

    try{
        const res=await client.user.findUnique({
            where:{id:parseInt(id)},
            select:{
                points:true
            }
        })
        return NextResponse.json({res});
    }catch(e){
        return NextResponse.json('some db error'+e)
    }

}