import { Avatar } from "@material-ui/core";
import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

import "./QuoraBox.css";

export default function QuorBox() {
    const { user } = useContext(AuthContext);
    return (
        <div className="quoraBox">
            <div className="quoraBox__info">
                <Avatar
                    src={
                        user
                            ? user.photo
                            : "https://cdn.cms-twdigitalassets.com/content/dam/partners-twitter/partner-profile/sprinklr/sprinklr.png.twimg.1920.png"
                    }
                    className="quoraBox__infoAvatar"
                />
                <h5>{user.username}</h5>
            </div>
            <div className="quoraBox__quora">
                <p>What is your question or link?</p>
            </div>
        </div>
    );
}
