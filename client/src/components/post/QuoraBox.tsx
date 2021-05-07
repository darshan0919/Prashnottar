import React, { useContext } from "react";
import { Avatar } from "@material-ui/core";
import { AuthContext } from "../../context/auth";
import "./QuoraBox.css";
import QuestionModal from "../modal/QuestionModal";
import { useCreatePostMutation } from "../../hooks/post/create";

export default function QuoraBox() {
    const { user } = useContext(AuthContext);
    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    } = useCreatePostMutation();
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
            <QuestionModal
                {...{
                    IsModalOpen,
                    setIsModalOpen,
                    onSubmit,
                    onChange,
                    values,
                }}
            />
        </div>
    );
}
