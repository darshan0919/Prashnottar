import { useState } from "react";
import { useMutation } from "@apollo/client";
import {
    CREATE_REPLY_MUTATION,
    CREATE_REREPLY_MUTATION,
    FETCH_COMMENT_QUERY,
    FETCH_REPLY_QUERY,
} from "../../graphql";
import {
    CreateReplyMutation,
    CreateReplyMutationVariables,
    CommentQuery,
    CommentQueryVariables,
    CreateRereplyMutation,
    CreateRereplyMutationVariables,
    ReplyQuery,
    ReplyQueryVariables,
} from "../../types";
import { ValueNode } from "graphql";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);
export function useCreateReplyMutation(commentId) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<CreateReplyMutationVariables>({
        commentId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    const [create] = useMutation<
        CreateReplyMutation,
        CreateReplyMutationVariables
    >(CREATE_REPLY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: CommentQuery = {
                ...proxy.readQuery<CommentQuery, CommentQueryVariables>({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                }),
            };
            ///console.log("resultId", result.data.createReply.id);
            if (result.data) {
                data.getComment = {
                    ...data.getComment,
                    replys: [
                        result.data.createReply.id,
                        ...data.getComment.replys,
                    ],
                    replyCount: data.getComment.replyCount + 1,
                };
                ///console.log("resultData", data.getComment);
                proxy.writeQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                    data,
                });
                values.body = initialValue;
            } else {
                console.log(`Server failed to create Reply`);
            }
        },
    });

    function createCallback() {
        create();
        setIsModalOpen(false);
    }

    return {
        IsModalOpen,
        setIsModalOpen,
        values,
        onChange,
        createCallback,
    };
}

export function useCreateRereplyMutation(replyId) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<CreateRereplyMutationVariables>({
        replyId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    const [create] = useMutation<
        CreateRereplyMutation,
        CreateRereplyMutationVariables
    >(CREATE_REREPLY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: ReplyQuery = {
                ...proxy.readQuery<ReplyQuery, ReplyQueryVariables>({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId },
                }),
            };
            ///console.log("resultId", result.data.createRereply.id);
            if (result.data) {
                data.getReply = {
                    ...data.getReply,
                    rereplys: [
                        result.data.createRereply.id,
                        ...data.getReply.rereplys,
                    ],
                    rereplyCount: data.getReply.rereplyCount + 1,
                };
                ///console.log("resultData", data.getReply);
                proxy.writeQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId },
                    data,
                });
                values.body = initialValue;
            } else {
                console.log(`Server failed to create Rereply`);
            }
        },
    });

    function createCallback() {
        create();
        setIsModalOpen(false);
    }

    return {
        IsModalOpen,
        setIsModalOpen,
        values,
        onChange,
        createCallback,
    };
}
