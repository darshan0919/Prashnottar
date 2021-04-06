import React from "react";

import "./Home.css";

import QHeader from "../components/QHeader";
import Sidebar from "../components/Sidebar";
import Widget from "../components/Widget";
import Feed from "../components/Feed";

function Home() {
    return (
        <div className="quora">
            <QHeader />
            {
                <div className="quora__content">
                    <Sidebar />
                    <Feed singleAnswer={true} />
                    <Widget />
                </div>
            }
        </div>
    );
}

export default Home;
