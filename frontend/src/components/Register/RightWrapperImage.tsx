import { createUseStyles } from 'react-jss';
import pantryImage from '../../assets/pantry.png';

const useStyles = createUseStyles({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderBottomRightRadius: '20px',
        borderTopRightRadius: '20px',
        transition: 'transform 0.3s ease-in-out',
        boxShadow: '0px 0px 14px 2px rgba(0, 0, 0, 0.1)',
        '&:hover': {
            transform: 'scale(1.05)',
        },
        filter: 'brightness(25%)',
    },
});

const RightWrapperImage = () => {
    const classes = useStyles();

    return (
        <img className={classes.image} src={pantryImage} alt="Pantry photo." />
    );
};

export default RightWrapperImage;