import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_REPLY_QUERY } from "../../graphql";
import { Maybe, Reply, ReplyQuery, ReplyQueryVariables } from "../../types";

export function useGetReplyQuery(replyId) {
    const [result, setResult] = useState<Maybe<Reply>>(null);
    const { loading, data, error } = useQuery<ReplyQuery, ReplyQueryVariables>(
        FETCH_REPLY_QUERY,
        { variables: { replyId } }
    );
    useEffect(() => {
        if (!loading) {
            if (error) alert(`Error Loading Reply!`);
            else setResult(data.getReply);
        }
    }, [loading, data, error]);
    return result;
}
