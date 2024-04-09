import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

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
        backgroundColor:  '#76453B',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'scale(1.01)',
        },
        color: '#F8FAE5',
        '&::placeholder': {
            color: '#F8FAE5',
        },
    },
    searchIcon: {
        fontSize: '20px',
        color: '#F8FAE5',
    },
});

interface IngredientsSearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const IngredientsSearchBar: React.FC<IngredientsSearchBarProps> = ({ onSearch }) => {
    const classes = useStyles();

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchIconContainer}>
                <FaSearch className={classes.searchIcon} />
            </div>
            <input
                type="text"
                placeholder="Search for ingredients..."
                className={classes.searchInput}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default IngredientsSearchBar;