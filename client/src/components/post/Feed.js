import React from "react";
import { useGetQuery } from "../../hooks";
import QuoraBox from "./QuoraBox";
import Post from "./Post";
import "./Feed.css";

function Feed(props) {
    const posts = useGetQuery(null, "posts");

    return (
        <div className="feed">
            <QuoraBox />
            {props.singlePost ? (
                <Post key={props.id} id={props.id} />
            ) : posts ? (
                posts.map(({ id }) => (
                    <Post key={id} id={id} singleAnswer={props.singleAnswer} />
                ))
            ) : (
                <></>
            )}
        </div>
    );
}

export default Feed;
