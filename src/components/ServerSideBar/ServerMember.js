"use client"
import { cn } from "@/lib/utils"
import { useRouter, useParams } from "next/navigation"
export const ServerMember = ({ member, server }) => {
    const router = useRouter();
    const params = useParams();
    const memberPageHandler = () => {
        router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
    return (
        <button onClick={memberPageHandler}
            className={cn(
                "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
                params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
            )}>
            <img src={member.profile.imageUrl} className="w-10 h-10 rounded-full"></img>
            <p className={cn(
                    "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
                    params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
                )}
            >
                {member.profile.name}
            </p>
        </button>
    )
}