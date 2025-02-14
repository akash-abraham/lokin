"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
// import { Terminal } from "lucide-react"
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {  useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
//   } from "@/components/ui/alert-dialog"
import axios from "axios";
// import {
//   IconBrandGithub,
//   IconBrandGoogle,
//   IconBrandOnlyfans,
// } from "@tabler/icons-react";

export default function SignupFormDemo() {
    const [name,setname]=useState("");
    const [lname,setlname]=useState("");
    const[email,setemail]=useState("");
    const [phno,]=useState("");
    const [password,setpassword]=useState("");
    const router= useRouter();
  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!name||!email||!password||!password){
        alert('Some Fields are empty')
        return   
    }
    console.log("Form submitted");
    console.log(name,lname,email,phno);
    await axios.post("/api/auth/signUp",{name:name+""+lname,email:email,password:password});
    router.push('/')
  };
  return (
    <div className="max-w-md mt-20 align-middle w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Sign Up here
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
    Pro-tip: loggin in can make you 420% more productive(trust me)
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Thamarakshan" type="text" onChange={(e)=>{setname(e.target.value)}}/>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input id="lastname" placeholder="Pillai" type="text" onChange={(e)=>{setlname(e.target.value)}}/>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e)=>{setemail(e.target.value)}} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" onChange={(e)=>{setpassword(e.target.value)}}/>
        </LabelInputContainer>
       
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
      <div className="mt-3 flex flex-col">
    <p>
          Already have an account? signIn
          <br />
          {/* <Link onClick={router.push(()=>signIn())} prefetch={true} className="text-teal-400 ">SignIn</Link> here */}
          <a className="text-teal-400 cursor-pointer" onClick={(e)=>{
            e.preventDefault();
            signIn();
          }}>here</a>
          
        </p>
    </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};