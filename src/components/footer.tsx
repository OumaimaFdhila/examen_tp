import Image from "next/image"
export default function Footer() {
    return (
        <div className="w-full h-[180px] bg-[#ebede8] flex justify-evenly items-center">
            <p className="text-2xl font-bold text-light_green">More than 100+<br/> companies partner</p>
            <Image src="/logo-1.svg" width={200} height={200} alt="logo"/>
            <Image src="/logo-2.svg" width={200} height={200} alt="logo"/>
            <Image src="/logo-3.svg" width={200} height={200} alt="logo"/>
            <Image src="/logo-4.svg" width={200} height={200} alt="logo"/>
        </div>
    )
}