import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { getQuery, getMutation } from "../graphql";

const initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
]);

export function useEditMutation(id, obj, model) {
    const Model = model.charAt(0).toUpperCase() + model.slice(1);

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const [values, setValues] = useState({
        [`${model}Id`]: id,
        body: initialValue,
    });

    const onChange = (body) => {
        setValues({ ...values, body: JSON.stringify(body) });
    };

    useEffect(() => {
        if (obj) {
            setValues((values) => ({ ...values, body: obj.body }));
        }
    }, [obj, setValues]);

    const [edit] = useMutation(getMutation(model, "edit"), {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: getQuery(model),
                    variables: { [`${model}Id`]: id },
                }),
            };
            data[`get${Model}`] = {
                ...data[`get${Model}`],
                ...result.data[`edit${Model}`],
            };
            proxy.writeQuery({
                query: getQuery(model),
                variables: { [`${model}Id`]: id },
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
