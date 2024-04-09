import React, { useState } from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import pizzaImg from '../assets/pizza.png';
import PizzaNameInput from '../components/PizzaCreator/PizzaNameInput';
import IngredientsSearch from '../components/PizzaCreator/IngredientsSearch';
import ProductContainer from '../components/PizzaCreator/ProductContainer';


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
            borderRadius: '20px',
            width: '100%',
            backgroundColor:  '#F8FAE5',
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
        height: '80%',
        backgroundColor: '#F8FAE5',
        margin: '50px',
        border: '2px solid #76453B',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            width: '100%',
            margin: '0px',
            border: 'none',
            justifyContent: 'space-between',
        }
    },
    selectIngredients: {
        marginLeft: '80px',
        alignSelf: 'flex-start',
        fontSize: '30px',
        color: '#76453B',
    },
    innerContent: {
        backgroundColor: '#B19470',
        width: '70%',
        height: '80%',
        borderRadius: '15px',
        margin: '10px auto 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '@media (max-width: 600px)': {
            height: '60%',
            marginBottom: '200px',
        },
        maxHeight: '400px',
    },
    submitButton: {
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
    },

});

const PizzaCreator= () => {
    const classes = useStyles();
    const [pizzaName, setPizzaName] = useState('');
    const [isCheckIconClicked, setCheckIconClicked] = useState(false);

    const handlePizzaNameSubmit = () => {
        console.log(pizzaName);
        setCheckIconClicked(true);
        setTimeout(() => setCheckIconClicked(false), 300); // reset after the same duration as the transition
    };

    const handleIngredientSearch = (searchTerm: string) => {
        console.log(searchTerm);
    };

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
                        <img src={pizzaImg} className={classes.pizzaImage} alt="Pizza"/>
                    </div>
                    <span className={classes.selectIngredients}>Select ingredients</span>
                    <div className={classes.mainContent}>
                        <IngredientsSearch handleIngredientSearch={handleIngredientSearch} />
                        <div className={classes.innerContent}>
                            <ProductContainer />
                            <button className={classes.submitButton}>Submit</button>
                        </div>
                    </div>
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default PizzaCreator;