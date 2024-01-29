"use client"
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, PlusCircle, Settings, Trash2, Users, UserPlus } from "lucide-react";
import { Separator } from "../ui/separator";
import { useModal } from "@/hooks/modal-store";
const ServerHeader = ({ server,role }) => {
    const { onOpen } = useModal();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none" asChild>
                <button className="w-full px-3 flex text-md font-semibold uppercase border-neutral-200 bg-neutral-800 opacity-85 h-12 items-center hover:bg-zinc-700/10">
                    {server.name}
                    <ChevronDown className="h-5 w-5 ml-auto"></ChevronDown>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => onOpen("InvitePeople",server)} className="text-purple-600 font-semibold px-3 py-2 text-sm cursor-pointer hover:text-purple-400 hover:bg-neutral-800">
                    Invite People
                    <UserPlus className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <Separator></Separator>
                <DropdownMenuItem onClick={() => onOpen("createChannel")} className="px-3 py-2 text-sm cursor-pointer hover:bg-neutral-800">
                    Create Channel
                    <PlusCircle className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen("editServer", { server })}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-neutral-800"
                >
                    Server Settings
                    <Settings className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => onOpen("members", { server })}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-neutral-800"
                >
                    Manage Members
                    <Users className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
                <Separator></Separator>
                <DropdownMenuItem
                    onClick={() => onOpen("deleteServer", { server })}
                    className="text-red-500 font-semibold px-3 py-2 text-sm cursor-pointer hover:bg-neutral-800 hover:text-red-400"
                >
                    Delete Channel
                    <Trash2 className="h-4 w-4 ml-auto" />
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>
    );
}

export default ServerHeader;