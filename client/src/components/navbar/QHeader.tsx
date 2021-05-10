import React, { useContext } from "react";

import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import { Avatar, Button } from "@material-ui/core";

import "./QHeader.css";

import { AuthContext } from "../../context/auth";
import QuestionModal from "../modal/QuestionModal";
import { useCreatePostMutation } from "../../hooks/post/create";

function QHeader() {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        window.location.href = "http://localhost:3000/";
    }

    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    } = useCreatePostMutation();

    return (
        <div className="qHeader">
            <div className="qHeader__logo">
                <span className="logo">Prashnottar</span>
                {/*<img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                    alt=""
                />*/}
            </div>
            <div className="qHeader__icons">
                <div className="active qHeader__icon">
                    <HomeIcon
                        onClick={() => {
                            window.location.href = "http://localhost:3000/";
                        }}
                    />
                </div>
                <div className="qHeader__icon">
                    <FeaturedPlayListOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <AssignmentTurnedInOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <PeopleAltOutlinedIcon />
                </div>
                <div className="qHeader__icon">
                    <NotificationsOutlinedIcon />
                </div>
            </div>
            <div className="qHeader__input">
                <SearchIcon />
                <input type="text" placeholder="Search..." />
            </div>
            <div className="qHeader__Rem">
                <div className="qHeader__avatar">
                    <Avatar onClick={logout} src={user.photo} />
                </div>
                <LanguageIcon />
                <Button onClick={() => setIsModalOpen(true)}>
                    Add Question
                </Button>
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
        </div>
    );
}

export default QHeader;
