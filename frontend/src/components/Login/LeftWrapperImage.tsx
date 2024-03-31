import { createUseStyles } from 'react-jss';
import pizzamanImage from '../../assets/pizzaman.png';

const useStyles = createUseStyles({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderBottomLeftRadius: '20px',
        borderTopLeftRadius: '20px',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: '0px 0px 14px 2px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.05)',
        },
    },
});

const LeftWrapperImage = () => {
    const classes = useStyles();

    return (
        <img className={classes.image} src={pizzamanImage} alt="Man with the pizza." />
    );
};

export default LeftWrapperImage;