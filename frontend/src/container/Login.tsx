import React from 'react';
import { createUseStyles } from 'react-jss';
import RightWrapper from '../components/Login/RightWrapper';
import LeftWrapper from '../components/Login/LeftWrapper';

const useStyles = createUseStyles({
    '@global': {
        '*': {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },
        '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap")',
        html: {
            height: '100%',
            width: '100%',
        },
        body: {
            height: '100%',
            width: '100%',
            fontFamily: 'Roboto, sans-serif',
        },

    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#43766C',
        margin: '0px',
        padding: '0px',
    },
    wrapper:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        width: '70%',
        backgroundColor: '#F8FAE5',
        maxWidth: '1200px',
        borderRadius: '30px'
    },
    '@media (max-width: 1080px)': {
        wrapper: {
            width: '100%',
            minHeight: '100vh',
            padding: '0px',
            borderRadius: '0px'
        },
    },
    '@media (orientation: landscape)': {
        root: {
            minHeight: '100vh',
            width: '100%',
        },
        wrapper: {
            width: '100%',
        },
    },
});

interface LoginProps {
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<LoginProps> = ({ setIsAuth , setIsManager}) =>  {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <LeftWrapper />
                <RightWrapper setIsAuth={setIsAuth} setIsManager={setIsManager}/>
            </div>
        </div>
    );
};

export default Login;