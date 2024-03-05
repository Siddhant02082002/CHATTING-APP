"use client"
import { useChatQuery } from "@/hooks/useChatQuery";
import useChatScrolling from "@/hooks/useChatScroll";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Loader2, ServerCrash } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import ChatItem from "./ChatItem";
import { format } from "date-fns";
import AiChatItem from "./AiChatItem";

const DATE_FORMAT = "d MMM yyyy, HH:mm"
const ChatMessage = ({ name, member, chatId, apiUrl, socketUrl, socketQuery, paramKey, paramValue, type }) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;

    const chatRef = useRef(null);
    const bottomRef = useRef(null);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue,
    });
    useChatSocket({ queryKey, addKey, updateKey })
    useChatScrolling({
        chatRef, bottomRef, loadMore: fetchNextPage, shouldLoadMore: !isFetchingNextPage && !!hasNextPage, count: data?.pages?.[0]?.items?.length ?? 0,
    });

    // useChatSocket({queryKey,addKey,updateKey});
    // console.log(apiUrl)
    // console.log(status)
    if (status === "loading") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Loading messages...
                </p>
            </div>
        )
    }
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center">
                <ServerCrash className="h-7 w-7 text-zinc-500 my-4" />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Something went wrong!
                </p>
            </div>
        )
    }
    // console.log(data?.pages[0]?.items)
    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto">
            {!hasNextPage && <div className="flex-1" />}
            {!hasNextPage && (
                <h1 className="flex justify-center text-4xl">chat Welcome</h1>
            )}

            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (<Loader2 className="h-6 w-6 text-zinc-500 animate-spin my-4"></Loader2>) : <button onClick={() => fetchNextPage()}>Load next page</button>}
                </div>
            )}
            <div className="flex flex-col-reverse">

                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group?.items.map((message) => {
                            return type !== "AI conversation" ? (<ChatItem
                                type={type}
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />) : (<AiChatItem key= {message.id} GeminiResponse={message.GeminiResponse} prompt={message.UserPromt}></AiChatItem>)
                        }
                        )}
                    </Fragment>
                ))}
                <div ref={bottomRef} />
            </div>
        </div>

    );
}

export default ChatMessage;