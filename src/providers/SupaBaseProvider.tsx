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
                        Authorization: `Bearer ${session.user.supabase_token}`
                    }
                }
            }
        )
        client.realtime.setAuth(session.user.supabase_token,)
        client.functions.setAuth(session.user.supabase_token)
        
        setSupabase(client)
    },[session, supabase])


    return (
        <SupaBaseContext.Provider value={supabase}>
            {children}
        </SupaBaseContext.Provider>
    )
}