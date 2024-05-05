import React from 'react';
import Modal from "./Modal";
import Countdown from "./Countdown";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    modalText: {
        color: '#76453B',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    username: {
        color: '#B19470',
    },
    modalButton: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        margin: '0 10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    modalButtonDisabled: {
        backgroundColor: 'gray',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '0 10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'not-allowed',
    },
});

interface DeleteUserModalProps {
    showModal: boolean;
    userToDelete: string;
    isButtonDisabled: boolean;
    handleConfirmDelete: () => void;
    setShowModal: (showModal: boolean) => void;
}

export const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ showModal, userToDelete, isButtonDisabled, handleConfirmDelete, setShowModal }) => {
    const classes = useStyles();
    if (!showModal) {
        return null;
    }
    return (
        showModal && (
            <Modal>
                <p className={classes.modalText}>Are you sure you want to delete user <span className={classes.username}>{userToDelete}</span>?</p>
                <div>
                    <button disabled={isButtonDisabled} onClick={handleConfirmDelete}
                            className={isButtonDisabled ? classes.modalButtonDisabled : classes.modalButton}>Yes
                    </button>
                    <button onClick={() => setShowModal(false)} className={classes.modalButton}>No</button>
                </div>
                <Countdown from={5} onComplete={() => {}}/>
            </Modal>
        )
    );
};