import React from 'react';
import { createUseStyles } from 'react-jss';
import RightWrapperImage from "./RightWrapperImage";

const useStyles = createUseStyles({
    right: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1px',
        borderTopLeftRadius: '20px',
        borderBottomLeftRadius: '20px',
        width: '50%',
        height: '100%'
    },
    infoTextTop: {
        color: '#F0ECE5',
        textAlign: 'center',
        fontSize: 'larger',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: '40px',
        position: 'absolute',
        zIndex: 1,
        fontFamily: 'Arial, sans-serif',
        lineHeight: '2',
        letterSpacing: '2px',
        textShadow: '10px 5px 10px rgba(0, 0, 0, 0.5)',
    },
    infoTextBottom: {
        color: '#F0ECE5',
        textAlign: 'center',
        fontSize: 'larger',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        marginBottom: '40px',
        position: 'absolute',
        bottom: '0',
        zIndex: 1,
        fontFamily: 'Arial, sans-serif',
        lineHeight: '2',
        letterSpacing: '2px',
        textShadow: '10px 5px 10px rgba(0, 0, 0, 0.5)',
    },
    '@media (max-width: 1080px)': {
        right: {
            padding: '0px',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            display: 'none',
        },
    },
    '@media (max-width: 768px)': {
        right: {
            display: 'none',
        },
    },
});

const RightWrapper = () => {
    const classes = useStyles();

    return (
        <div className={classes.right}>
            <RightWrapperImage />
            <div className={classes.infoTextTop}>
                <p>Welcome to Pizza Pantry Pal! </p>
                <p>Say Goodbye to Stock Shortages.</p>
            </div>
            <div className={classes.infoTextBottom}>
                <p>Streamline your stock.</p>
                <p>Serve with confidence.</p>
                <p>Pizza Pantry Pal: Your recipe for success!</p>
            </div>
        </div>
    );
};

export default RightWrapper;