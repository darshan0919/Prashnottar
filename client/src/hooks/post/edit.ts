import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "../form";
import { EDIT_POST_MUTATION, FETCH_POST_QUERY } from "../../graphql";
import {
    PostQuery,
    EditPostMutation,
    EditPostMutationVariables,
    Post,
} from "../../types";

export function useEditPostMutation(postId: string, post: Post) {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const [editPost] = useMutation<EditPostMutation, EditPostMutationVariables>(
        EDIT_POST_MUTATION,
        {
            variables: values,
            update(proxy, result) {
                const data: PostQuery = {
                    ...proxy.readQuery<PostQuery>({
                        query: FETCH_POST_QUERY,
                        variables: { postId },
                    }),
                };
                data.getPost = {
                    ...data.getPost,
                    ...result.data.editPost,
                };
                proxy.writeQuery({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                    data,
                });
            },
        }
    );
    return {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    };
}
