import { createUseStyles } from 'react-jss';
import pizzamanImage from '../../assets/pizzaman.png';

const useStyles = createUseStyles({
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
    },
});

const LeftWrapperImage = () => {
    const classes = useStyles();

    return (
        <img className={classes.image} src={pizzamanImage} alt="Man with the pizza." />
    );
};

export default LeftWrapperImage;