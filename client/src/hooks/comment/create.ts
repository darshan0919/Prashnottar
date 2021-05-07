import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_COMMENT_MUTATION, FETCH_ANSWER_QUERY } from "../../graphql";
import {
    CreateCommentMutation,
    CreateCommentMutationVariables,
    AnswerQuery,
    AnswerQueryVariables,
} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);
export function useCreateCommentMutation(answerId: string) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<CreateCommentMutationVariables>({
        answerId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    const [create] = useMutation<
        CreateCommentMutation,
        CreateCommentMutationVariables
    >(CREATE_COMMENT_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: AnswerQuery = {
                ...proxy.readQuery<AnswerQuery, AnswerQueryVariables>({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            ///console.log("resultId", result.data.createComment.id);
            if (result.data) {
                data.getAnswer = {
                    ...data.getAnswer,
                    comments: [
                        result.data.createComment.id,
                        ...data.getAnswer.comments,
                    ],
                    commentCount: data.getAnswer.commentCount + 1,
                };
                ///console.log("resultData", data.getAnswer);
                proxy.writeQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                    data,
                });
                values.body = initialValue;
            } else {
                console.log(`Server failed to create Comment`);
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
