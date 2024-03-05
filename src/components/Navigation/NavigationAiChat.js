"use client"
import { Bot } from "lucide-react";
import { ToolTip } from "../actions/action-tooltip";
import { cn } from "@/lib/utils";
import {  useRouter } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
export default function NavigationAiChat({profileId}) {
    
    const router = useRouter()
    const onClick = () =>{
        router.push(`/AIChat/${profileId}`)
    }
    return (
        <ToolTip className="group relative flex items-center justify-center" side="right" message="AI Chat" align="center">
            <button onClick={onClick} className="flex justify-center items-center">
                <Bot className="flex justify-center items-center h-12 w-12"></Bot>
                <div className=/*{cn(*/
                    "absolute left-0 my-3 bg-primary rounded-r-full transition-all w-[4px]"/*,
                    params?.serverId !== id && "group-hover:h-[20px]",
                    params?.serverId === id ? "h-[36px]" : "h-[0px]"
                )}*/ />
                {/* <div className={cn(
                    "relative group flex mx-3 my-2 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
                    params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
                )}>
                    {<Image fill src={Logoimg} alt="Channel" ></Image>}
                </div> */}
            </button>
        </ToolTip >
    //      <ToolTip className="group relative flex items-center" side="right" message={name} align="center">
    //      <button onClick={onClick}>
    //          <div className={cn(
    //              "absolute left-0 my-3 bg-primary rounded-r-full transition-all w-[4px]",
    //              params?.serverId !== id && "group-hover:h-[20px]",
    //              params?.serverId === id ? "h-[36px]" : "h-[0px]"
    //          )} />
    //          <div className={cn(
    //              "relative group flex mx-3 my-2 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden",
    //              params?.serverId === id && "bg-primary/10 text-primary rounded-[16px]"
    //          )}>
    //              <Image fill src={Logoimg} alt="Channel" ></Image>
    //          </div>
    //      </button>
    //  </ToolTip >
    )
}