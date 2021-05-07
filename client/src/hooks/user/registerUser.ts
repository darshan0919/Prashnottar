import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "../../graphql";
import {
    RegisterUserMutation,
    RegisterUserMutationVariables,
} from "../../types";

import { useForm } from "../form";
import { AuthContext } from "../../context/auth";

export function useRegisterUserMutation(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState<any>({});

    const { onChange, onSubmit, values } = useForm(registerUser, {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [addUser, { loading }] = useMutation<
        RegisterUserMutation,
        RegisterUserMutationVariables
    >(REGISTER_USER_MUTATION, {
        variables: values,
        update(_, { data: { register: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    });

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
