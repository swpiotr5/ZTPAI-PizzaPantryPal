import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface Role {
    name: string;
}

interface User {
    username: string;
    email: string;
    roles: Role[];
}

interface UserContextType {
    user: User | null;
    isAuth: boolean;
    isManager: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);
    const [isManager, setIsManager] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (token) {
                    const response = await axios.get('http://localhost:8080/api/user/current', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const userData: User = response.data;
                    setUser(userData);
                    setIsAuth(true);
                    setIsManager(userData.roles.some((role: Role) => role.name === 'ROLE_MANAGER'));
                } else {
                    setIsAuth(false);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setIsAuth(false);
            }
        };

        fetchUser();
        window.addEventListener('storage', fetchUser);

        return () => {
            window.removeEventListener('storage', fetchUser);
        };
    }, []);

    return (
        <UserContext.Provider value={{ user, isAuth, isManager }}>
            {children}
        </UserContext.Provider>
    );
};
