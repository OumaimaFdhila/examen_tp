"use client"
import {createClient, SupabaseClient} from '@supabase/supabase-js'
import { useSession } from 'next-auth/react'
import { useContext, createContext, useEffect, useState } from 'react'

const SupaBaseContext = createContext<SupabaseClient | null>(null)

export const useSupabase = () => {
    return useContext(SupaBaseContext)
}

export default function SupaBaseProvider({
    children
}:{
    children: React.ReactNode
}) {
    const {data:session} = useSession()
    const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

    useEffect(()=>{
        if(!session || supabase) return
        
        const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, 
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
                    }
                }
            }
        )
        client.realtime.setAuth(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        client.functions.setAuth(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
        
        setSupabase(client)
    },[session, supabase])


    return (
        <SupaBaseContext.Provider value={supabase}>
            {children}
        </SupaBaseContext.Provider>
    )
}