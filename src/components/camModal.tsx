"use client"
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Webcam from "react-webcam";

export default function CamModal() {
    const {isOpen, onOpenChange} = useDisclosure();
    const param = useSearchParams()
    const webcamRef = useRef<Webcam>(null);
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {data: session} = useSession()

    const DetectUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
          
        if (!screenshot) {
            toast.error("Image is required!");
            return;
        }
        setLoading(true);
        signIn("credentials", { image: screenshot ,redirect: false , callbackUrl: "/users" }).then((res : any) => {
            console.log(res)
            if (res?.error) {
                toast.error("Not recognized");
                setLoading(false);
                return;
            }
            router.push("/users")
            toast.success("Welcome");
            setLoading(false);
        }).catch(() => {
            toast.error("Not recognized");
            setLoading(false);
        })
            
    }
    };

  
    return (
        <>  
            <Button onClick={() => router.push("/?login=true")} isDisabled={session !== null}   className="font-semibold text-lg py-8 px-14  bg-[#004838] text-[#e2fb6c] shadow-lg rounded-2xl">Start</Button>
            <Modal size="3xl" isOpen={isOpen || param.get("login") === "true" } onOpenChange={onOpenChange}>
                <ModalContent>
                {param.get("login") !== "false" ?
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-semibold text-dark_green">Detect the user</ModalHeader>
                        <ModalBody>
                            <div className="pb-5">
                                <form onSubmit={(e)=>{DetectUser(e)}} className="space-y-4">
                                    <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={800}
                                    height={500}
                                    className="rounded-lg"
                                    />
                                    <div className="w-full flex gap-5 justify-end ">
                                        <Button  color="danger" variant="light" onClick={() => router.push("/")}>
                                            Close
                                        </Button>
                                        <Button isDisabled={loading} isLoading={loading} type="submit" color="primary" className="bg-dark_green text-yellow" >
                                            Start
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </ModalBody>
                    </> : null
                }
                </ModalContent>
            </Modal>
        </>
    );
}