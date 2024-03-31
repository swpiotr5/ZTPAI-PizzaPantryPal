import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

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
        margin: '10px auto 15px',
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
        margin: '20px auto 0px',
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
        padding: '20px',
        width: '100%',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
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
});

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const classes = useStyles();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(e.target.value)) {
            setEmailError('Please provide correct email.');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please provide correct email.");
            return;
        }

        if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
            setErrorMessage("Password must contain at least 8 characters, one number and one letter.");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        // try {
        //     const response = await registerUser(email, password);
        //     if (response.error) {
        //         setErrorMessage(response.message);
        //         return;
        //     }
        //
        //     setErrorMessage("Konto utworzone pomyślnie.");
        // } catch (error) {
        //     if ((error as Error).message.includes('ECONNREFUSED')) {
        //         setErrorMessage("Błąd proxy: Nie można przekierować żądania. Brak połączenia z serwerem.");
        //     } else {
        //         setErrorMessage("Brak połączenia z serwerem.");
        //     }
        // }
    };

    return (
        <div className={classes.wrapper}>
            <form onSubmit={handleSubmit} className={classes.form} >
                <div className={classes.inputContainer}>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="EMAIL"
                        onChange={handleEmailChange}
                        className={`${classes.input} ${emailError ? classes.inputError : ''}`}
                    />
                    <div className={classes.errorWrapperInfo}>
                        {emailError && <p className={classes.EmailFormatErrorStyle}>Please provide correct email.</p>}
                    </div>
                </div>
                <div className={classes.inputContainer}>
                    <input className={classes.input} type="password" id="password" placeholder="PASSWORD"
                           value={password} onChange={handlePasswordChange} />
                </div>
                <div className={classes.inputContainer}>
                    <input className={classes.input} type="password" id="confirmPassword" placeholder=" CONFIRM PASSWORD" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                {errorMessage && <div className={classes.errorBox}>{errorMessage}</div>}
                <button className={classes.button} type="submit">Register</button>
            </form>
        </div>
    );
};

export default Form;