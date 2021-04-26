import { useState, useEffect, useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { getQuery } from "../../graphql";

export function useGetUserQuery() {
    const [result, setResult] = useState(null);
    const [getData, { data, error }] = useLazyQuery(getQuery("user"));

    const runQuery = useCallback((id) => getData({ variables: { id } }), [
        getData,
    ]);

    useEffect(() => {
        if (error) {
            alert("Error Loading Post User!");
        } else if (data) {
            setResult(data.getUser);
        } else {
            console.log("No idea what is happenning!");
        }
    }, [data, error]);

    return [result, runQuery];
}
