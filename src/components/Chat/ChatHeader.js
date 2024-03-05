import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { ChatVideoButton } from "./chatVideobutton";

const ChatHeader = ({ name, serverId, type, imageUrl }) => {
    return (
        <div className="text-md font-semibold px-3 flex items-center h-14 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            {type === "channel" ?
                (<Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"></Hash>) : <img src={imageUrl} alt={name} className="w-10 h-10 rounded-full mr-2"></img>

            }
            <p>{name}</p>
            <div className="ml-auto flex items-center">
                {type === "conversation" && (
                    <ChatVideoButton></ChatVideoButton>
                )}
                <SocketIndicator></SocketIndicator>
            </div>
        </div>
    );
}

export default ChatHeader;