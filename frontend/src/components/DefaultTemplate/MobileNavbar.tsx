import React, {useEffect, useState} from 'react';
import { createUseStyles } from 'react-jss';
import { FaUser, FaStore, FaBalanceScale, FaPizzaSlice } from 'react-icons/fa';
import NavigationItem from './NavigationItem';
import { useLocation } from 'react-router-dom';
import axios from "axios";

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

interface User {
    username: string;
    email: string;
    roles: { name: string }[];
}

interface Role {
    name: string;
}


const MobileNavbar: React.FC = () => {
    const classes = useStyles();
    const location = useLocation();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8080/api/user/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let userData = response.data;
                if (userData) {
                    userData.roles = userData.roles.map((role: Role) => {
                        if (role.name === 'ROLE_MANAGER') {
                            return { name: 'manager' };
                        } else if (role.name === 'ROLE_USER') {
                            return { name: 'user' };
                        } else {
                            return role;
                        }
                    });
                }
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className={classes.mobileNavbar}>
            <NavigationItem to="/profile" label={<FaUser className={location.pathname === "/profile" ? classes.activeNavItem : classes.navItem}/>} />
            <NavigationItem to="/pantry" label={<FaStore className={location.pathname === "/pantry" ? classes.activeNavItem : classes.navItem}/>} />
            <NavigationItem to="/pizzametrics" label={<FaBalanceScale className={location.pathname === "/pizzametrics" ? classes.activeNavItem : classes.navItem}/>} />
            {user && user.roles.some(role => role.name === 'manager') && (
                <NavigationItem to="/pizzacreator" label={<FaPizzaSlice className={location.pathname === "/pizzacreator" ? classes.activeNavItem : classes.navItem}/>} />
            )}
        </div>
    );
};

export default MobileNavbar;