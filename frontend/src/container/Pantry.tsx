import React, { useEffect, useState } from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import PantryItem from '../components/Pantry/PantryItem';
import SearchBar from '../components/Pantry/SearchBar';
import SortingButtons from '../components/Pantry/SortingButtons';
import axios from "axios";

const useStyles = createUseStyles({
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        overflowY: 'auto',
        maxHeight: '80vh',
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px 10px 20px 0',
        '@media (max-width: 1080px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
            padding: '10px 10px 100px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        },
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#F8FAE5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#76453B',
            borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        height: '90vh',
        maxWidth: '1500px',
        margin: 'auto',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
            marginTop: '80px',
            borderRadius: '20px',
            width: '100%',
            backgroundColor:  '#F8FAE5',
        },
    },
});

interface Ingredient {
    id: number;
    availableIngredient: number;
    ingredient_id: number;
    name: string;
    img: string;
    amount?: number;
    unit?: string;
    userIngredients: null;
}

interface ManagerProps {
    isManager: boolean;
}

const Pantry: React.FC<ManagerProps> = ({ isManager }) => {
    const classes = useStyles();
    const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>([]);
    const [userIngredients, setUserIngredients] = useState<Ingredient[]>([]);
    const [displayedIngredients, setDisplayedIngredients] = useState<Ingredient[]>([]);
    const [selectedButton, setSelectedButton] = useState('Available Ingredients');
    const [searchQuery, setSearchQuery] = useState('');  // New state for search query
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.get('http://localhost:8080/api/available_ingredients', { headers })
            .then(response => {
                setAvailableIngredients(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const headers = {
            'Authorization': `Bearer ${token}`
        };

        axios.get('http://localhost:8080/api/user_ingredients/user', { headers })
            .then(response => {
                setUserIngredients(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [refresh]);

    useEffect(() => {
        let ingredientsToDisplay = selectedButton === 'Available Ingredients' ? availableIngredients : userIngredients.length ? availableIngredients.filter(ingredient => userIngredients.some(ui => ui.availableIngredient === ingredient.ingredient_id)).map(ingredient => {
            const userIngredient = userIngredients.find(ui => ui.availableIngredient === ingredient.ingredient_id);
            return { ...ingredient, amount: userIngredient?.amount, unit: userIngredient?.unit };
        }) : [];

        if (searchQuery) {
            ingredientsToDisplay = ingredientsToDisplay.filter(ingredient => ingredient.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }

        setDisplayedIngredients(ingredientsToDisplay);
    }, [selectedButton, availableIngredients, userIngredients, searchQuery]);

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName);
    }

    const handleNewIngredientAdded = () => {
        setRefresh(!refresh);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                    <SortingButtons handleButtonClick={handleButtonClick as (buttonName: string) => void} />
                    <div className={classes.gridContainer}>
                        {displayedIngredients.map((ingredient, index) => (
                            <PantryItem
                                key={index}
                                index={index}
                                ingredient={ingredient}
                                selectedButton={selectedButton}
                                onNewIngredientAdded={handleNewIngredientAdded}
                                isManager={isManager}
                            />
                        ))}
                    </div>
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default Pantry;
