import React, {FormEvent, useEffect, useState} from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';

const useStyles = createUseStyles({
    gridItem: {
        boxSizing: 'border-box',
        height: '150px',
        margin: '0 30px 30px 0',
        backgroundColor:  '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            height: '150px',
            margin: '15px 30px',

        },
    },
    gridItemContent: {
        display: 'flex',
        gap: '30px',
        justifyContent: 'space-between',
        padding: '30px',
        height: '100%',
        fontSize: '25px',
        '@media (max-width: 600px)': {
            width: '50px',
            fontSize: '15px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
    },
    gridItemImage: {
        '@media (max-width: 600px)': {
            width: '50px',
        },
    },
    form: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    input: {
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        width: '70px',
    },
    select: {
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#76453B',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#43766C',
        },
    },
    spc:{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
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
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('pcs');

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        const data = {
            availableIngredient: ingredient.ingredient_id,
            amount: parseFloat(quantity),
            unit: unit,
        };
        console.log(data)
        const token = localStorage.getItem('access_token');

        axios.post('http://localhost:8080/api/user_ingredients/add', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    return (
        <div key={index} className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <div className={classes.spc}>
                    <img className={classes.gridItemImage} src={process.env.PUBLIC_URL + ingredient.img} alt={ingredient.name}/>
                    <span>{ingredient.name}</span>
                </div>
                <div className={classes.spc}>
                    <form onSubmit={handleFormSubmit} className={classes.form}>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className={classes.input} />
                        <select value={unit} onChange={(e) => setUnit(e.target.value)} className={classes.select}>
                            <option value="pcs">pcs</option>
                            <option value="grams">grams</option>
                        </select>
                        <button type="submit" className={classes.button}>OK</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PantryItem;
