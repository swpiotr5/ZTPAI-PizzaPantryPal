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
        fontSize: '0.8rem',
        marginTop: '20px',
    },
    footerSignUp: {
        fontSize: '0.8rem',
    },
});

const FormFooter = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <p className={classes.footerSignUp}>Already has an account? <a href="/login">Sign in</a></p>
            <p className={classes.footerText}>&copy; 2024, PizzaPantryPal. All rights reserved.</p>
        </div>
    )
};

export default FormFooter;