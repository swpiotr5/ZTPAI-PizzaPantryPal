import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from "./container/Home";
import Login from "./container/Login";
import Register from "./container/Register";
import Pantry from "./container/Pantry";
import PizzaCreator from "./container/PizzaCreator";
import PizzaMetrics from "./container/PizzaMetrics";
import Profile from "./container/Profile";

function App() {
  return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route path='/pantry' element={<Pantry />} />
            <Route path='/pizzacreator' element={<PizzaCreator />} />
            <Route path='/pizzametrics' element={<PizzaMetrics />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
      </>
  );
}

export default App;
