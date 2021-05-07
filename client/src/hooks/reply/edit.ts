import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_REPLY_MUTATION, FETCH_REPLY_QUERY } from "../../graphql";
import {
    EditReplyMutationVariables,
    ReplyQuery,
    ReplyQueryVariables,
} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);

export function useEditReplyMutation(replyId, obj) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<EditReplyMutationVariables>({
        replyId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    useEffect(() => {
        if (obj) setValues((values) => ({ ...values, body: obj.body }));
    }, [obj, setValues]);

    const [edit] = useMutation(EDIT_REPLY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: ReplyQuery = {
                ...proxy.readQuery<ReplyQuery, ReplyQueryVariables>({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId },
                }),
            };
            data.getReply = { ...data.getReply, ...result.data.editReply };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: { replyId },
                data,
            });
        },
    });
    function editCallback() {
        edit();
        setIsModalOpen(false);
    }
    return {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        editCallback,
        values,
    };
}
