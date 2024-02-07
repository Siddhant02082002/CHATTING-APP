"use client"
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogFooter } from "../ui/dialog";
import { useModal } from "@/hooks/modal-store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl } from "../ui/form";
import { FileUpload } from "../ui/file-upload";
import { Button } from "../ui/button";
import qs from "query-string";
import axios from "axios";;

const formSchema = z.object({
    fileUrl: z.string().min(1, {
        message: "Required.",
    })
});

export const MessageFileModal = () => {

    const { isOpen, onClose, type, data } = useModal();

    const router = useRouter();
    const {apiUrl,query}=data;
    const isModalOpen = isOpen && type === "messageFile"

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fileUrl: "",
        }
    })
    const handleClose = () =>{
        onClose();
    }
    const onSubmitHandler = async(values) => {
        try {
            const url = qs.stringifyUrl({
                url: apiUrl || "",
                query,
            })

            await axios.post(url,{
                ...values,
                content: values.fileUrl
            })

            form.reset();
            router.refresh();
            handleClose();
        } catch (error) {
            console.log(error)
        }
        console.log(values)
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Add an attachment
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Send a file as a message
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="fileUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <FileUpload endpoint="messageFile" value={field.value} onChange={field.onChange}/>

                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="primary">SEND</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}