import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./container/Login";
import Register from "./container/Register";
import Pantry from "./container/Pantry";
import PizzaCreator from "./container/PizzaCreator";
import PizzaMetrics from "./container/PizzaMetrics";
import Profile from "./container/Profile";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            if (localStorage.getItem('access_token') !== null) {
                setIsAuth(true);
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
            <Route path="/" element={isAuth ? <Pantry /> : <Login setIsAuth={setIsAuth}/>} />
            <Route path="/pantry" element={isAuth ? <Pantry /> : <Login setIsAuth={setIsAuth}/>} />
            <Route path="/login" element={!isAuth ? <Login setIsAuth={setIsAuth}/> : <Pantry />} />
            <Route path="/register" element={!isAuth ? <Register /> : <Pantry />} />
            <Route path="/profile" element={isAuth ? <Profile /> : <Login setIsAuth={setIsAuth}/>} />
            <Route path="/pizzametrics" element={isAuth ? <PizzaMetrics /> : <Login setIsAuth={setIsAuth}/>} />
            <Route path="/pizzacreator" element={isAuth ? <PizzaCreator /> : <Login setIsAuth={setIsAuth}/>} />
        </Routes>
    </Router>
);
}

export default App;