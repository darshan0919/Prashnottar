import React from "react";
import { useQuery } from "@apollo/client";

import QuorBox from "./QuorBox";
import "./Feed.css";
import Post from "./Post";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Feed(props) {
    const { loading, data, error } = useQuery(FETCH_POSTS_QUERY);

    return (
        <div className="feed">
            <QuorBox />
            {loading ? (
                <></>
            ) : error ? (
                <>{`Error in Feed! ${error.message}`}</>
            ) : props.singlePost ? (
                <Post key={props.id} id={props.id} />
            ) : (
                data.getPosts.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        singleAnswer={props.singleAnswer}
                    />
                ))
            )}
        </div>
    );
}

export default Feed;
