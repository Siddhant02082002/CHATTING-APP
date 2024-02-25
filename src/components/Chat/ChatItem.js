import { Separator } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ToolTip } from "../actions/action-tooltip";
import { MemberRole } from "@prisma/client";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
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

const formSchema = z.object({
    content: z.string().min(1),
});
const ChatItem = ({ id,content, currentMember, member, timestamp, fileUrl, deleted,socketUrl,socketQuery }) => {
    const { onOpen } = useModal()
    const isAdmin = currentMember.role === MemberRole.ADMIN;
    const isOwner = currentMember.id === member.id;
    const isModerator = currentMember.role === MemberRole.MODERATOR
    const memberData = currentMember.profile;
    const fileType = fileUrl?.split(".").pop();
    const isPDF = fileType === 'pdf' && fileUrl;
    const isImage = !isPDF && fileUrl;
    const [isEditing, setEditing] = useState(false);
    const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);

    const canEditMessages = !deleted && isOwner && !fileUrl;
    // console.log(fileType)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: content
        }
    });
    const onSubmit = async(values) =>{
        try{
            const url = qs.stringifyUrl({
                url: `${socketUrl}/${id}`,
                query: socketQuery,
            })
            await axios.patch(url,values);
            form.reset();
            setEditing(false);
        }catch(e){
            console.log(e)
        }
    }
    return (

        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-lg transition">
                    <Avatar>
                        <AvatarImage src={member.profile.imageUrl} />
                    </Avatar>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="cursor-pointer font-semibold hover:underline text-md">{member.profile.name}</p>
                            <ToolTip message={member.role}>
                                {roleIconMap[member.role]}
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
                        <p>{content}</p>
                    )}
                    {!fileUrl && isEditing && (
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField control={form.control} name="content" render={({field})=>(
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Input placeholder="Edited Message" {...field} className="bg-neutral-600 my-2"></Input>
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}></FormField>
                                <Button>
                                    Save
                                </Button>
                            </form>
                            <span>Press escape to Cancel</span>
                        </Form>
                    )}
                </div>
            </div>

            {canDeleteMessage && (
                <div className="hidden group-hover:flex items-center gap-x-2">
                    {canEditMessages && (
                        <ToolTip message="EDIT">
                            <Edit onClick={() => setEditing(true)} className=" cursor-pointer w-4 h-4 text-zinc-500"></Edit>
                        </ToolTip>
                    )}
                    <ToolTip message="DELETE">
                        <Trash2 onClick={() => onOpen("deleteMessage",{
                            apiUrl: `${socketUrl}/${id}`,
                            query: socketQuery,
                        })} className="cursor-pointer text-red-400 ml-auto w-4 h-4"></Trash2>
                    </ToolTip>
                </div>
            )
            }
        </div>

    );
}

export default ChatItem;