import CamModal from "@/components/camModal";
import Grid from "@/components/grid";
import { Avatar } from "@nextui-org/react";
import { BsCursorFill } from "react-icons/bs";
import { RiSupabaseFill } from "react-icons/ri";

export default function App() {

  return (
    <div className="w-full h-[calc(100vh-260px)] bg-[#ebede8] flex flex-col gap-14 justify-center items-center overflow-hidden ">

      <Avatar isBordered  className="z-10 w-28 h-28 text-large absolute top-[15%] right-[10%] border-5 border-white shadow-2xl" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      <BsCursorFill size={50} color="#004838" className="absolute top-[24%] right-[17%] z-0 rotate-[-165deg] "/>

      <Avatar isBordered className="z-10 w-28 h-28 text-large absolute border-5 top-[15%] left-[10%] border-white shadow-2xl" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
      <BsCursorFill size={50} color="#004838" className="absolute top-[23%] left-[17%] z-0 rotate-[70deg] "/>

      <Avatar isBordered className="z-10 w-28 h-28 text-large absolute bottom-[30%] left-[15%] border-5 border-white shadow-2xl" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
      <BsCursorFill size={50} color="#004838" className="absolute bottom-[40%] left-[21%] z-0 rotate-[5deg] "/>

      <Avatar isBordered   className="z-10 w-28 h-28 text-large absolute bottom-[23%] right-[15%] border-5 border-white shadow-2xl" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
      <BsCursorFill size={50} color="#004838" className="absolute bottom-[35%] right-[20%] z-0 rotate-[-79deg] "/>

      <Grid/>
      <div className="flex justify-center z-10 px-4 py-1 items-center gap-2 rounded-full bg-white">
        <RiSupabaseFill size={20} color="#004838"/>
        <p className="text-sm font-bold text-light_green">CREATE FOR FAST</p>
      </div>
      <p className="text-7xl font-bold z-10 text-center text-dark_green">One tool to <span className="underline decoration-yellow decoration-10 underline-offset-[6px]">manage</span> <br/>your work and your team</p>
      <p className="text-2xl font-semibold z-10 text-center text-dark_grey">Clause simplifies work management and enhances employee recognition through <br/>seamless face recognition technology. </p>
      <CamModal/>
    </div>
    
  )
}

