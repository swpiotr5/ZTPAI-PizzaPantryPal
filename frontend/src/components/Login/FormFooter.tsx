import react from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    footer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'center',
    },
    footerText: {
        fontSize: '0.6rem',
        marginTop: '20px',
    },
    footerRegisterText: {
        fontSize: '0.8rem',
    },
    '@media (max-width: 1080px)': {
        footerRegisterText: {
            padding: '20px 0px',
            fontSize: '1.3rem',
        },
        footerText: {
            fontSize: '1.1rem',
            bottom: '10px',
        },
    },
    '@media (max-width: 768px)': {
        footerRegisterText: {
            padding: '10px 0px',
            fontSize: '1rem',
        },
        footerText: {
            fontSize: '0.8rem',
            bottom: '10px',
        },
    }
});

const FormFooter = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <p className={classes.footerRegisterText}>Don't have an account? <a href="/register">Sign up</a></p>
            <p className={classes.footerText}>&copy; 2024, PizzaPantryPal. All rights reserved.</p>
        </div>
    )
};

export default FormFooter;