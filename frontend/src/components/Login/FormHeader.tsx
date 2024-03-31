import react from 'react';
import { createUseStyles } from 'react-jss';
import PizzaPantryPalLogo from '../../assets/pizzalogo.png';

const useStyles = createUseStyles({
    image: {
        width: '40%',
        height: 'auto',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    '@media (max-width: 1080px)': {
        image: {
            width: '30%',
            marginBottom: '20px',
        },
    },
    '@media (max-width: 768px)': {
        image: {
            width: '40%',
        },
    },
});

const FormHeader = () => {
    const classes = useStyles();
    return (
        <img src={PizzaPantryPalLogo} className={classes.image} alt="" />
    )
};

export default FormHeader;