import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      role: null | "user" | "admin"
      firstName: string | null
      lastName: string | null
      supabase_token: string
      supabase_token_2: string
    } & DefaultSession["user"]
  }
}
