"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/modal-store";
import EmojiPick from "../providers/emojiPicker";
const formSchema = z.object({
    content: z.string().min(1)
})
const ChatInput = ({ apiUrl, query, type }) => {
    const router = useRouter();
    const { onOpen } = useModal();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            content: "",
        }
    });
    console
    const onSubmitHandler = async (value) => {
        try {

            console.log("hello", apiUrl);
            const url = qs.stringifyUrl({
                url: apiUrl,
                query,
            });

            await axios.post(url, value);

            form.reset();
            router.refresh();
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitHandler)}>
                <FormField control={form.control} name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="relative p-4 pb-6">
                                    <button className="absolute top-7 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-400 hover:bg-zinc-600 dark:hover:bg-zinc-300 transition rounded-full p-1 flex items-center justify-center" onClick={() => onOpen("messageFile", { apiUrl, query })}>
                                        <Plus className="flex items-center justify-center"></Plus>
                                    </button>

                                    <Input className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                                        placeholder="Type your Message Here" {...field}></Input>

                                    <div className="absolute top-7 right-8">
                                        <EmojiPick></EmojiPick>
                                    </div>
                                </div>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

export default ChatInput;