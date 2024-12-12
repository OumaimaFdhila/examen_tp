"use client"
import { useState, useEffect , createContext , useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useSupabase } from '@/providers/SupaBaseProvider';


type user = {
    id: number
    name : string
}

const onlineUserContext = createContext<{onlineUsers : user[], isLoading : boolean}>({onlineUsers: [], isLoading: false})

export function useOnlineUsers(){
    const context = useContext(onlineUserContext)
    if (!context) {
        throw new Error("useOnlineUsers must be used within a OnlineUsersProvider")
    }
    return context
}

export default function OnlineUsersProvider({children}:{children:React.ReactNode}) {
    const {data:session} = useSession()
    const supabase = useSupabase()
    const [onlineUsers, setOnlineUsers] = useState<user[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        if(!supabase || !session) return
        const channel = supabase.channel('onlineTraker')
        channel.on('presence', { event: 'sync' }, () => {
            const users:user[] = []
            for(const id in channel.presenceState()){
                const user:user = channel.presenceState()[id][0] as any
                // if(user.id === session.user.id) continue
                
                let userIn = false
                //let index = 0
                for (const u of users) {
                    if (u.id === user.id) {
                        userIn = true
                        break
                    }
                    // else if(new Date(u.online_at) > new Date(user.online_at)){
                    //     index++
                    // }
                }

                if(!userIn){
                    users.push(user)
                }
            }

            setOnlineUsers(users)
        })
        .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            await channel.track({ 
                online_at: new Date().toISOString(), 
                id:session.user.id,
                name : session.user.name,
            })
            }
            setIsLoading(false)
        })

        return ()=>{
        channel.unsubscribe()
        }
    },[supabase, session])
    
    return (
        <onlineUserContext.Provider value={{onlineUsers, isLoading}}>
            {children}
        </onlineUserContext.Provider>
    )
};