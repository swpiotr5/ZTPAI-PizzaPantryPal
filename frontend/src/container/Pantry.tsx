import React from 'react';
import { FaSearch } from 'react-icons/fa';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from 'react-jss';
import SortingButtons from '../components/Pantry/SortingButtons';

const useStyles = createUseStyles({
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        position: 'relative',
        width: '100%',
        '@media (max-width: 600px)': {
            width: '90%',
            marginTop: '20px'
        },
    },
    searchIconContainer: {
        position: 'absolute',
        right: '10px',
    },
    searchInput: {
        padding: '10px 30px 10px 20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        flex: '1',
        backgroundColor:  '#F8FAE5',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.01)',
        },
    },
    searchIcon: {
        fontSize: '20px',
        color: '#777',
    },
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
    gridItem: {
        boxSizing: 'border-box',
        height: '150px',
        margin: '0 30px 30px 0',
        backgroundColor:  '#F8FAE5',
        borderRadius: '15px',
        '@media (max-width: 600px)': {
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            height: '80px',
            margin: '15px 30px',
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
    gridItemContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px',
        height: '100%',
        fontSize: '25px',
    },
});

const Pantry = () => {
    const classes = useStyles();

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <div className={classes.searchContainer}>
                        <div className={classes.searchIconContainer}>
                            <FaSearch className={classes.searchIcon} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search your pantry"
                            className={classes.searchInput}
                        />
                    </div>
                    <SortingButtons />
                    <div className={classes.gridContainer}>
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className={classes.gridItem}>
                                <div className={classes.gridItemContent}>
                                    <span>Product {index + 1}</span>
                                    <span>{(index + 1) * 10}g</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DefaultTemplate>
        </div>
    );
};


export default Pantry;