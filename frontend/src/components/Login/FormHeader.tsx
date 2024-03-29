import react from 'react';
import { createUseStyles } from 'react-jss';
import PizzaPantryPalLogo from '../../assets/pizzalogo.png';

const useStyles = createUseStyles({
    image: {
        width: '40%',
        height: 'auto',
    },
});

const FormHeader = () => {
    const classes = useStyles();
    return (
        <img src={PizzaPantryPalLogo} className={classes.image} alt="" />
    )
};

export default FormHeader;