import React from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';

interface PizzaGridItemProps {
    index: number;
}

const useStyles = createUseStyles({
    gridItem: {
        boxSizing: 'border-box',
        height: '400px',
        margin: '0 40px 40px',
        backgroundColor:  '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 1024px)': {
            height: '500px',
        },
        '@media (max-width: 600px)': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            height: '300px',
            margin: '15px 30px',
        },
    },
    gridItemContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '30px',
        height: '100%',
        fontSize: '25px',
    },
    pizzaName: {
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
    },
    pizzaImage: {
        width: '50%',
        height: 'auto',
    },
    quantityInput: {
        width: '35%',
        padding: '5px 10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        '&:focus': {
            outline: 'none',
            border: '1px solid #43766C',
        },
    },
    okButton: {
        backgroundColor: '#43766C',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#335A4C',
        },
    },
    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: '10px',
    }
});

const PizzaGridItem: React.FC<PizzaGridItemProps> = ({ index }) => {
    const classes = useStyles();

    return (
        <div className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <span className={classes.pizzaName}>Pizza {index + 1}</span>
                <img src={pizzaImg} alt="Pizza" className={classes.pizzaImage}/>
                <div className={classes.quantityContainer}>
                    <input type="number" className={classes.quantityInput} placeholder="Quantity"/> {/* Dodane */}
                    <input type="text" className={classes.quantityInput} placeholder="Units"/> {/* Dodane */}
                    <button className={classes.okButton}>OK</button>
                </div>
            </div>
        </div>
    );
};

export default PizzaGridItem;
