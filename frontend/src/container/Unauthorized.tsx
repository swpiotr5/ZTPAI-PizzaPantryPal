// src/container/Unauthorized.tsx

import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    unauthorizedContainer: {
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#F8FAE5',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '100px auto',
    },
    title: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#76453B',
    },
    message: {
        fontSize: '18px',
        color: '#43766C',
    },
});

const Unauthorized: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.unauthorizedContainer}>
            <h1 className={classes.title}>Unauthorized Access</h1>
            <p className={classes.message}>You do not have permission to access this page.</p>
        </div>
    );
};

export default Unauthorized;
