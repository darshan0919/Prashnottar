import { useMutation } from "@apollo/client";
import { getQuery, getMutation } from "../graphql";

export function useDeleteMutation(id, model, parentId, parentModel) {
    const momodel = model === parentModel ? "re" + model : model;
    const Model = model.charAt(0).toUpperCase() + model.slice(1);
    const ParentModel =
        parentModel.charAt(0).toUpperCase() + parentModel.slice(1);

    const [deleteFunction] = useMutation(getMutation(model, "delete"), {
        variables: { [`${model}Id`]: id },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: getQuery(parentModel),
                    variables: { [`${parentModel}Id`]: parentId },
                }),
            };
            if (result.data) {
                const Index = data[`get${ParentModel}`][
                    `${momodel}s`
                ].findIndex((Id) => id === Id);
                data[`get${ParentModel}`] = {
                    ...data[`get${ParentModel}`],
                    [`${momodel}s`]: [
                        ...data[`get${ParentModel}`][`${momodel}s`].slice(
                            0,
                            Index
                        ),
                        ...data[`get${ParentModel}`][`${momodel}s`].slice(
                            Index + 1
                        ),
                    ],
                };
                if (model === "comment" || model === "reply") {
                    data[`get${ParentModel}`] = {
                        ...data[`get${ParentModel}`],
                        [`${momodel}Count`]:
                            data[`get${ParentModel}`][`${momodel}Count`] - 1,
                    };
                }
                proxy.writeQuery({
                    query: getQuery(parentModel),
                    variables: { [`${parentModel}Id`]: parentId },
                    data,
                });
            } else {
                console.log(`Server failed to delete ${Model}!`);
            }
        },
    });
    return deleteFunction;
}
