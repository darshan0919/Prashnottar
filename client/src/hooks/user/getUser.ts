import { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { FETCH_USER_QUERY } from "../../graphql";
import { User, UserQuery, UserQueryVariables } from "../../types";
import { Maybe } from "graphql/jsutils/Maybe";

export function useGetUserQuery() {
    const [result, setResult] = useState<Maybe<User>>(null);
    const [getData, { data, error }] = useLazyQuery<
        UserQuery,
        UserQueryVariables
    >(FETCH_USER_QUERY);

    const runQuery: (id: string) => void = useCallback(
        (id) => getData({ variables: { id } }),
        [getData]
    );

    useEffect(() => {
        if (error) {
            alert("Error Loading Post User!");
        } else if (data) {
            setResult(data.getUser);
        } else {
            console.log("No idea what is happenning!");
        }
    }, [data, error]);

    return { user: result, setUser: runQuery };
}
