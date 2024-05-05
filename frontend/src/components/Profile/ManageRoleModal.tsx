// frontend/src/components/Profile/ManageRoleModal.tsx
import React from 'react';
import Modal from "./Modal";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    modalText: {
        fontSize: '16px',
        marginBottom: '20px',
    },
    username: {
        fontWeight: 'bold',
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

interface ManageRoleModalProps {
    showModal: boolean;
    userToChangeRole: string;
    isButtonDisabled: boolean;
    handleConfirmChangeRole: () => Promise<void>;
    setShowChangeRoleModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ManageRoleModal: React.FC<ManageRoleModalProps> = ({ showModal, userToChangeRole, isButtonDisabled, handleConfirmChangeRole, setShowChangeRoleModal }) => {
    const classes = useStyles();
    if (!showModal) {
        return null;
    }
    return (
        <Modal>
            {showModal && (
                <>
                    <p className={classes.modalText}>Are you sure you want to change the role of user <span className={classes.username}>{userToChangeRole}</span>?</p>
                    <div>
                        <button disabled={isButtonDisabled} onClick={handleConfirmChangeRole}
                                className={isButtonDisabled ? classes.modalButtonDisabled : classes.modalButton}>Yes
                        </button>
                        <button onClick={() => setShowChangeRoleModal(false)} className={classes.modalButton}>No</button>
                    </div>
                </>
            )}
        </Modal>
    );
};