import React, { useContext } from "react";
import Modal from "react-modal";

import { AuthContext } from "../../context/auth";
import SlateEditor from "../editor/SlateEditor";

import { Avatar, Button } from "@material-ui/core";

import "./InputModal.css";

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
                    height: 650,
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
                <h5>Add {props.title}</h5>
            </div>
            {user ? (
                <div className="modal__info">
                    <Avatar className="avatar" src={user.photo} />
                    <p>
                        {user.username} {props.action}
                    </p>
                </div>
            ) : (
                <></>
            )}

            <div>
                <SlateEditor
                    placeholder={`Enter ${props.title}...`}
                    onChange={props.onChange}
                    value={JSON.parse(props.values.body)}
                />
            </div>
            <div className="modal__buttons">
                <button
                    className="cancel"
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
