import React, {ReactNode} from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import { useLocation } from 'react-router-dom';

interface DefaultTemplateProps {
    children?: ReactNode;
}

const useStyles = createUseStyles(
    {
        '@global': {
            '*': {
                margin: 0,
                padding: 0,
                boxSizing: 'border-box',
            },
            '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap")',
            html: {
                height: '100%',
                width: '100%',
            },
            body: {
                height: '100%',
                width: '100%',
                fontFamily: 'Roboto, sans-serif',
            },
        },
        root: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#43766C',
            margin: '0px',
            padding: '0px',
            borderRadius: '0px',
            height: '100vh',
            overflow: 'hidden',
        },
        desktop: {
            height: '100%',
            '@media (max-width: 600px)': {
                display: 'none',
            },
        },
        mobile: {
            display: 'none',
            height: '100%',
            '@media (max-width: 600px)': {
                display: 'block',
            },
        },
        pageTitle: {
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: '#fff',
            fontSize: '25px',
            padding: '10px 0',
        },
    },
);

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ children }) => {
    const classes = useStyles();
    const location = useLocation();

    let pageTitle = '';
    switch (location.pathname) {
        case '/profile':
            pageTitle = 'Profile';
            break;
        case '/pantry':
            pageTitle = 'Pantry';
            break;
        case '/pizzametrics':
            pageTitle = 'PizzaMetrics';
            break;
        case '/pizzacreator':
            pageTitle = 'PizzaCreator';
            break;
        default:
            pageTitle = '';
    }

    return (
        <div className={classes.root}>
            <div className={classes.desktop}>
                <Sidebar />
            </div>
            <div className={classes.mobile}>
                <MobileNavbar />
                <div className={classes.pageTitle}>{pageTitle}</div> {/* Dodane */}
            </div>
            {children}
        </div>
    );
};


export default DefaultTemplate;