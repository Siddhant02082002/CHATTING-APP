"use client"
import { Plus } from "lucide-react";
import { ToolTip } from "../actions/action-tooltip";
import { useModal } from "@/hooks/modal-store";
const NavigationAction = () => {
    const {onOpen} = useModal();
    return (
        <ToolTip message="New Server" align="center" side="right" className= "">
            <button className="mt-3 mb-3" onClick={()=>onOpen("createServer")}>
                <div className="flex mx-3 h-[48px] w-[48px] justify-center items-center rounded-[24px] hover:rounded-[16px] transition-all bg-neutral-700 hover:bg-emerald-500">
                    <Plus className="text-emerald-500 hover:text-white" size={25}></Plus>
                </div>
            </button>
        </ToolTip>
    );
}

export default NavigationAction;