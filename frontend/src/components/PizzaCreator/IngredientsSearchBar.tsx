import React, { ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',
        position: 'relative',
        width: '100%',

    },
    searchIconContainer: {
        position: 'absolute',
        right: '10px',
    },
    searchInput: {
        padding: '10px 30px 10px 20px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#76453B',
        flex: '1',
        fontSize: '20px',
        transition: 'all 0.3s ease',
        color: '#ccc',
        '&::placeholder': {
            color: '#ccc',
        },
    },
    searchIcon: {
        fontSize: '20px',
        color: '#ccc',
    },
});

interface IngredientsSearchBarProps {
    onSearch: (searchTerm: string) => void;
}

const IngredientsSearchBar: React.FC<IngredientsSearchBarProps> = ({ onSearch }) => {
    const classes = useStyles();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchIconContainer}>
                <FaSearch className={classes.searchIcon} />
            </div>
            <input
                type="text"
                placeholder="Search for ingredients..."
                className={classes.searchInput}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default IngredientsSearchBar;