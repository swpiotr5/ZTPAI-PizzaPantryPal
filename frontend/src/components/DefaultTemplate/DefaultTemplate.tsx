import React, {ReactNode} from 'react';
import { createUseStyles } from 'react-jss';
import Sidebar from './Sidebar';

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
            justifyContent: 'center',
            minHeight: '100vh',
            width: '100%',
            backgroundColor: '#43766C',
            margin: '0px',
            padding: '0px',
            borderRadius: '0px',
        },
        wrapper: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            borderRadius: '30px',
            height: '100vh',
        },
    },
);

const DefaultTemplate: React.FC<DefaultTemplateProps> = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Sidebar />
                {children}
            </div>
        </div>
    );
};

export default DefaultTemplate;