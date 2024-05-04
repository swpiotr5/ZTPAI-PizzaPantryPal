import React from 'react';
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    modal: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000,
    },
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#333',
        fontSize: '18px',
        fontWeight: 'bold',
    }
});

const Modal: React.FC<{children: React.ReactNode}> = ({children}) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.overlay} />
            <div className={classes.modal}>
                <div className={classes.modalContent}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Modal;