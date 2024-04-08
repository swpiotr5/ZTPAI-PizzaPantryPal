import React from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import PizzaGrid from '../components/PizzaMetrics/PizzaGrid';
import SearchContainer from '../components/PizzaMetrics/SearchContainer';

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
            backgroundColor:  '#F8FAE5',
        },
    },
});

const PizzaMetrics = () => {
    const classes = useStyles();

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <SearchContainer />
                    <PizzaGrid />
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default PizzaMetrics;
