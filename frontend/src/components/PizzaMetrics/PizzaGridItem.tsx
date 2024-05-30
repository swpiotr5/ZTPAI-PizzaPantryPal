import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';
import axios from "axios";

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
        height: 'auto',
        margin: '0 40px 40px',
        backgroundColor: '#F8FAE5',
        borderRadius: '15px',
        padding: '20px',
        '@media (max-width: 1024px)': {
            height: 'auto',
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
    unavailableIngredient: {
        color: 'red',
    },
    soldSection: {
        marginTop: '20px',
        textAlign: 'center',
        backgroundColor: '#FFF',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
        width: '100%',
    },
    soldLabel: {
        fontSize: '16px',
        marginBottom: '10px',
        display: 'block',
    },
    soldInput: {
        marginRight: '10px',
        padding: '5px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        width: '60px',
        textAlign: 'center',
    },
    soldButton: {
        padding: '5px 10px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#45a049',
        },
    },
});

const PizzaGridItem: React.FC<PizzaGridItemProps> = ({ template, availableIngredients }) => {
    const classes = useStyles();
    const [showIngredients, setShowIngredients] = useState(false);
    const [userIngredients, setUserIngredients] = useState<any[]>([]);
    const [soldAmount, setSoldAmount] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios.get('http://localhost:8080/api/user_ingredients/user', { headers })
            .then(response => {
                setUserIngredients(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const toggleIngredients = () => {
        setShowIngredients(!showIngredients);
    };

    const handleSoldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSoldAmount(parseInt(event.target.value));
    };

    const handleSoldSubmit = () => {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const payload = {
            templateId: template.id,
            soldAmount,
        };

        axios.post('http://localhost:8080/api/user_ingredients/update', payload, { headers })
            .then(response => {
                alert(`Updated ingredients after selling ${soldAmount} pizzas of template ${template.name}`);
                // Refresh user ingredients after update
                axios.get('http://localhost:8080/api/user_ingredients/user', { headers })
                    .then(response => {
                        setUserIngredients(response.data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };


    return (
        <div className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <span className={classes.pizzaName}>{template.name}</span>
                <img src={pizzaImg} alt="Pizza" className={classes.pizzaImage}/>
                <div className={classes.ingredientList}>
                    <h3 onClick={toggleIngredients}>Ingredients: {showIngredients ? '▲' : '▼'}</h3>
                    {showIngredients && <ul>
                        {template.ingredients.map((ingredient, index) => {
                            const matchedIngredient = availableIngredients.find(item => item.ingredient_id === ingredient.availableIngredientId);
                            const userIngredient = userIngredients.find(item => item.availableIngredient === ingredient.availableIngredientId);

                            const isAvailable = userIngredient && userIngredient.amount >= ingredient.amount;

                            if (matchedIngredient) {
                                return (
                                    <li key={index} className={`${classes.ingredientListItem} ${!isAvailable && classes.unavailableIngredient}`}>
                                        {ingredient.amount} {ingredient.unit} - {matchedIngredient.name}
                                    </li>
                                );
                            } else {
                                return null;
                            }
                        })}
                    </ul>}
                </div>
                <div className={classes.soldSection}>
                    <label htmlFor="soldAmount" className={classes.soldLabel}>Sold pizzas:</label>
                    <input
                        type="number"
                        id="soldAmount"
                        value={soldAmount}
                        onChange={handleSoldChange}
                        className={classes.soldInput}
                    />
                    <button onClick={handleSoldSubmit} className={classes.soldButton}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaGridItem;
