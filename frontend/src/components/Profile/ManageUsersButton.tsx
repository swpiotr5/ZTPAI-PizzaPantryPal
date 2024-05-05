// ManageUsersButton.tsx
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    manageUsersButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    caretIcon: {
        marginLeft: '10px',
    },
});

interface ManageUsersButtonProps {
    handleManageUsersClick: () => void;
}

export const ManageUsersButton: React.FC<ManageUsersButtonProps> = ({ handleManageUsersClick }) => {
    const classes = useStyles();
    return (
        <button onClick={handleManageUsersClick} className={classes.manageUsersButton}>
            Manage Users <FaCaretDown className={classes.caretIcon} />
        </button>
    );
};