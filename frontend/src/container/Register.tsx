import { createUseStyles } from 'react-jss';
import RightWrapper from '../components/Register/RightWrapper';
import LeftWrapper from '../components/Register/LeftWrapper';


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

const Register = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <LeftWrapper />
                <RightWrapper />
            </div>
        </div>
    );
};

export default Register;