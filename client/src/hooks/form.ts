import { useCallback, useState } from "react";

export const useForm = (callback, initialState: any = {}) => {
    //TODO
    const [values, setValues] = useState(initialState);

    const onChange = useCallback(
        (event) => {
            const { name, value } = event.target;
            setValues((values) => ({
                ...values,
                [name]: value,
            }));
        },
        [setValues]
    );

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };
    return {
        onChange,
        onSubmit,
        values,
    };
};
