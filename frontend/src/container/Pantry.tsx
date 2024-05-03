import React, {useEffect, useState} from 'react';
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
            backgroundColor:  '#F8FAE5',
        },
    },
});

const Pantry = () => {
    const classes = useStyles();
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/available_ingredients')
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <SearchBar />
                    <SortingButtons />
                    <div className={classes.gridContainer}>
                        {ingredients.map((ingredient, index) => (
                            <PantryItem key={index} index={index} ingredient={ingredient} />
                        ))}
                    </div>
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default Pantry;
