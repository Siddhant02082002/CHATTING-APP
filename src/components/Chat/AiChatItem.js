"use client"
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ToolTip } from "../actions/action-tooltip";
import { MemberRole } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useModal } from "@/hooks/modal-store";
import { Tooltip } from "../actions/action-tooltip";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import qs from "query-string";
import axios from "axios";

const roleIconMap = {
    "GUEST": null,
    "MODERATOR": <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    "ADMIN": <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
}


const AiChatItem = ({ id, content, GeminiResponse, prompt, currentMember, member, timestamp, fileUrl, deleted, socketUrl, socketQuery, type }) => {
    const { onOpen } = useModal()
    // const isAdmin = currentMember.role === MemberRole.ADMIN;
    // const isOwner = type === "convesation" && currentMember.id === member.id;
    // const isModerator = currentMember.role === MemberRole.MODERATOR
    // const memberData = currentMember.profile;
    const fileType = fileUrl?.split(".").pop();
    const isPDF = fileType === 'pdf' && fileUrl;
    const isImage = !isPDF && fileUrl;
    const [isEditing, setEditing] = useState(false);
    // const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);

    // const canEditMessages = !deleted && isOwner && !fileUrl;
    // console.log(fileType)



    return (

        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                {type !== "AI conversation" && <div className="cursor-pointer hover:drop-shadow-lg transition">
                    {/* <Avatar>
                        <AvatarImage src={member.profile.imageUrl} />
                    </Avatar> */}
                </div>}
                <div className="flex flex-col w-full">
                    <div className="w-full py-5">
                        <h2>YOU</h2>
                        <p>{prompt}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            {/* <p className="cursor-pointer font-semibold hover:underline text-md">{member.profile.name}</p> */}
                            <p className="cursor-pointer font-semibold hover:underline text-md">AI ASSISTANT</p>
                            <ToolTip message={MemberRole.ADMIN}>
                                {roleIconMap["ADMIN"]}
                            </ToolTip>
                        </div>
                        <span className="text-xs">{timestamp}</span>
                    </div>
                    {isImage && (
                        <a href={fileUrl} rel="noopener" className="relative aspect-square rounded-lg mt-2 overflow-hidden flex h-48 w-48">
                            <Image src={fileUrl} alt={content} fill className="object-cover"></Image>
                        </a>
                    )}
                    {isPDF && (
                        <div className="flex">
                            <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400"></FileIcon>
                            <a href={fileUrl} className="ml-2 text-sm text-indigo-500 dark:text-indigo-400">PDF File</a>
                        </div>
                    )}
                    {!fileUrl && !isEditing && (
                        <div>
                            <p>{GeminiResponse}</p>
                        </div>
                    )}

                </div>
            </div>

        </div>

    );
}

export default AiChatItem;