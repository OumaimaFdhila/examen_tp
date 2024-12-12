
import UserTable from "@/components/userTable";

export default function Users() {
    return (
        <div className="w-full h-[calc(100vh-260px)] p-[80px] bg-[#ebede8] flex flex-col gap-7 justify-center  overflow-hidden  ">
            <p className="font-bold text-3xl ml-2">All workers</p>
            <UserTable />
        </div>
    )
}