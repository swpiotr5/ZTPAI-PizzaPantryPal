// PizzaGridItem.tsx
import React from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';

interface PizzaTemplateIngredient {
    availableIngredientId: number;
    amount: number;
    unit: string;
    name: string;
}

export interface PizzaTemplate {
    id: number;
    name: string;
    ingredients: PizzaTemplateIngredient[];
}

interface PizzaGridItemProps {
    template: PizzaTemplate;
    availableIngredients: any[];
}

const useStyles = createUseStyles({
    gridItem: {
        boxSizing: 'border-box',
        height: 'auto', // Changed height to auto
        margin: '0 40px 40px',
        backgroundColor: '#F8FAE5',
        borderRadius: '15px',
        padding: '20px', // Added padding for inner content
        '@media (max-width: 1024px)': {
            height: 'auto', // Changed height to auto
        },
        '@media (max-width: 600px)': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            margin: '15px 30px',
        },
    },
    gridItemContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
        fontSize: '20px',
    },
    pizzaName: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    pizzaImage: {
        width: '50%',
        height: 'auto',
    },
    ingredientList: {
        marginTop: '50px',
        marginBottom: '20px',
        textAlign: 'left',
        backgroundColor: '#FFF',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
    },
    ingredientListItem: {
        marginBottom: '10px',
        listStyle: 'none',
    },
});

const PizzaGridItem: React.FC<PizzaGridItemProps> = ({ template, availableIngredients }) => {
    const classes = useStyles();

    return (
        <div className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <span className={classes.pizzaName}>{template.name}</span>
                <img src={pizzaImg} alt="Pizza" className={classes.pizzaImage}/>
                <div className={classes.ingredientList}>
                    <h3>Ingredients:</h3>
                    <ul>
                        {template.ingredients.map((ingredient, index) => {
                            const matchedIngredient = availableIngredients.find(item => item.ingredient_id === ingredient.availableIngredientId);
                            if (matchedIngredient) {
                                return (
                                    <li key={index} className={classes.ingredientListItem}>
                                        {ingredient.amount} {ingredient.unit} - {matchedIngredient.name}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PizzaGridItem;
