import React, {ReactNode} from 'react';
import { Link } from 'react-router-dom';
import { createUseStyles } from 'react-jss';

interface NavigationItemProps {
    to: string;
    label: ReactNode;
}

const useStyles = createUseStyles({
    link: {
        textDecoration: 'none',
        color: '#76453B',
        fontSize: '1.3rem',
    },
    wrapper: {
        display: 'flex',
        alignItems: 'left',
        marginBottom: '40px',
        boxShadow: '2px 2px 10px 1px #76453B',
        borderRadius: '5px',
        padding: '10px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#76453B',
            color: '#F8FAE5',
        },
    },
});

const NavigationItem: React.FC<NavigationItemProps> = ({ to, label }) => {
    const classes = useStyles();
    return (
        <Link to={to} className={classes.link}>
            <div className={classes.wrapper}>
                {label}
            </div>
        </Link>
    );
};

export default NavigationItem;