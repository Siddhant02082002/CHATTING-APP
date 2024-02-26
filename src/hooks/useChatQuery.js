import qs from "query-string";
import { useParams } from "next/navigation";
import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";;
export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue
}) => {
    const { isConnected } = useSocket();

    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, { skipNull: true })
        const res = await fetch(url);
        return res.json();
    }

    const x = useInfiniteQuery({
        queryKey: [queryKey],dsa ds ds
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
    });
    return x;
}
