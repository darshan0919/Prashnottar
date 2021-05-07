import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_ANSWER_MUTATION, FETCH_POST_QUERY } from "../../graphql";
import {
    CreateAnswerMutation,
    CreateAnswerMutationVariables,
    PostQuery,
    PostQueryVariables,
} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);

export function useCreateAnswerMutation(postId: string) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<CreateAnswerMutationVariables>({
        postId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    const [create] = useMutation<
        CreateAnswerMutation,
        CreateAnswerMutationVariables
    >(CREATE_ANSWER_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: PostQuery = {
                ...proxy.readQuery<PostQuery, PostQueryVariables>({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                }),
            };
            ///console.log("resultId", result.data.createAnswer.id);
            if (result.data) {
                data.getPost = {
                    ...data.getPost,
                    answers: [
                        result.data.createAnswer.id,
                        ...data.getPost.answers,
                    ],
                };
                /*if (
                    childModel === "comment" ||
                    childModel === "reply" ||
                    childModel === "rereply"
                ) {
                    data[`get${Model}`] = {
                        ...data[`get${Model}`],
                        [`${childModel}Count`]:
                            data[`get${Model}`][`${childModel}Count`] + 1,
                    };
                }*/
                ///console.log("resultData", data.getPost);
                proxy.writeQuery({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                    data,
                });
                values.body = initialValue;
            } else {
                console.log(`Server failed to create Post`);
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
