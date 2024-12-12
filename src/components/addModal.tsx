"use client";
import { AddUser } from "@/actions/image.actions";
import {Modal,ModalContent,ModalHeader,ModalBody,Button, Select, SelectItem, Input} from "@nextui-org/react";
import {  useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { CiImageOn } from "react-icons/ci";
  
export default function AddModal({isOpen ,onOpenChange}:{isOpen : boolean,onOpenChange : ()=>void}) {

    const [newUser , setNewUser] = useState<{first_name: string; last_name: string; image: string | null , role : string , phone_number : string , email : string}>({
        first_name: "",
        last_name: "",
        image: null,
        role : "",
        phone_number : "",
        email : "",
    });

    const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!newUser.first_name || !newUser.last_name || !newUser.image  ) {
          toast.error("All fields are required!");
          return;
        }
      
        try {
          const response = await AddUser(newUser); 
          console.log(response);
          if (response?.status === "success") {
            toast.success("User added successfully!");
            // setUsers([
            //   ...users,
            //   { id: users.length + 1, ...newUser },
            // ]);
            // setNewUser({ firstName: "", lastName: "", image: null }); 
          } else {
            toast.warning("Unexpected response from server.");
          }
        } catch (error: any) {
          console.error("Error adding user:", error);
          toast.error("Error adding user. Please try again.");
        }
    };
    


    
  
    return (
        <>
            <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 font-semibold text-dark_green">Add user</ModalHeader>
                        <ModalBody>
                            <div className="pb-5">
                                <form onSubmit={(e)=>{addUser(e)}} className="mt-4 space-y-4">
                                    <Input
                                    variant="bordered"
                                    type="text"
                                    size="lg"
                                    placeholder="First name"
                                    value={newUser.first_name}
                                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                                    className=""
                                    />
                                    <Input
                                    variant="bordered"
                                    type="text"
                                    size="lg"
                                    placeholder="Last name"
                                    value={newUser.last_name}
                                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                                    className=""
                                    />
                                    <Input
                                    variant="bordered"
                                    type="email"
                                    size="lg"
                                    placeholder="Email"
                                    value={newUser.email}
                                    onChange={(e) =>
                                        setNewUser({ ...newUser, email: e.target.value })
                                    }
                                    className=""
                                    />
                                    <Input
                                    variant="bordered"
                                    size="lg"
                                    placeholder="Phone number"
                                    value={newUser.phone_number}
                                    onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                                    className=""
                                    />
                                    <Select variant="bordered"  label="Select Role" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                        <SelectItem key={"user"}>User</SelectItem>
                                        <SelectItem key={"admin"}>Admin</SelectItem>
                                    </Select>
                                    {
                                    newUser.image ? <div className="flex justify-center items-center p-4 border rounded-md">
                                        <Image src={newUser.image} alt="image" width={100} height={100}/>
                                    </div> : null
                                    }
                                    <label className="w-full p-4 flex justify-center items-center shadow-sm rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer border-2 hover:border-foreground-400 mb-4">
                                    <CiImageOn size={34} className="text-foreground-600" />
                                    <span className="ml-2 text-foreground-600 ">Add Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e)=>{
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                            setNewUser({ ...newUser, image: reader.result as string });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                        }}
                                    />
                                    </label>
                                    <Button
                                    type="submit"
                                    onClick={onClose}
                                    className="w-full bg-dark_green text-yellow py-2 rounded-xl "
                                    >
                                    Add User
                                    </Button>
                                </form>
                            </div>
                        </ModalBody>
                    </>
                )}
                </ModalContent>
            </Modal>
        </>
    );
}