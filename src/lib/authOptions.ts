import { get_user_by_id } from "@/actions/image.actions"
import axios from "axios"
import {AuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions:AuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                image: { label: "image", type: "text"},
            },
            async authorize(credentials){
                if (!credentials?.image) {
                    throw new Error("Image is required")
                }

                const { data } = await axios.post("https://nearby-prompt-buzzard.ngrok-free.app/image-detection", {
                    image:credentials.image,
                });

                console.log("qszdvfbgh",data)
                
                if (data.found === false && !data.data) {
                    console.log("error")
                    throw new Error("error")
                }
                const user = {
                    id: data.id,
                    name: data.first_name + " " + data.last_name,
                }

                console.log("user ",user)

                return user
            }
        }),
    ],
    session:{
        strategy: "jwt",
        maxAge:  20 * 60 * 60,

    },
    jwt: {
        maxAge:  20 * 60 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async session({session,token}){
            if(token.sub){
                session.user.id = Number(token.sub)
            }

            if(token.role === "user" || token.role === "admin"){
                session.user.role =  token.role
            }
            else{
                session.user.role =  null
            }

            session.user.first_name = token.first_name as string | null
            session.user.last_name = token.last_name as string | null
            session.user.email = token.email as string | null
            session.user.phone_number = token.phone_number as string | null
            
            return session
        },
        async jwt({ token }) {
            
            if (!token.sub) {
                return token;
            }
    
            try {
                const data = await get_user_by_id(token.sub);
    
                if (data?.status === "success") {
                    const user = data.data[0]; 
                    token.role = user.role;
                    token.id = token.sub;
                    token.first_name = user.first_name;
                    token.last_name = user.last_name;
                    token.email = user.email;
                    token.phone_number = user.phone_number;
                }
                return token;
            } catch (error) {
                console.error("Error in jwt callback:", error);
                return token;
            }
    
            
        },
    }
}

