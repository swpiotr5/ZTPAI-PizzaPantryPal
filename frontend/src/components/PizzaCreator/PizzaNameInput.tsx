
import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    pizzaNameInput: {
        border: 'none',
        marginRight: '10px',
        outline: 'none',
        fontSize: '16px',
        padding: '5px',
        width: '300px',
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        textTransform: 'uppercase',
        '&::placeholder': {
            color: '#F8FAE5',
        },
    },
    pizzaNameContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#76453B',
        borderRadius: '20px',
        padding: '9px',
        width: '400px',
        position: 'relative',
    },
    checkIcon: {
        color: '#76453B',
        transition: 'color 0.3s ease-in-out',
    },
    checkIconClicked: {
        color: 'white',
    },
    checkIconContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAE5',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        position: 'abolute',
        right: '5px',
        transition: 'background-color 0.3s ease-in-out',
    },
    checkIconContainerClicked: {
        backgroundColor: 'green',
    },
});

interface PizzaNameInputProps {
    pizzaName: string;
    setPizzaName: (name: string) => void;
    handlePizzaNameSubmit: () => void;
    isCheckIconClicked: boolean;
}

const PizzaNameInput: React.FC<PizzaNameInputProps> = ({ pizzaName, setPizzaName, handlePizzaNameSubmit, isCheckIconClicked }) => {
    const classes = useStyles();

    return (
        <div className={classes.pizzaNameContainer}>
            <input
                type="text"
                placeholder="Provide pizza name"
                className={classes.pizzaNameInput}
                value={pizzaName}
                onChange={(e) => setPizzaName(e.target.value)}
            />
            <button
                onClick={handlePizzaNameSubmit}
                className={`${classes.checkIconContainer} ${isCheckIconClicked ? classes.checkIconContainerClicked : ''}`}
            >
                <FaCheck
                    className={`${classes.checkIcon} ${isCheckIconClicked ? classes.checkIconClicked : ''}`}/>
            </button>
        </div>
    );
};

export default PizzaNameInput;