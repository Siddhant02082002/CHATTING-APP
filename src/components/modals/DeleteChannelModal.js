"use client"
import { useModal } from "@/hooks/modal-store"
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import qs from "query-string";
import axios from "axios";
const DeleteChannelsModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "deleteChannel";
    const handleClose = () => {
        onClose();
    }
    const {server,channel} = data;
    const DeleteChannelHandler = async() => {
        try {
            const url = qs.stringifyUrl({
                url: `/api/channels/${channel.id}`,
                query: {
                    serverId: server?.id
                }
            })
            console.log(url);
            await axios.delete(url);

            onClose();
            router.refresh();
            co
            router.push(`/servers/${server?.id}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="bg-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-red-600 text-xl font-bold">DELETE CHANNEL</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the Channel
                    </DialogDescription>
                    <DialogFooter className="flex justify-center gap-10 items-center w-auto h-20">
                        <Button className="text-bold bg-red-700 font-bold hover:text-red-700" onClick={DeleteChannelHandler}>CONFIRM   </Button>
                        <Button className="text-neutral-950 font-bold hover:text-red-700" onClick={handleClose}>CANCEL</Button>
                    </DialogFooter>
                </DialogHeader>

            </DialogContent>
        </Dialog>)
}
export default DeleteChannelsModal;