import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getQuery } from "../graphql";

export function useGetQuery(id, model) {
    const Model = model.charAt(0).toUpperCase() + model.slice(1);

    const [result, setResult] = useState(null);
    //console.log(`${model}Id`, id, model);
    //console.log(getQuery(model));
    const { loading, data, error } = useQuery(getQuery(model), {
        variables: { [`${model}Id`]: id },
    });
    useEffect(() => {
        if (!loading) {
            if (error) {
                alert(`Error Loading ${Model}!`);
            } else {
                setResult(data[`get${Model}`]);
            }
        }
    }, [loading, data, error, Model]);
    return result;
}
