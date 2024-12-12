"use client"
import { Button } from "@nextui-org/react";
import Link from "next/link"
import Image from "next/image";
import { signOut, useSession } from "next-auth/react"


export default  function Navbar() {
    const {data:session} = useSession();
    console.log(session)
    return (
        <div className="w-full h-[80px] sticky top-0 z-10 bg-[#ebede8]  flex justify-between items-center px-[80px]">
            <div className="flex justify-between items-center h-full "> 
                
                <Link href="/" className="text-3xl font-semibold mr-20 gap-3 flex items-center">
                    <Image src="/logo.png" width={40} height={40} alt="logo"/>
                    Clause
                </Link>

            </div>
            <div className="flex justify-between items-center h-full gap-5">
                
                    <Button size="lg" as={Link} href="/users" className="font-semibold text-lg text-[#004838] bg-white shadow-lg">Dashboard</Button>
                    {session ?
                    <Button size="lg"onClick={() => signOut({callbackUrl: "/"})} className="font-semibold text-lg text-[#004838] bg-white shadow-lg">Log Out</Button> : null
                }
                
            </div>
        </div>
    )
}