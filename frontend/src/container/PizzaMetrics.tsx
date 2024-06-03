import React, { useEffect, useState } from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import PizzaGrid from '../components/PizzaMetrics/PizzaGrid';
import SearchContainer from '../components/PizzaMetrics/SearchContainer';
import axios from 'axios';

interface PizzaTemplateIngredient {
    availableIngredientId: number;
    amount: number;
    unit: string;
    name: string;
}

interface PizzaTemplate {
    id: number;
    name: string;
    ingredients: PizzaTemplateIngredient[];
    onTemplateDeleted: () => void;
}

const useStyles = createUseStyles({
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
            backgroundColor: '#F8FAE5',
        },
    },
});

const PizzaMetrics = () => {
    const classes = useStyles();
    const [pizzaTemplates, setPizzaTemplates] = useState<PizzaTemplate[]>([]);
    const [availableIngredients, setAvailableIngredients] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');  // New state for search query

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

        const fetchAvailableIngredients = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const headers = {
                    'Authorization': `Bearer ${token}`
                };

                const response = await axios.get('http://localhost:8080/api/available_ingredients', { headers });
                setAvailableIngredients(response.data);
            } catch (error) {
                console.error('Error fetching available ingredients:', error);
            }
        };
        fetchPizzaTemplates();
        fetchAvailableIngredients();
    }, [refresh]);

    const handleTemplateDeleted = () => {
        setRefresh(!refresh);
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }

    const filteredTemplates = pizzaTemplates.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <SearchContainer searchQuery={searchQuery} onSearchChange={handleSearchChange} />
                    <PizzaGrid pizzaTemplates={filteredTemplates} availableIngredients={availableIngredients} onTemplateDeleted={handleTemplateDeleted} />
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default PizzaMetrics;
