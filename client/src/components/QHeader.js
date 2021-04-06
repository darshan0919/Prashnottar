import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import HomeIcon from "@material-ui/icons/Home";
import FeaturedPlayListOutlinedIcon from "@material-ui/icons/FeaturedPlayListOutlined";
import AssignmentTurnedInOutlinedIcon from "@material-ui/icons/AssignmentTurnedInOutlined";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import NotificationsOutlinedIcon from "@material-ui/icons/NotificationsOutlined";
import SearchIcon from "@material-ui/icons/Search";
import LanguageIcon from "@material-ui/icons/Language";
import { Avatar, Button } from "@material-ui/core";

import "./QHeader.css";

import { AuthContext } from "../context/auth";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";
import { useForm } from "../util/hooks";
import QuestionModal from "./QuestionModal";
import { Link } from "react-router-dom";

function QHeader(props) {
    const { user, logout } = useContext(AuthContext);

    if (!user) {
        window.location.href = "http://localhost:3000/";
    }

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const { onChange, onSubmit, values } = useForm(createPostCallback, {
        question: "",
        imageUrl: "",
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                }),
            };
            console.log("Creating Post");
            data.getPosts = [result.data.createPost, ...data.getPosts];
            //console.log(data.getPosts);
            proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            values.body = "";
        },
    });

    function createPostCallback() {
        setIsModalOpen(false);
        createPost();
    }

    return (
        <div className="qHeader">
            <div className="qHeader__logo">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png"
                    alt=""
                />
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
                <input type="text" placeholder="Search Quora" />
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
                        error,
                    }}
                />
            </div>
        </div>
    );
}

export default QHeader;
