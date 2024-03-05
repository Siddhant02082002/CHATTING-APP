"use client"
import { Video } from "lucide-react"
import { ToolTip } from "../actions/action-tooltip"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const ChatVideoButton = () =>{
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const isVideo = searchParams?.get("video");
    console.log("pathname",pathname)
    const onClick = () => {
        const url = qs.stringifyUrl({
            url: pathname || "",
            query: {
                video: isVideo ? undefined:true,
            }
        },{skipNull: true})
        router.push(url);
    }
    return (
        <ToolTip message="Video" side="bottom">
            <button onClick={onClick}>
                <Video></Video>
            </button>
        </ToolTip>
    )
}