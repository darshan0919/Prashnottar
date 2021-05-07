import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_ANSWER_QUERY } from "../../graphql";
import { Maybe, Answer, AnswerQuery, AnswerQueryVariables } from "../../types";

export function useGetAnswerQuery(answerId) {
    const [result, setResult] = useState<Maybe<Answer>>(null);
    const { loading, data, error } = useQuery<
        AnswerQuery,
        AnswerQueryVariables
    >(FETCH_ANSWER_QUERY, { variables: { answerId } });
    useEffect(() => {
        if (!loading) {
            if (error) alert(`Error Loading Answer!`);
            else setResult(data.getAnswer);
        }
    }, [loading, data, error]);
    return result;
}
