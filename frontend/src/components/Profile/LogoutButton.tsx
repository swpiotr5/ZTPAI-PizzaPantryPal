import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    logoutButton: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
});

interface LogoutButtonProps {
    handleLogout: () => void;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ handleLogout }) => {
    const classes = useStyles();
    return (
        <button onClick={handleLogout} className={classes.logoutButton}>
            <FaSignOutAlt/> Logout
        </button>
    );
};