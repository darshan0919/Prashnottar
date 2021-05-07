import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { EDIT_ANSWER_MUTATION, FETCH_ANSWER_QUERY } from "../../graphql";
import {
    Answer,
    AnswerQuery,
    AnswerQueryVariables,
    EditAnswerMutationVariables,
} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);

export function useEditAnswerMutation(answerId: string, obj: Answer) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState<EditAnswerMutationVariables>({
        answerId,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    useEffect(() => {
        if (obj) setValues((values) => ({ ...values, body: obj.body }));
    }, [obj, setValues]);

    const [edit] = useMutation(EDIT_ANSWER_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: AnswerQuery = {
                ...proxy.readQuery<AnswerQuery, AnswerQueryVariables>({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            data.getAnswer = { ...data.getAnswer, ...result.data.editAnswer };
            proxy.writeQuery({
                query: FETCH_ANSWER_QUERY,
                variables: { answerId },
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
