import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "../form";
import { getMutation, getQuery } from "../../graphql";

export function useEditPostMutation(postId, post) {
    const [IsModalOpen, setIsModalOpen] = useState(false);

    const { onChange, onSubmit, values } = useForm(editPostCallback, {
        postId,
        question: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (post) {
            onChange({
                target: { name: "question", value: post.question },
            });
            onChange({
                target: { name: "imageUrl", value: post.imageUrl },
            });
        }
    }, [post, onChange]);

    function editPostCallback() {
        editPost();
        setIsModalOpen(false);
    }

    const [editPost] = useMutation(getMutation("post", "edit"), {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: getQuery("post"),
                    variables: { postId },
                }),
            };
            data.getPost = {
                ...data.getPost,
                ...result.data.editPost,
            };
            proxy.writeQuery({
                query: getQuery("post"),
                variables: { postId },
                data,
            });
        },
    });
    return {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    };
}
