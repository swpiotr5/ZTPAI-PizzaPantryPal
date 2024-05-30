import React from 'react';
import { createUseStyles } from 'react-jss';
import PizzaGridItem from './PizzaGridItem';
import { PizzaTemplate } from './PizzaGridItem';


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
        '@media (max-width: 600px)': {
            gridTemplateColumns: 'repeat(1, 1fr)',
            padding: '10px 10px 100px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        },
        '@media (max-width: 1024px)': {
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
});

interface PizzaGridProps {
    pizzaTemplates: PizzaTemplate[];
    availableIngredients: any[];
    onTemplateDeleted: () => void;
}

const PizzaGrid: React.FC<PizzaGridProps> = ({ pizzaTemplates, availableIngredients, onTemplateDeleted}) => {
    const classes = useStyles();

    return (
        <div className={classes.gridContainer}>
            {pizzaTemplates.map((template, index) => (
                <PizzaGridItem key={index} template={template} availableIngredients={availableIngredients} onTemplateDeleted={onTemplateDeleted}/>
            ))}
        </div>
    );
};

export default PizzaGrid;
