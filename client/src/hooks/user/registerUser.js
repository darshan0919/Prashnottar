import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { getMutation } from "../../graphql";
import { useForm } from "../form";
import { AuthContext } from "../../context/auth";

export function useRegisterUserMutation(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [addUser, { loading }] = useMutation(
        getMutation("user", "register"),
        {
            update(_, { data: { register: userData } }) {
                context.login(userData);
                props.history.push("/");
            },
            onError(err) {
                setErrors(err.graphQLErrors[0].extensions.exception.errors);
            },
            variables: values,
        }
    );

    function registerUser() {
        addUser();
    }

    return {
        errors,
        onChange,
        onSubmit,
        values,
        loading,
    };
}
