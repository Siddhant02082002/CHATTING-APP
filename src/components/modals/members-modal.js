"use client"
import { useModal } from "@/hooks/modal-store";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import {
    Check,
    Gavel,
    Loader2,
    MoreVertical,
    Shield,
    ShieldAlert,
    ShieldCheck,
    ShieldQuestion
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuTrigger,
    DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";
import Image from "next/image";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Button } from "../ui/button";
import qs from "query-string";
import { useRouter } from "next/navigation"
export const MembersModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const isModalOpen = isOpen && type === "members";
    const router = useRouter();
    const { server } = data;
    // console.log(data, "HELLO");
    const handleClose = (MemberId, newRole) => {
        onClose();
    }
    const onKickHandler = async (memberId) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                },
            });
            const response = await axios.delete(url);
            router.refresh();
            onOpen("members", { server: response.data })
        } catch (error) {
            console.log(error);
        }
    }
    const roleChangeHandler = async (memberId, role) => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/members/${memberId}`,
                query: {
                    serverId: server?.id,
                }
            });
            const response = await axios.patch(url, { role });
            router.refresh();
            onOpen("members", { server: response.data });
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-zinc-800 overflow-hidden m-auto w-[2000px]">
                <DialogHeader >
                    <DialogTitle className="flex justify-center text-2xl font-bold">Manage Members</DialogTitle>
                    {/* <DialogDescription className="flex justify-center flex-col"> */}
                    <div className="flex justify-center flex-col">
                        <div className="text-lg">
                            {server?.members.length} Members
                        </div>
                        <div className="flex py-2 flex-col">
                            {server?.members?.map((member) => (
                                <div key={member.id} className="flex h-16 w-full items-center justify-between text-white">
                                    <div className="flex items-start w-[400px]">
                                        <img src={member?.profile?.imageUrl} className="flex h-10 w-10 rounded-full items-center justify-center mr-2" />
                                        <div className="flex justify-between w-full">
                                            <div className="flex flex-col justify-start items-start text-white">
                                                <div>{member.profile.name}</div>
                                                <div>{member.profile.email}</div>
                                            </div>
                                            <div className="flex items-center text-[16px] justify-center">{member.role}</div>
                                        </div>
                                    </div>
                                    {server.profileId !== member.profileId &&
                                        <div className="flex items-end gap-12">

                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="h-4 w-4 text-zinc-500" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="left">
                                                    <DropdownMenuSub>
                                                        <DropdownMenuSubTrigger
                                                            className="flex items-center"
                                                        >
                                                            <ShieldQuestion
                                                                className="w-4 h-4 mr-2"
                                                            />
                                                            <span>Role</span>
                                                        </DropdownMenuSubTrigger>
                                                        <DropdownMenuPortal>
                                                            <DropdownMenuSubContent>
                                                                <DropdownMenuItem
                                                                    onClick={() => roleChangeHandler(member.id, "GUEST")}
                                                                >
                                                                    <Shield className="h-4 w-4 mr-2" />
                                                                    Guest
                                                                    {member.role === "GUEST" && (
                                                                        <Check
                                                                            className="h-4 w-4 ml-auto"
                                                                        />
                                                                    )}
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => roleChangeHandler(member.id, "MODERATOR")}
                                                                >
                                                                    <ShieldCheck className="h-4 w-4 mr-2" />
                                                                    Moderator
                                                                    {member.role === "MODERATOR" && (
                                                                        <Check
                                                                            className="h-4 w-4 ml-auto"
                                                                        />
                                                                    )}
                                                                </DropdownMenuItem>
                                                            </DropdownMenuSubContent>
                                                        </DropdownMenuPortal>
                                                    </DropdownMenuSub>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => onKickHandler(member.id)}
                                                    >
                                                        <Gavel className="h-4 w-4 mr-2" />
                                                        Kick
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>

                                        </div>
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* </DialogDescription> */}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}