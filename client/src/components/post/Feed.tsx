import React from "react";
import { useGetPostsQuery } from "../../hooks";
import QuoraBox from "./QuoraBox";
import Post from "./Post";
import "./Feed.css";

function Feed({
    id,
    singlePost,
    singleAnswer,
}: {
    id: string | null;
    singlePost: boolean;
    singleAnswer: boolean;
}) {
    const posts = useGetPostsQuery();

    return (
        <div className="feed">
            <QuoraBox />
            {singlePost ? (
                <Post key={id} id={id} singleAnswer={null} />
            ) : posts ? (
                posts.map(({ id }) => (
                    <Post key={id} id={id} singleAnswer={singleAnswer} />
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default Feed;
