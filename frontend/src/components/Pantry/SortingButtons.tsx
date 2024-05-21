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
        width: '400px',
        color: '#76453B',
        transition: 'all 0.3s ease',
        '&:hover': {
            backgroundColor: '#76453B',
            transform: 'scale(1.1)',
            color: '#F8FAE5',
        },
        '@media (max-width: 1080px)': {
            marginBottom: '10px',
            width: '240px',
        },
        '@media (max-width: 600px)': {
            marginBottom: '10px',
            width: '170px',
            fontSize: '14px',
        },

    },
});

interface SortingButtonsProps {
    handleButtonClick: (buttonName: string) => void;
}

const SortingButtons = ({ handleButtonClick }: SortingButtonsProps) => {
    const classes = useStyles();

    return (
        <div className={classes.sortingButtonsContainer}>
            <button onClick={() => handleButtonClick('Available Ingredients')} className={classes.sortingButton}>Available Ingredients</button>
            <button onClick={() => handleButtonClick('User Ingredients')} className={classes.sortingButton}>User Ingredients</button>
        </div>
    );
};

export default SortingButtons;