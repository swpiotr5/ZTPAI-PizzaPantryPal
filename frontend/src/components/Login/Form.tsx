import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = createUseStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        margin: 'auto',
    },
    input: {
        padding: '20px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        width: '75%',
        height: '50px',
        margin: '0px auto 15px',
        color: '#F8FAE5',
        '&:focus': {
            outline: 'none',
            border: '1px solid #4CAF50',
            color: '#F8FAE5',
            backgroundColor: '#43766C',
        },
        '&::placeholder': {
            color: '#F8FAE5',
            fontSize: '0.7rem',
        },
        backgroundColor: '#76453B',
    },
    button: {
        padding: '10px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        width: '66%',
        height: '40px',
        margin: '0px auto 0px',
        color: '#F8FAE5',
        cursor: 'pointer',
        backgroundColor: '#76453B',
        transition: 'transform 0.3s ease',
        '&:active': {
            transform: 'scale(0.95)',
        },
        '&:hover': {
            backgroundColor: '#43766C',
        },
        animation: '$pulse 2s infinite',
    },
    '@keyframes pulse': {
        '0%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.05)' },
        '100%': { transform: 'scale(1)' },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px',
        width: '100%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    icon: {
        position: 'absolute',
        left: '10px',
    },
    forgotPassword: {
        textAlign: 'right',
        color: '#161A30',
        textDecoration: 'none',
        fontSize: '0.8rem',
        '&:hover': {
            textDecoration: 'underline',
        },
        padding: '0px 45px 8px',
    },
    inputError: {
        border: '2px solid red',

    },
    errorBox: {
        border: '1px solid red',
        borderRadius: '5px',
        padding: '5px 10px',
        color: 'red',
        marginBottom: '15px',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    LoginText: {
        fontSize: '1.7rem',
        color: '#76453B',
        marginBottom: '10px',
    },
    SignInText: {
        fontSize: '0.9rem',
        color: '#76453B',
        marginBottom: '10px',
    },
    wrapperText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        paddingLeft: '90px',
        paddingBottom: '10px',
        width: '100%',
    },
    errorWrapperInfo: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    EmailFormatErrorStyle: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    '@media (max-width: 1080px)': {
        input: {
            padding: '20px',
            borderRadius: '25px',
            border: '1px solid #ccc',
            width: '75%',
            height: '60px',
            margin: '15px auto 15px',
            '&::placeholder': {
                fontSize: '0.8rem',
            },
            fontSize: '1rem',
        },
        button: {
            fontSize: '1rem',
            height: '60px',
            margin: '10px auto 0px',
        },
        LoginText: {
            fontSize: '3rem',
            color: '#76453B',
            marginBottom: '10px',
            marginLeft: '100px',
        },
        SignInText: {
            fontSize: '2rem',
            color: '#76453B',
            marginBottom: '10px',
            marginLeft: '100px',
        },
        EmailFormatErrorStyle: {
            fontSize: '1.4rem',
        },
        forgotPassword: {
            fontSize: '1.2rem',
            '&:hover': {
                textDecoration: 'underline',
            },
            padding: '15px 80px 15px 0px',
        },
    },
    '@media (max-width: 768px)': {
        input: {
            width: '90%',
            height: '55px',
            margin: '12px auto 12px',
        },
        button: {
            fontSize: '1rem',
            height: '55px',
            margin: '0px auto 0px',
        },
        LoginText: {
            fontSize: '1.7rem',
            marginBottom: '10px',
            marginLeft: '0px',
        },
        SignInText: {
            fontSize: '1.3rem',
            marginBottom: '10px',
            marginLeft: '0px',
        },
        EmailFormatErrorStyle: {
            fontSize: '1rem',
        },
        forgotPassword: {
            fontSize: '0.9rem',
            '&:hover': {
                textDecoration: 'underline',
            },
            padding: '5px 15px 15px 0px',
        },
        wrapperText: {
            paddingLeft: '50px',
        },
    }
});

const Form = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailFormatError, setEmailFormatError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsLoading(true);

        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(email)) {
            setEmailFormatError('Please provide correct email.');
            return;
        }

        // try {
        //     const response = await loginUser(email, password);
        //
        //     if (response.success) {
        //         navigate('/home');
        //     } else {
        //         const errorMessage = response.message || 'Nieprawidłowy email lub hasło.';
        //         setLoginError(errorMessage);
        //     }
        // } catch (error) {
        //     if ((error as Error).message === 'Network Error.') {
        //         setLoginError('Brak połączenia. Spróbuj ponownie później.');
        //     } else {
        //         setLoginError('Wystąpił błąd podczas weryfikacji danych. Spróbuj ponownie później.');
        //     }
        //     console.error('Wystąpił błąd podczas weryfikacji danych.', error);
        // } finally {
        //     setIsLoading(false);
        // }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(e.target.value)) {
            setEmailFormatError('Please provide correct email.');
        } else {
            setEmailFormatError('');
        }
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.wrapperText}>
            <p className={classes.LoginText}>Login</p>
            <p className={classes.SignInText}>Sign in to continue</p>
            </div>
                <form onSubmit={handleSubmit} className={classes.form}>
                <div className={classes.inputContainer}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`${classes.input} ${emailFormatError ? classes.inputError : ''}`}
                        placeholder="EMAIL"
                    />
                    <div className={classes.errorWrapperInfo}>
                        {emailFormatError && <p className={classes.EmailFormatErrorStyle}>{emailFormatError}</p>}
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={classes.input}
                        placeholder="PASSWORD"
                    />
                    <a href="/resetPassword" className={classes.forgotPassword}>Forgot password?</a>
                </div>
                    {loginError && <p className={classes.errorBox}>{loginError}</p>}
                <div className={classes.inputContainer}>
                    <button type="submit" className={classes.button}>
                        {isLoading ? 'Loading...' : 'SIGN IN'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;