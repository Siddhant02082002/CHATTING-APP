import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import { useModal } from "@/hooks/modal-store";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";


export const DeleteServerModal = () => {
    const { isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "deleteServer"
    const router = useRouter();
    const { server } = data;
    const onClick = async () => {
        try {
            await axios.delete(`/api/servers/${server?.id}`);
            onClose();
            router.refresh();
            return redirect("/")
            router.push("/"); // REVISIT
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-red-600 text-xl font-semibold">DELETE SERVER</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete the {server?.name} server
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex mr-auto">
                    <Button className="bg-red-600 w-20 text-white hover:bg-white hover:text-red-600" onClick={onClick}>CONFIRM</Button>
                    <Button className="w-20" variant="ghost" onClick={onClose}>CANCEL</Button>
                </DialogFooter>
                {/* <Input className="bg-neutral-700" onChange={}></Input> */}
            </DialogContent>
        </Dialog>
    );
}