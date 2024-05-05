import React from 'react';
import { createUseStyles } from "react-jss";
import { User } from '../../container/Profile';

const useStyles = createUseStyles({
    userDetails: {
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    userDetailsText: {
        color: '#76453B',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
        fontFamily: '"Arial", sans-serif',
    },
});

interface UserDetailsProps {
    user: User | null;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
    const classes = useStyles();
    return (
        user && (
            <div className={classes.userDetails}>
                <p className={classes.userDetailsText}>Username: {user.username}</p>
                <p className={classes.userDetailsText}>Role: {user.roles[0].name}</p>
            </div>
        )
    );
};