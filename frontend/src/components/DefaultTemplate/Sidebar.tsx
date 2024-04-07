import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import pizzaLogo from '../../assets/pizzalogo.png';
import NavigationItem from './NavigationItem';
import { FaUser, FaStore, FaBalanceScale, FaPizzaSlice } from 'react-icons/fa';


const useStyles = createUseStyles({
    sidebar: {
        position: 'relative',
        width: '70px',
        height: '100%',
        padding: '20px',
        backgroundColor: '#F8FAE5',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)',
        transition: 'width 0.3s ease-in-out',
        '&.open': {
            width: '250px',
        },
        borderRadius: '0 10px 10px 0',
    },
    button: {
        position: 'absolute',
        backgroundColor: 'transparent',
        right: '10px',
        color: '#76453B',
        border: 'none',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '20px',
    },
    navigation: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '200px',
        transition: 'opacity 0.3s ease-in-out',
        opacity: 0,
        '&.open': {
            opacity: 1,
        },
    },
    logo: (isOpen: boolean) => ({
        position: 'absolute',
        top: '20px',
        left: '40px',
        width: isOpen ? '150px' : '0',
        height: '150px',
        backgroundColor: isOpen ? '#43766C' : '#F8FAE5',
        borderRadius: '30px',
        padding: '10px',
        transition: 'width 0.3s ease-in-out, background-color 0.1s ease-in-out 0.1s',
    }),
    footer: (isOpen: boolean) => ({
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        fontSize: '0.7rem',
        color: '#76453B',
        transition: isOpen ? 'opacity 1s ease-in-out, transform 0.3s ease-in-out' : 'opacity 0s ease-in-out, transform 0s ease-in-out',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'scaleY(1)' : 'scaleY(0)',
        transformOrigin: 'bottom',
    }),
});

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const classes = useStyles(isOpen);

    return (
        <div className={`${classes.sidebar} ${isOpen ? 'open' : ''}`}>
            <img src={pizzaLogo} alt="Pizza Logo" className={classes.logo}/>
            <button className={classes.button} onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <FaArrowLeft/> : <FaArrowRight/>}
            </button>
            <div className={`${classes.navigation} ${isOpen ? 'open' : ''}`}>
                <NavigationItem to="/profile" label={<><FaUser style={{marginRight: '10px'}}/> Profile</>}/>
                <NavigationItem to="/pantry" label={<><FaStore style={{marginRight: '10px'}}/> Pantry</>}/>
                <NavigationItem to="/pizzametrics"
                                label={<><FaBalanceScale style={{marginRight: '10px'}}/> PizzaMetrics</>}/>
                <NavigationItem to="/pizzacreator"
                                label={<><FaPizzaSlice style={{marginRight: '10px'}}/> PizzaCreator</>}/>
            </div>
            <div className={classes.footer}>
                © Pizza Pantry Pal 2024. All rights reserved.
            </div>
        </div>
    );
};

export default Sidebar;