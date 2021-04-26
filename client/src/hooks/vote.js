import { useMutation } from "@apollo/client";
import { getQuery, getMutation } from "../graphql";

export function useVoteMutation(id, model, type) {
    const Model = model.charAt(0).toUpperCase() + model.slice(1);
    const [vote] = useMutation(getMutation(model, type), {
        variables: { [`${model}Id`]: id },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: getQuery(model),
                    variables: { [`${model}Id`]: id },
                }),
            };
            data[`get${Model}`] = {
                ...data[`get${Model}`],
                ...result.data[`${type}${Model}`],
            };
            proxy.writeQuery({
                query: getQuery(model),
                variables: { [`${model}Id`]: id },
                data,
            });
        },
    });
    return vote;
}
