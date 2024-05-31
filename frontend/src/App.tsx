import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Login from "./container/Login";
import Register from "./container/Register";
import Pantry from "./container/Pantry";
import PizzaCreator from "./container/PizzaCreator";
import PizzaMetrics from "./container/PizzaMetrics";
import Profile from "./container/Profile";
import Unauthorized from "./container/Unauthorized";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    username: string;
    email: string;
    roles: { name: string }[];
}

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isManager, setIsManager] = useState(false);
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('access_token');
            if (token !== null) {
                setIsAuth(true);
                try {
                    const response = await axios.get('http://localhost:8080/api/user/current', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Failed to fetch user data:', error);
                    setIsAuth(false);
                }
            }
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuth ? <Pantry isManager={isManager}/> : <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/>} />
                <Route path="/pantry" element={isAuth ? <Pantry isManager={isManager}/> : <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/>} />
                <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/> : <Pantry isManager={isManager}/>} />
                <Route path="/register" element={!isAuth ? <Register /> : <Pantry isManager={isManager}/>} />
                <Route path="/profile" element={isAuth ? <Profile /> : <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/>} />
                <Route path="/pizzametrics" element={isAuth ? <PizzaMetrics /> : <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/>} />
                <Route path="/pizzacreator" element={isAuth ? (isManager ? <PizzaCreator/> : <Unauthorized />) : <Login setIsAuth={setIsAuth} setIsManager={setIsManager}/>} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                containerId={undefined}
            />
        </Router>
    );
}

export default App;
