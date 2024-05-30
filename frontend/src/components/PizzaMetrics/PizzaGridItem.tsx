import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ManageUsersButton} from "../Profile/ManageUsersButton";


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
    onTemplateDeleted: () => void;
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
    deleteButton: {
        padding: '8px 16px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#f44336',
        marginTop: '20px',
        color: 'white',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#d32f2f',
        },
    },
});

export interface User {
    username: string;
    email: string;
    roles: { name: string }[];
}
interface Role {
    name: string;
}

const PizzaGridItem: React.FC<PizzaGridItemProps> = ({ template, availableIngredients , onTemplateDeleted}) => {
    const classes = useStyles();
    const [showIngredients, setShowIngredients] = useState(false);
    const [userIngredients, setUserIngredients] = useState<any[]>([]);
    const [user, setUser] = useState<User | null>(null);
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
                toast.success(`Updated ingredients after selling ${soldAmount} pizzas of template ${template.name}`);
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
                if (error.response && error.response.status === 400) {
                    toast.error(`Operation failed: ${error.response.data}`);
                } else {
                    console.error('Error:', error);
                }
            });
    };

    const handleDeletePizza = () => {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        console.log('Deleting pizza template:', template);
        axios.delete(`http://localhost:8080/api/pizza_templates/${template.id}`, { headers })
            .then(response => {
                toast.success(`Deleted pizza template ${template.name}`);
                onTemplateDeleted();
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error(`Failed to delete pizza template ${template.name}`);
            });
    };


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8080/api/user/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let userData = response.data;
                if (userData) {
                    userData.roles = userData.roles.map((role: Role) => {
                        if (role.name === 'ROLE_MANAGER') {
                            return { name: 'manager' };
                        } else if (role.name === 'ROLE_USER') {
                            return { name: 'user' };
                        } else {
                            return role;
                        }
                    });
                }
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);


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
                                    <li key={index}
                                        className={`${classes.ingredientListItem} ${!isAvailable && classes.unavailableIngredient}`}>
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
                {user && user.roles[0].name === 'manager' && (
                    <button onClick={handleDeletePizza} className={classes.deleteButton}>Delete Pizza</button>
                )}
            </div>
        </div>
    );
};

export default PizzaGridItem;
