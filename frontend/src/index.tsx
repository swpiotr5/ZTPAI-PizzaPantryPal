import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Helmet>
            <title>PizzaPantryPal</title>
            <link rel="icon" href="/pizzaicon.png"/>
        </Helmet>
        <App/>
    </React.StrictMode>
);

reportWebVitals();