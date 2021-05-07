import { useState } from "react";
import { useMutation } from "@apollo/client";

import { useForm } from "../form";

import {
    PostInput,
    PostsQuery,
    CreatePostMutation,
    CreatePostMutationVariables,
} from "../../types";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../../graphql";

const initialValue: PostInput = {
    question: "",
    imageUrl: "",
};

export function useCreatePostMutation() {
    const [IsModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { onChange, onSubmit, values } = useForm(
        createPostCallback,
        initialValue
    );

    const [createPost] = useMutation<
        CreatePostMutation,
        CreatePostMutationVariables
    >(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data: PostsQuery = {
                ...proxy.readQuery<PostsQuery>({
                    query: FETCH_POSTS_QUERY,
                }),
            };
            console.log("getPosts", data.getPosts);
            data.getPosts = [
                { id: result.data.createPost.id },
                ...data.getPosts,
            ];
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
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
