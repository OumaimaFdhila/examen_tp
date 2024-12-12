import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      role: null | "user" | "admin"
      first_name: string | null
      last_name: string | null
      email: string | null
      phone_number: string | null
      supabase_token: string
      supabase_token_2: string
    } & DefaultSession["user"]
  }
}
