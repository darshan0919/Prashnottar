import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER_MUTATION } from "../../graphql";
import { LoginUserMutation, LoginUserMutationVariables } from "../../types";
import { useForm } from "../form";
import { AuthContext } from "../../context/auth";

export function useLoginUserMutation(props) {
    const context = useContext(AuthContext);
    //TODO
    const [errors, setErrors] = useState<any>({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation<
        LoginUserMutation,
        LoginUserMutationVariables
    >(LOGIN_USER_MUTATION, {
        variables: values,
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
    });

    function loginUserCallback() {
        loginUser();
    }

    return {
        errors,
        onChange,
        onSubmit,
        values,
        loading,
    };
}
