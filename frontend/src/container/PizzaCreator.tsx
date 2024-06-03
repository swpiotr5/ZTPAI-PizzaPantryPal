import React, { useEffect, useState } from 'react';
import DefaultTemplate from '../components/DefaultTemplate/DefaultTemplate';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../assets/pizza.png';
import PizzaNameInput from '../components/PizzaCreator/PizzaNameInput';
import IngredientsSearch from '../components/PizzaCreator/IngredientsSearch';
import ProductContainer from '../components/PizzaCreator/ProductContainer';
import axios from 'axios';

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '70%',
        height: '90vh',
        maxWidth: '1500px',
        margin: 'auto',
        overflow: 'hidden',
        backgroundColor: '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            marginTop: '80px',
            justifyContent: 'flex-start',
            borderRadius: '20px',
            width: '100%',
            backgroundColor: '#F8FAE5',
        },
    },
    pizzaImage: {
        width: '210px',
        height: 'auto',
        maxWidth: '100%',
        '@media (max-width: 600px)': {
            display: 'none',
        },
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '20%',
        borderRadius: '20px 20px 0 0',
        marginBottom: '20px',
        marginTop: '70px',
        alignSelf: 'center',
        width: '80%',
        '@media (max-width: 600px)': {
            marginTop: '0',
            marginBottom: '0px',
            height: '15%',
            justifyContent: 'center',
        },
    },
    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        minHeight: '50%',
        backgroundColor: '#F8FAE5',
        margin: '50px',
        border: '2px solid #76453B',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            width: '100%',
            margin: '0px',
            border: 'none',
            justifyContent: 'space-between',
        },
    },
    selectIngredients: {
        marginLeft: '80px',
        alignSelf: 'flex-start',
        fontSize: '30px',
        color: '#76453B',
    },
    innerContent: {
        position: 'relative',
        width: '90%',
        borderRadius: '15px',
        margin: '10px auto 10px',
        padding: '10px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '@media (max-width: 600px)': {
            height: '80%',
        },
        overflow: 'auto',
    },
    submitButton: {
        bottom: '20px',
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
        marginTop: '20px',
        marginBottom: '20px',
    },
});

const PizzaCreator = () => {
    const classes = useStyles();
    const [pizzaName, setPizzaName] = useState('');
    const [isCheckIconClicked, setCheckIconClicked] = useState(false);
    const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const maxDisplayedIngredients = 1;
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios
            .get('http://localhost:8080/api/available_ingredients', { headers })
            .then((response) => {
                setAvailableIngredients(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handlePizzaNameSubmit = () => {
        setCheckIconClicked(true);
        setTimeout(() => setCheckIconClicked(false), 300);
    };

    const handleIngredientSearch = (searchTerm: string) => {
        setSearchTerm(searchTerm);
    };

    const handleAdd = (ingredientId: number, amount: string, unit: string) => {
        const selectedIngredient = availableIngredients.find((ingredient: any) => ingredient.ingredient_id === ingredientId);
        if (selectedIngredient) {
            setSelectedIngredients((prevIngredients) => ({
                ...prevIngredients,
                [ingredientId]: {
                    ingredientId: selectedIngredient.ingredient_id,
                    amount,
                    unit,
                },
            }));
        } else {
            console.error('Selected ingredient not found');
        }
    };





    const handleSubmit = () => {
        const token = localStorage.getItem('access_token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const payload = {
            name: pizzaName,
            ingredients: Object.entries<{ amount: string, unit: string }>(selectedIngredients).map(([ingredientId, { amount, unit }]) => ({
                availableIngredientId: parseInt(ingredientId),
                amount,
                unit,
            })),
        };
        console.log('Payload:', payload);
        axios
            .post('http://localhost:8080/api/pizza_templates', payload, { headers })
            .then((response) => {
                console.log('Pizza template created:', response.data);
            })
            .catch((error) => {
                console.error('Error creating pizza template:', error);
            });
    };


    const filteredIngredients = searchTerm === '' ? [] : availableIngredients.filter((ingredient: any) =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <div className={classes.header}>
                        <PizzaNameInput
                            pizzaName={pizzaName}
                            setPizzaName={setPizzaName}
                            handlePizzaNameSubmit={handlePizzaNameSubmit}
                            isCheckIconClicked={isCheckIconClicked}
                        />
                        <img src={pizzaImg} className={classes.pizzaImage} alt="Pizza" />
                    </div>
                    <span className={classes.selectIngredients}>Select ingredients</span>
                    <div className={classes.mainContent}>
                        <div className={classes.innerContent}>
                            <IngredientsSearch handleIngredientSearch={handleIngredientSearch} />
                            {filteredIngredients.length > maxDisplayedIngredients ? (
                                <>
                                    {filteredIngredients.slice(0, maxDisplayedIngredients).map((ingredient: any) => (
                                        <ProductContainer
                                            key={ingredient.id}
                                            ingredient={ingredient}
                                            onAdd={(id, amount, unit) => handleAdd(id, amount, unit)}
                                        />

                                    ))}
                                    <button className={classes.submitButton} onClick={handleSubmit}>
                                        Submit
                                    </button>
                                </>
                            ) : (
                                <>
                                    {filteredIngredients.map((ingredient: any) => (
                                        <ProductContainer
                                            key={ingredient.id}
                                            ingredient={ingredient}
                                            onAdd={(id, amount, unit) => handleAdd(id, amount, unit)}
                                        />

                                    ))}
                                        <button className={classes.submitButton} onClick={handleSubmit}>
                                            Submit
                                        </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
        </div>
    );
};



export default PizzaCreator;