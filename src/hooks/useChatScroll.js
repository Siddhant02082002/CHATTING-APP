import { useEffect } from "react";

export const useChatScrolling = ({ chatRef,
    bottomRef,
    shouldLoadMore,
    loadMore,
    count,
}) => {

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scrollTop = topDiv?.scrollTop;

            if (scrollTop === 0 && shouldLoadMore) {
                loadMore()
            }
        };

        topDiv?.addEventListener("scroll", handleScroll);

        return () => {
            topDiv?.removeEventListener("scroll",handleScroll)
        }
    })
}

export default useChatScrolling;