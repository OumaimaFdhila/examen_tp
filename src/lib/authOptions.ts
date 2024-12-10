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
                console.log("credentials", credentials)
                return null
            }
        }),
    ],
    session:{
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        
    }
}