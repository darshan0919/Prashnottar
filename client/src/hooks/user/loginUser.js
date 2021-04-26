import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { getMutation } from "../../graphql";
import { useForm } from "../form";
import { AuthContext } from "../../context/auth";

export function useLoginUserMutation(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(getMutation("user", "login"), {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push("/");
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values,
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
