"use client"
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";

export default function LogOutButton(){
    return(
        <Button size="lg" onClick={() => signOut({callbackUrl: "/"})} className="font-semibold text-lg text-[#004838] bg-white shadow-lg">Log Out</Button>
    )
}