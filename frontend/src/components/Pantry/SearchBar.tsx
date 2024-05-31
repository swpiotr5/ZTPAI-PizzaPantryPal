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
        backgroundColor: '#F8FAE5',
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
});

interface SearchBarProps {
    searchQuery: string;
    onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
    const classes = useStyles();

    return (
        <div className={classes.searchContainer}>
            <div className={classes.searchIconContainer}>
                <FaSearch className={classes.searchIcon} />
            </div>
            <input
                type="text"
                placeholder="Search your pantry"
                value={searchQuery}
                onChange={onSearchChange}
                className={classes.searchInput}
            />
        </div>
    );
};

export default SearchBar;
