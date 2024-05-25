import React, { ChangeEvent } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    selectedIngredientContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderBottom: '1px solid #ccc',
        width: '100%',
    },
    ingredientName: {
        flex: '1',
    },
    ingredientImage: {
        width: '50px',
        height: '50px',
        marginRight: '10px',
    },
    quantityInput: {
        width: '50px',
        marginRight: '10px',
    },
    removeButton: {
        backgroundColor: '#FF0000',
        color: '#FFF',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
});

interface Ingredient {
    id: number;
    name: string;
    image: string;
    quantity: string;
}

interface SelectedIngredientsProps {
    ingredients: Ingredient[];
    onRemove: (id: number) => void;
    onQuantityChange: (id: number, quantity: string) => void;
}

const SelectedIngredients: React.FC<SelectedIngredientsProps> = ({ ingredients, onRemove, onQuantityChange }) => {
    const classes = useStyles();

    const handleQuantityChange = (id: number, e: ChangeEvent<HTMLInputElement>) => {
        onQuantityChange(id, e.target.value);
    };

    return (
        <div>
            {ingredients.map((ingredient) => (
                <div key={ingredient.id} className={classes.selectedIngredientContainer}>
                    <img src={ingredient.image} alt={ingredient.name} className={classes.ingredientImage} />
                    <span className={classes.ingredientName}>{ingredient.name}</span>
                    <input
                        type="text"
                        className={classes.quantityInput}
                        value={ingredient.quantity}
                        onChange={(e) => handleQuantityChange(ingredient.id, e)}
                    />
                    <button className={classes.removeButton} onClick={() => onRemove(ingredient.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default SelectedIngredients;
