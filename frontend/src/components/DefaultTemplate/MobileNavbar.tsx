import React from 'react';
import { createUseStyles } from 'react-jss';
import { FaUser, FaStore, FaBalanceScale, FaPizzaSlice } from 'react-icons/fa';
import NavigationItem from './NavigationItem';
import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles({
    mobileNavbar: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        height: '70px',
        paddingTop: '50px',
        backgroundColor: '#F8FAE5',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden',
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        boxShadow: '0 -5px 10px rgba(0, 0, 0, 0.2)',
    },
    navItem: {
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        textDecoration: 'none',
        backgroundColor: 'transparent',
    },
    activeNavItem: {
        color: '#43766C',
    },
});

const MobileNavbar: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();

    return (
        <div className={classes.mobileNavbar}>
            <NavigationItem to="/profile" label={<FaUser className={location.pathname === "/profile" ? classes.activeNavItem : classes.navItem}/>} />
            <NavigationItem to="/pantry" label={<FaStore className={location.pathname === "/pantry" ? classes.activeNavItem : classes.navItem}/>} />
            <NavigationItem to="/pizzametrics" label={<FaBalanceScale className={location.pathname === "/pizzametrics" ? classes.activeNavItem : classes.navItem}/>} />
            <NavigationItem to="/pizzacreator" label={<FaPizzaSlice className={location.pathname === "/pizzacreator" ? classes.activeNavItem : classes.navItem}/>} />
        </div>
    );
};

export default MobileNavbar;