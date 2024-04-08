import React from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    gridItem: {
        boxSizing: 'border-box',
        height: '150px',
        margin: '0 30px 30px 0',
        backgroundColor:  '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            height: '80px',
            margin: '15px 30px',
        },
    },
    gridItemContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px',
        height: '100%',
        fontSize: '25px',
    },
});

interface PantryItemProps {
    index: number;
}


const PantryItem = ({ index }: PantryItemProps) => {
    const classes = useStyles();

    return (
        <div key={index} className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <span>Product {index + 1}</span>
                <span>{(index + 1) * 10}g</span>
            </div>
        </div>
    );
};

export default PantryItem;
