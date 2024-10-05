import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:NextRequest) {
    const {email, password,name}=await req.json();

    //cheching if the user already exists
    const existingUser = await prisma.user.findUnique({
        where:{email},
    });

    if(existingUser){
        return NextResponse.json({
            error:"the user already exists",
        },
    {
        status:404
    });
    };


    //hashing the password
    if(!password){
        return new Response(JSON.stringify({error:'password is required'}),{
            status:400,
        });
    }
    try{
  
        const user = await prisma .user.create({
            data:{
                email:email,
                name:name,
                password:password
            }
        });
        return NextResponse.json(user,{status:201});
        console.log("user created");

    }catch(error){
        return new Response(JSON.stringify({
            error:'signup failed'+error
        }),{
            status:500,
        })
    }



    //create new user based on role

}
