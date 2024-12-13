"use client";

import {Modal,ModalContent,ModalHeader,ModalBody,Button, Select, SelectItem, Input} from "@nextui-org/react";
import {  SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { User } from "@/types/types";
import { edit_user } from "@/actions/image.actions";
  
export default function EditModal({isOpen ,onOpenChange,id,setUsers,users}:{isOpen : boolean,onOpenChange : ()=>void,id :number ,setUsers :React.Dispatch<SetStateAction<User[]>>,users : User[]}) {

    const user = users.find((user) => user.id === id);
    const [newUser, setNewUser] = useState(() => ({
        first_name: user?.first_name || "",
        last_name: user?.last_name || "",
        role: user?.role || "",
        phone_number: user?.phone_number || "",
        email: user?.email || "",
        id: user?.id || 0,
      }));
    
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
    
      // Reset `newUser` when `id` or `users` change
      if (user && newUser.id !== user.id) {
        setNewUser({
          first_name: user.first_name,
          last_name: user.last_name,
          role: user.role,
          phone_number: user.phone_number,
          email: user.email,
          id: user.id,
        });
      }

    if(!user) return

    console.log(user)
    console.log("userina",newUser)

    const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!newUser.first_name || !newUser.last_name  || !newUser.role || !newUser.phone_number || !newUser.email) {
          toast.error("All fields are required!");
          setError(true);
          return;
        }
        if(newUser.phone_number.length!==8){
            toast.error("Invalid phone number!");
            setError(true)
            return
        }
        setError(false)
        setLoading(true);
        try {
          const response = await edit_user(newUser); 
          console.log(response);
          if (response?.status === "success") {
            setUsers(prev => prev.map((user) => user.id === newUser.id ? { ...user, ...newUser } : user));
            setLoading(false);
            toast.success("User added successfully!");
            setNewUser({ first_name: "", last_name: "", role :"", phone_number : "", email : "" ,id : 0}); 
            onOpenChange();
          } else {
            toast.warning("Unexpected response from server.");
            setLoading(false);
            onOpenChange();
          }
        } catch (error: any) {
          console.error("Error adding user:", error);
          toast.error("Error adding user. Please try again.");
          setLoading(false);
          onOpenChange();
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
                                    errorMessage={error && !newUser.first_name ? "First name is required!" : ""}
                                    isInvalid={error && !newUser.first_name}
                                    placeholder="First name"
                                    value={newUser.first_name}
                                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                                    className=""
                                    />
                                    <Input
                                    variant="bordered"
                                    type="text"
                                    errorMessage={error && !newUser.last_name ? "Last name is required!" : ""}
                                    isInvalid={error && !newUser.last_name}
                                    size="lg"
                                    placeholder="Last name"
                                    value={newUser.last_name}
                                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                                    className=""
                                    />
                                    <Input
                                    variant="bordered"
                                    type="email"
                                    errorMessage={error && !newUser.email ? "Email is required!" : ""}
                                    isInvalid={error && !newUser.email}
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
                                    errorMessage={error && (!newUser.phone_number || newUser.phone_number.length !== 8) ? "Valid phone number is required!" : ""}
                                    isInvalid={error && !newUser.phone_number}
                                    placeholder="Phone number"
                                    value={newUser.phone_number}
                                    onChange={(e) => setNewUser({ ...newUser, phone_number: e.target.value })}
                                    className=""
                                    />
                                    <Select variant="bordered"  label="Select Role" isInvalid={error && !newUser.role} errorMessage={error && !newUser.role} value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                                        <SelectItem key={"user"}>User</SelectItem>
                                        <SelectItem key={"admin"}>Admin</SelectItem>
                                    </Select>
                                    <Button
                                    isDisabled={loading}
                                    isLoading={loading}
                                    type="submit"
                                    className="w-full bg-dark_green text-yellow py-2 rounded-xl "
                                    >
                                    Edit User
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