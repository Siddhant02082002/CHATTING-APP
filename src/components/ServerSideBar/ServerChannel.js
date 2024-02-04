"use client"
import { Hash, Mic, Video, Trash, Square, Edit, Lock } from "lucide-react";
import { ToolTip } from "../actions/action-tooltip";
import { MemberRole } from "@prisma/client";
import { useRouter, useParams } from "next/navigation";
import { useModal } from "@/hooks/modal-store";
import { cn } from "@/lib/utils";
const ServerChannel = ({ role, server, channel }) => {
    const router = useRouter();
    const { onOpen } = useModal();
    const params = useParams();
    const icons = {
        TEXT: Hash,
        AUDIO: Mic,
        VIDEO: Video
    }
    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }
    // const onAction = (e, actionType) => {
    //     onOpen(actionType, { channel, server });
    // }
    const Icon = icons[channel.type]
    return (
        <button onClick={onClick} className={cn(
            "group px-2 py-2 items-center flex gap-x-2 w-full dark:hover:bg-zinc-800/50 transition mb-1",
            params?.channelId === channel.id && "w-11/12 dark:bg-purple-500 shadow-lg text-lg text-white font-semibold   hover:font-medium hover:dark:bg-purple-400 rounded-e-xl ease-out ",
            
        )} >
            <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
            <div className="whitespace-nowrap w-50 overflow-hidden overflow-ellipsis">{channel.name}</div>
            {channel.name !== "general" && role !== MemberRole.GUEST && (
                <div className="flex ml-auto items-center gap-x-2">
                    <ToolTip className="group relative flex items-center" side="right" message="Edit" align="center">
                        <Edit
                            // onClick={(e) => onAction(e, "editChannel")}
                            className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
                        />
                    </ToolTip>
                    <ToolTip className="group relative flex items-center" side="right" message="Trash" align="center">
                        <Trash
                            onClick={() => onOpen("deleteChannel", { channel, server })}
                            className="hidden group-hover:block w-4 h-4 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
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