import { useModal } from "@/hooks/modal-store"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import qs from "query-string";
import axios from "axios";


export const DeleteMessageModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "deleteMessage";

    const { apiUrl, query } = data;
    const closeHandler = () => {
        onClose()
    }
    const submitHandler = async() => {
        try{
            const url = qs.stringifyUrl({
                url: apiUrl||"",
                query,
            });

            await axios.delete(url);
            onClose();
        }catch(error){
            console.log(error)
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Delete Message
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this message
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <div>
                        <Button onClick={closeHandler}>
                            Cancel
                        </Button>
                        <Button onClick={submitHandler}>
                            Submit
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}