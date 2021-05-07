import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_COMMENT_MUTATION, FETCH_COMMENT_QUERY } from "../../graphql";
import {
    CommentQuery,
    CommentQueryVariables,
    EditCommentMutationVariables,
} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);
export function useEditCommentMutation(commentId, obj) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<EditCommentMutationVariables>({
        commentId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    useEffect(() => {
        if (obj) setValues((values) => ({ ...values, body: obj.body }));
    }, [obj, setValues]);

    const [edit] = useMutation(EDIT_COMMENT_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: CommentQuery = {
                ...proxy.readQuery<CommentQuery, CommentQueryVariables>({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.editComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: { commentId },
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
