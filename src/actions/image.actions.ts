"use server";

import axios from "axios";


export async function AddUser({
    first_name,
    last_name,
    role,
    email,
    phone_number,
    image,
  }: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    phone_number: string;
    image : string | null

  }) {
    if (!first_name || !last_name || !role || !email || !phone_number ) {
      throw new Error("All fields are required");
    }
    console.log(first_name, last_name, role, email, phone_number, image)
    try {
      const response = await axios.post(
        "https://nearby-prompt-buzzard.ngrok-free.app/add_user",
        {
          first_name: first_name,
          last_name: last_name,
          role: role,
          email: email,
          phone_number: phone_number,
          image :image
        }
      );
      console.log(response.data)
      return response.data; 
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  }

export async function detect_user({ image }: { image: string }) {
    if (!image) throw new Error("Image is required");
    try {
        const response = await axios.post("https://nearby-prompt-buzzard.ngrok-free.app/image-detection", {
            image,
        });
        console.log(response.data)
        return response.data; 

    } catch (error) {
        console.error("Error detecting user:", error);
        throw error; 
    }
}

export async function getUsers() {
  try {
    const response = await axios.get("https://nearby-prompt-buzzard.ngrok-free.app/all_users");
    return response.data; 
} catch (error) {
    console.error("Error detecting user:", error);
    throw error; 
}}

export async function get_user_by_id(id : string) {
  try {
    const response = await axios.get(`https://nearby-prompt-buzzard.ngrok-free.app/get_user_by_id/${Number(id)}`);
    console.log(response.data)
    return response.data; 
} catch (error) {
    console.error("Error detecting user:", error);
    throw error; 
}}

