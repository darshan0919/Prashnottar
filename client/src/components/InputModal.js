import React, { useContext } from "react";
import Modal from "react-modal";

import { AuthContext } from "../context/auth";
import SlateEditor from "./SlateEditor";

import { Form } from "semantic-ui-react";
import { Avatar, Button } from "@material-ui/core";

import "./QHeader.css";

Modal.setAppElement("#root");

export default function InputModal(props) {
    const { user } = useContext(AuthContext);
    return (
        <Modal
            isOpen={props.IsModalOpen}
            onRequestClose={() => props.setIsModalOpen(false)}
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    width: 700,
                    height: 600,
                    backgroundColor: "rgba(0,0,0,0.8)",
                    zIndex: "3000",
                    top: "50%",
                    left: "50%",
                    marginTop: "-300px",
                    marginLeft: "-350px",
                    border: "none",
                },
            }}
        >
            <div className="modal__title">
                <h5>Add {props.title}</h5>
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
                <p>
                    {user ? user.username : "D"} {props.action}
                </p>
            </div>

            <div className="modal__Field modal__SlateField">
                <SlateEditor
                    placeholder={`Enter ${props.title}...`}
                    onChange={props.onChange}
                    value={JSON.parse(props.values.body)}
                />
            </div>
            <div className="modal__buttons">
                <button
                    className="cancle"
                    onClick={() => props.setIsModalOpen(false)}
                >
                    Cancel
                </button>
                <Button type="submit" className="add" onClick={props.callBack}>
                    Submit
                </Button>
            </div>
        </Modal>
    );
}
