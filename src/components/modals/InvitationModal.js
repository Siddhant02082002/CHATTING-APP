import { useModal } from "@/hooks/modal-store";
import { useState } from "react";
import { CheckCircle, RefreshCw } from "lucide-react";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { useOrigin } from "@/hooks/use-orign";
export const InvitationModal = () => {
    const { isOpen, onClose, type, data, onOpen } = useModal();
    const origin = useOrigin();
    const isModalOpen = isOpen && type === "InvitePeople";
    const server = data;
    const [isCopied, setCopied] = useState(false);
    // console.log(data, "HELLO");
    const handleClose = () => {
        onClose();
    }
    const inviteUrl = `${origin}/invite/${server?.inviteCode}`
    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000)
    };
    const onNew = async () => {
        try {
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("InvitePeople", response.data);
            // console.log(server);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-zinc-800 overflow-hidden m-auto">
                <DialogHeader >
                    <DialogTitle className="flex justify-center text-2xl font-bold">Invite Friends</DialogTitle>
                    <div className="flex justify-center flex-col">
                        <div className="text-lg">
                            Invite Your Friend to {server?.name}
                        </div>
                        <div className="flex py-2 flex-col">
                            <input value={inviteUrl} className="p-5 rounded-md text-white bg-neutral-700 w-full h-12 text-lg" readOnly></input>
                            <div className="flex py-5 items-center">
                                <button className="flex rounded-md mr-auto bg-blue-600 hover:bg-blue-500  p-5 h-5 items-center" onClick={onCopy}>
                                    <div className="flex font-semibold justify-center items-center">
                                        COPY
                                    </div>
                                </button>
                                <div className="flex items-center justify-center">
                                    {isCopied && (<div className="flex gap-1 text-emerald-500 text-md"><CheckCircle className="text-emerald-500 " /> Copied </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogHeader>
                <button onClick={onNew} className="ml-auto h-2 mt-0 gap-2 justify-center items-center flex text-white">
                    <RefreshCw />
                    <div>Refresh a New Link</div>
                </button>
            </DialogContent>
        </Dialog>
    );
}