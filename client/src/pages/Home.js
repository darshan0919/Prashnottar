import React from "react";

import "./Home.css";
import QHeader from "../components/navbar/QHeader";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/post/Feed";
import Widget from "../components/widget/Widget";

function Home() {
    return (
        <div className="quora test">
            <QHeader />
            <div className="quora__content">
                <Sidebar />
                <Feed singleAnswer={true} />
                <Widget />
            </div>
        </div>
    );
}

export default Home;
