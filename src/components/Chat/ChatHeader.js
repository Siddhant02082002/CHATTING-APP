import { Hash, Menu } from "lucide-react";
import { MobileToggle } from "@/components/mobile-toggle";

const ChatHeader = ({ name, serverId, type }) => {
    return (

        <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
            <MobileToggle serverId={serverId} />
            { type ==="channel" &&
                <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400 mr-2"></Hash>
            }
            <p>{name}</p>
        </div>
    );
}

export default ChatHeader;