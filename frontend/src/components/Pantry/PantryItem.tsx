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
        gap: '30px',
        alignItems: 'center',
        padding: '30px',
        height: '100%',
        fontSize: '25px',
    },
    gridItemImage: {
        '@media (max-width: 600px)': {
            width: '50px',
        },
    },
});

interface Ingredient {
    ingredient_id: number;
    name: string;
    img: string;
    userIngredients: null;
}

interface PantryItemProps {
    index: number;
    ingredient: Ingredient;
}

const PantryItem = ({ index, ingredient }: PantryItemProps) => {
    const classes = useStyles();

    return (
        <div key={index} className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <img className={classes.gridItemImage} src={process.env.PUBLIC_URL + ingredient.img} alt={ingredient.name}/>
                <span>{ingredient.name}</span>
            </div>
        </div>
    );
};

export default PantryItem;
