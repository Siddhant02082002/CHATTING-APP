import { Plus } from "lucide-react";
const ServerSection = ({ label }) => {
    return (
        <div className="flex my-1 ml-[5px]">
            <div className="text-[14px]">{label}</div>
            <button className="flex ml-auto px-2 items-center w-auto mlitems-center gap-x-2 hover:bg-neutral-100 dark:hover:bg-zinc-800/50 transition mb-1">
                <Plus className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"></Plus>
            </button>
        </div>
    );
}

export default ServerSection;