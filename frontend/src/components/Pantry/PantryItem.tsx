import React, { FormEvent, useState } from 'react';
import { createUseStyles } from 'react-jss';
import axios from 'axios';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const useStyles = createUseStyles({
    gridItem: {
        boxSizing: 'border-box',
        height: '150px',
        margin: '0 30px 30px 0',
        backgroundColor: '#F8FAE5',
        borderRadius: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 10px rgba(0, 0, 0, 0.15)',
        },
        '@media (max-width: 600px)': {
            height: '200px',
            margin: '15px 30px',
            width: 'calc(100% - 60px)',
        },
    },
    gridItemContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px',
        height: '100%',
        fontSize: '18px',
        '@media (max-width: 600px)': {
            gap: '10px',
            width: '100%',
            fontSize: '16px',
            padding: '10px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
    gridItemImage: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '10px',
        '@media (max-width: 600px)': {
            width: '50px',
            height: '50px',
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
    deleteButton: {
        padding: '5px 10px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: 'red',
        color: '#fff',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'darkred',
        },
    },
    spc: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
        },
    },
    spanText: {
        fontWeight: 'bold',
        '@media (max-width: 600px)': {
            width: '140px',
            fontSize: '16px',
            textAlign: 'center',
        },
        '@media (max-width: 1080px)': {
            marginLeft: '10px',
            marginRight: '10px',
        },
    },
    modalContent: {
        position: 'absolute',
        width: '80%',
        maxWidth: '400px',
        top: '50%',
        left: '50%',
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

interface Ingredient {
    ingredient_id: number;
    name: string;
    img: string;
    amount?: number;
    unit?: string;
    userIngredients: null;
}

interface PantryItemProps {
    index: number;
    ingredient: Ingredient;
    selectedButton: string;
    onNewIngredientAdded: () => void;
    isManager: boolean;
}

const PantryItem = ({ index, ingredient, selectedButton, onNewIngredientAdded, isManager }: PantryItemProps) => {
    const classes = useStyles();
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('g');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFormSubmit = (event: FormEvent) => {
        event.preventDefault();

        const data = {
            availableIngredient: ingredient.ingredient_id,
            amount: parseFloat(quantity),
            unit: unit,
        };
        const token = localStorage.getItem('access_token');

        axios.post('http://localhost:8080/api/user_ingredients/add', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                toast.success(response.data);
                onNewIngredientAdded();
            })
            .catch(error => {
                toast.error('Error adding or updating ingredient');
                console.error('Error:', error);
            });
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };

    const confirmDelete = () => {
        const token = localStorage.getItem('access_token');

        axios.delete(`http://localhost:8080/api/user_ingredients/delete/${ingredient.ingredient_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
            .then(response => {
                toast.success('Ingredient deleted successfully');
                onNewIngredientAdded();
            })
            .catch(error => {
                toast.error('Error deleting ingredient');
                console.error('Error:', error);
            });

        setIsModalOpen(false);
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
    };

    return (
        <div key={index} className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <div className={classes.spc}>
                    <img className={classes.gridItemImage} src={process.env.PUBLIC_URL + ingredient.img} alt={ingredient.name} />
                    <span className={classes.spanText}>{ingredient.name}</span>
                    {ingredient.amount && ingredient.unit && (
                        <span>{ingredient.amount} {ingredient.unit}</span>
                    )}
                </div>
                <div className={classes.spc}>
                    {selectedButton === 'Available Ingredients' && (
                        <form onSubmit={handleFormSubmit} className={classes.form}>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required className={classes.input} />
                            <select value={unit} onChange={(e) => setUnit(e.target.value)} className={classes.select}>
                                <option value="g">g</option>
                            </select>
                            <button type="submit" className={classes.button}>OK</button>
                        </form>
                    )}
                    {selectedButton === 'User Ingredients' && isManager && (
                        <button className={classes.deleteButton} onClick={handleDelete}>Delete</button>
                    )}
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={cancelDelete}
                contentLabel="Confirm Delete Ingredient"
                className={classes.modalContent}
                overlayClassName={classes.modalOverlay}
            >
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete the ingredient "{ingredient.name}"?</p>
                <div className={classes.modalButtons}>
                    <button onClick={confirmDelete} className={`${classes.modalButton} ${classes.confirmButton}`}>Yes</button>
                    <button onClick={cancelDelete} className={`${classes.modalButton} ${classes.cancelButton}`}>No</button>
                </div>
            </Modal>
        </div>
    );
};

export default PantryItem;
