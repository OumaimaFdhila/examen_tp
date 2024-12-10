"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>()

  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      console.log(image)
      signIn("credentials" , {image, redirect:false})
    }}>
      <input type="file" onChange={(e)=>{
        const file = e.target.files?.[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            setImage(reader.result as string)
          }
          reader.readAsDataURL(file)
        }
      }} accept="image/*" />
      <button type="submit">submit</button>
    </form>
  );
}
