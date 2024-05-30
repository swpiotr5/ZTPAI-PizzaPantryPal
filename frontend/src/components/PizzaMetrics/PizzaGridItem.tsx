import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';

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
    modalContent: {
        position: 'absolute',
        width: '80%',
        maxWidth: '400px',
        top: '50%',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
    modalOverlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    modalButton: {
        padding: '8px 16px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        border: 'none',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
        color: 'white',
        '&:hover': {
            backgroundColor: '#45a049',
        },
    },
    cancelButton: {
        backgroundColor: '#f44336',
        color: 'white',
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
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };

    const confirmDeletePizza = () => {
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
        setIsModalOpen(false);
    };

    const cancelDeletePizza = () => {
        setIsModalOpen(false);
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
                    <>
                        <button onClick={handleDeletePizza} className={classes.deleteButton}>Delete Pizza</button>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={cancelDeletePizza}
                            contentLabel="Confirm Delete Pizza"
                            className={classes.modalContent}
                            overlayClassName={classes.modalOverlay}
                        >
                            <h2>Confirm Delete</h2>
                            <p>Are you sure you want to delete the pizza template "{template.name}"?</p>
                            <div className={classes.modalButtons}>
                                <button onClick={confirmDeletePizza} className={`${classes.modalButton} ${classes.confirmButton}`}>Yes</button>
                                <button onClick={cancelDeletePizza} className={`${classes.modalButton} ${classes.cancelButton}`}>No</button>
                            </div>
                        </Modal>
                    </>
                )}
            </div>
        </div>
    );
};

export default PizzaGridItem;
