import React from 'react';
import IngredientsSearchBar from './IngredientsSearchBar';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    ingredientsSearchBar: {
        width: '90%',
        marginTop: '10px',
        '@media (max-width: 600px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    },
});

interface IngredientsSearchProps {
    handleIngredientSearch: (searchTerm: string) => void;
}

const IngredientsSearch: React.FC<IngredientsSearchProps> = ({ handleIngredientSearch }) => {
    const classes = useStyles();

    return (
        <div className={classes.ingredientsSearchBar}>
            <IngredientsSearchBar onSearch={handleIngredientSearch}/>
        </div>
    );
};

export default IngredientsSearch;