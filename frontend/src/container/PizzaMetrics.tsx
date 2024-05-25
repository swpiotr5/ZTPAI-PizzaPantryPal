import React, { useEffect, useState } from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import PizzaGrid from '../components/PizzaMetrics/PizzaGrid';
import SearchContainer from '../components/PizzaMetrics/SearchContainer';
import axios from 'axios';

// Define interfaces directly in the component file
interface PizzaTemplateIngredient {
    availableIngredientId: number;
    amount: number;
    unit: string;
}

interface PizzaTemplate {
    id: number;
    name: string;
    ingredients: PizzaTemplateIngredient[];
}

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        height: '90vh',
        maxWidth: '1500px',
        margin: 'auto',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
            marginTop: '80px',
            borderRadius: '20px',
            width: '100%',
            backgroundColor: '#F8FAE5',
        },
    },
});

const PizzaMetrics = () => {
    const classes = useStyles();
    const [pizzaTemplates, setPizzaTemplates] = useState<PizzaTemplate[]>([]);

    useEffect(() => {
        const fetchPizzaTemplates = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const response = await axios.get('http://localhost:8080/api/pizza_templates', { headers });
                setPizzaTemplates(response.data);
            } catch (error) {
                console.error('Error fetching pizza templates:', error);
            }
        };

        fetchPizzaTemplates();
    }, []);


    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <SearchContainer />
                    <PizzaGrid pizzaTemplates={pizzaTemplates} />
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default PizzaMetrics;
