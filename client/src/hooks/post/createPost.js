import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "../form";
import { getMutation, getQuery } from "../../graphql";

const initialValue = {
    question: "",
    imageUrl: "",
};

export function useCreatePostMutation() {
    const [IsModalOpen, setIsModalOpen] = useState(false);

    const { onChange, onSubmit, values } = useForm(
        createPostCallback,
        initialValue
    );

    const [createPost] = useMutation(getMutation("post", "create"), {
        variables: values,
        update(proxy, result) {
            const data = { ...proxy.readQuery({ query: getQuery("posts") }) };
            console.log("getPosts", data.getPosts);
            data.getPosts = [result.data.createPost.id, ...data.getPosts];
            proxy.writeQuery({ query: getQuery("posts"), data });
            values.question = "";
            values.imageUrl = "";
        },
    });

    function createPostCallback() {
        setIsModalOpen(false);
        createPost();
    }

    return {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    };
}
