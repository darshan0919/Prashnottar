import { useState } from "react";
import { useMutation } from "@apollo/client";
import { getQuery, getMutation } from "../../graphql";
import {} from "../../types";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);

export function useCreateMutation(id, model, childModel) {
    const Model = model.charAt(0).toUpperCase() + model.slice(1);
    const ChildModel = childModel.charAt(0).toUpperCase() + childModel.slice(1);

    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [values, setValues] = useState({
        [`${model}Id`]: id,
        body: initialValue,
    });

    const onChange = (body) =>
        setValues({ ...values, body: JSON.stringify(body) });

    const [create] = useMutation(getMutation(childModel, "create"), {
        variables: values,
        update(proxy, result) {
            const data = {
                //TODO
                ...proxy.readQuery<any>({
                    query: getQuery(model),
                    variables: { [`${model}Id`]: id },
                }),
            };
            ///console.log("resultId", result.data[`create${ChildModel}`].id);
            if (result.data) {
                data[`get${Model}`] = {
                    ...data[`get${Model}`],
                    [`${childModel}s`]: [
                        result.data[`create${ChildModel}`].id,
                        ...data[`get${Model}`][`${childModel}s`],
                    ],
                };
                if (
                    childModel === "comment" ||
                    childModel === "reply" ||
                    childModel === "rereply"
                ) {
                    data[`get${Model}`] = {
                        ...data[`get${Model}`],
                        [`${childModel}Count`]:
                            data[`get${Model}`][`${childModel}Count`] + 1,
                    };
                }
                ///console.log("resultData", data[`get${Model}`]);
                proxy.writeQuery({
                    query: getQuery(model),
                    variables: { [`${model}Id`]: id },
                    data,
                });
                values.body = initialValue;
            } else {
                console.log(`Server failed to create ${Model}`);
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
