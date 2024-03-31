import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Helmet } from 'react-helmet';
const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Helmet>
                <title>PizzaPantryPal</title>
                <link rel="icon" href="/pizzaicon.png"/>
            </Helmet>
            <App/>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();