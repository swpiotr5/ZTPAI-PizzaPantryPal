import React, {ReactNode} from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    sortingButtonsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            alignItems: 'center',
        },
    },
    sortingButton: {
        padding: '10px',
        borderRadius: '10px',
        border: '3px solid #ccc',
        backgroundColor: '#F8FAE5',
        fontSize: '22px',
        cursor: 'pointer',
        width: '200px',
        color: '#76453B',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#76453B',
            transform: 'scale(1.1)',
            color: '#F8FAE5',
        },
        '@media (max-width: 600px)': {
            marginBottom: '10px',
            width: '80px',
            fontSize: '16px',
        },
    },
});

const SortingButtons = () => {
    const classes = useStyles();

    return (
        <div className={classes.sortingButtonsContainer}>
            <button className={classes.sortingButton}>All</button>
            <button className={classes.sortingButton}>Shelf</button>
            <button className={classes.sortingButton}>Fridge</button>
            <button className={classes.sortingButton}>Freezer</button>
        </div>
    );
};

export default SortingButtons;