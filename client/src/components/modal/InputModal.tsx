import React, { useContext } from "react";
import Modal from "react-modal";

import { AuthContext } from "../../context/auth";
import SlateEditor from "../editor/SlateEditor";

import { Avatar, Button } from "@material-ui/core";

import "./InputModal.css";

Modal.setAppElement("#root");

export default function InputModal({
    IsModalOpen,
    setIsModalOpen,
    onChange,
    values,
    callBack,
    title,
    action,
}: {
    IsModalOpen: boolean;
    setIsModalOpen: (a: boolean) => void;
    onChange: (a: any) => void;
    values: any;
    callBack: () => void;
    title: string;
    action: string;
}) {
    const { user } = useContext(AuthContext);
    return (
        <Modal
            isOpen={IsModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
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
                <h5>Add {title}</h5>
            </div>
            {user ? (
                <div className="modal__info">
                    <Avatar className="avatar" src={user.photo} />
                    <p>
                        {user.username} {action}
                    </p>
                </div>
            ) : (
                <></>
            )}

            <div>
                <SlateEditor
                    readOnly={false}
                    placeholder={`Enter ${title}...`}
                    onChange={onChange}
                    value={JSON.parse(values.body)}
                />
            </div>
            <div className="modal__buttons">
                <button
                    className="cancel"
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </button>
                <Button type="submit" className="add" onClick={callBack}>
                    Submit
                </Button>
            </div>
        </Modal>
    );
}
