import React from 'react';
import { createUseStyles } from 'react-jss';
import pizzaImg from '../../assets/pizza.png';

interface PizzaTemplate {
    id: number;
    name: string;
}

interface PizzaGridItemProps {
    template: PizzaTemplate;
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
});

const PizzaGridItem: React.FC<PizzaGridItemProps> = ({ template }) => {
    const classes = useStyles();

    return (
        <div className={classes.gridItem}>
            <div className={classes.gridItemContent}>
                <span className={classes.pizzaName}>{template.name}</span>
                <img src={pizzaImg} alt="Pizza" className={classes.pizzaImage}/>
            </div>
        </div>
    );
};

export default PizzaGridItem;
