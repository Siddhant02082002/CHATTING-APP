import { Smile } from "lucide-react";
import { Popover, PopoverTrigger,PopoverContent } from "./ui/popover";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const EmojiPick = ({onChange}) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Smile></Smile>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <Picker data = {data} onEmojiSelect={(emoji) => onChange(emoji.native)}></Picker>
            </PopoverContent>
        </Popover>
    );
}
 
export default EmojiPick;