import React, { useState } from "react";

import "./Home.css";

import QHeader from "../components/navbar/QHeader";
import Feed from "../components/post/Feed";
import Widget from "../components/widget/Widget";

export default function SinglePost(props) {
    const [id] = useState<string | null>(props.match.params.postId);
    return (
        <div className="quora">
            <QHeader />
            <div className="quora__content">
                <Feed singleAnswer={false} singlePost={true} id={id} />
                <Widget />
            </div>
        </div>
    );
}
