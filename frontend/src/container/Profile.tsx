import React, {useState} from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from "react-jss";
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '90vh',
        maxWidth: '1500px',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            marginTop: '80px',
            borderRadius: '20px',
            width: '100%',
            backgroundColor:  '#F8FAE5',
        },
    },
    userIcon: {
        fontSize: '12rem',
        color: '#76453B',
        marginBottom: '50px',
    },
    userDetails: {
        marginBottom: '50px',
    },
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
    userDetailsText: {
        color: '#76453B',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
});

const Profile = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        console.log('User logged out');
        window.location.reload();
    };

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <FaUserCircle className={classes.userIcon}/>
                    <div className={classes.userDetails}>
                        <p className={classes.userDetailsText}>Username: JohnDoe</p>
                        <p className={classes.userDetailsText}>Role: Admin</p>
                    </div>
                    <button onClick={handleLogout} className={classes.logoutButton}>
                        <FaSignOutAlt/> Logout
                    </button>
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default Profile;