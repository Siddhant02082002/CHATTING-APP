"use client"
import { Hash, Mic, Video, Trash, Square, Edit,Lock} from "lucide-react";
import { ToolTip } from "../actions/action-tooltip";
import { MemberRole } from "@prisma/client";
import { useRouter,useParams } from "next/navigation";
const ServerChannel = ({ role, server, channel }) => {
    const router = useRouter();
    const params = useParams();
    const icons = {
        TEXT: Hash,
        AUDIO: Mic,
        VIDEO: Video
    }
    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }
    // console.log(channel)
    const Icon = icons[channel.type]
    return (
        <button onClick={onClick} className="group px-2 py-2  flex items-center gap-x-2 w-full hover:bg-neutral-100 dark:hover:bg-zinc-800/50 transition mb-1">
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <div>{channel.name}</div>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <ToolTip className="group relative flex items-center" side="right" message="Edit" align="center">
                        <Edit
                            // onClick={(e) => onAction(e, "editChannel")}
                            className="group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        />
                    </ToolTip>
                    <ToolTip className="group relative flex items-center" side="right" message="Trash" align="center">
                        <Trash
                        // onClick={(e) => onAction(e, "deleteChannel")}
                        // className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        />
                    </ToolTip>
                </div>
            )}
            {channel.name === "general" && (
                <Lock
                    className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"
                />
            )}
        </button>
    );
}

export default ServerChannel;