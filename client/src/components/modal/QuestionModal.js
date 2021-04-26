import React, { useContext } from "react";
import Modal from "react-modal";

import { AuthContext } from "../../context/auth";

import { Form } from "semantic-ui-react";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import { ExpandMore, Link } from "@material-ui/icons";
import { Avatar, Button } from "@material-ui/core";

import "./QuestionModal.css";

Modal.setAppElement("#root");

export default function QuestionModal(props) {
    const { user } = useContext(AuthContext);
    return (
        <Modal
            isOpen={props.IsModalOpen}
            onRequestClose={() => props.setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    width: 700,
                    height: 620,
                    background: "none",
                    zIndex: "3000",
                    top: "50%",
                    left: "50%",
                    marginTop: "-300px",
                    marginLeft: "-375px",
                },
                content: {
                    border: "2.5px solid #ccc",
                    borderRadius: "none",
                },
            }}
        >
            <div className="modal__title">
                <h5>Add Question</h5>
                {/*<h5>Share Link</h5>*/}
            </div>
            <div className="modal__info">
                <Avatar
                    className="avatar"
                    src={
                        user
                            ? user.photo
                            : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573"
                    }
                />
                <p>{user ? user.username : "D"} asked</p>
                <div className="modal__scope">
                    <PeopleAltOutlinedIcon />
                    <p>Public</p>
                    <ExpandMore />
                </div>
            </div>
            <Form onSubmit={props.onSubmit}>
                <div className="modal__Field">
                    <textarea
                        placeholder="Start your question with 'What', 'How', 'Why', etc. "
                        name="question"
                        onChange={props.onChange}
                        value={props.values.question}
                    />
                    <div className="modal__fieldLink">
                        <Link />
                        <Form.Input
                            className="linkBox"
                            placeholder="Optional: inclue a link that gives context"
                            name="imageUrl"
                            onChange={props.onChange}
                            value={props.values.imageUrl}
                        />
                    </div>
                </div>
                <div className="modal__buttons">
                    <button
                        className="cancel"
                        onClick={() => props.setIsModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <Button type="submit" className="add">
                        Submit
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
