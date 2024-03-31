import react from 'react';
import { createUseStyles } from 'react-jss';
import PizzaLogo from '../../assets/pizzalogo.png';

const useStyles = createUseStyles({
    image: {
        width: '40%',
        height: 'auto',
    },
});

const FormHeader = () => {
    const classes = useStyles();
    return (
        <img src={PizzaLogo} className={classes.image} alt="" />
    )
};

export default FormHeader;