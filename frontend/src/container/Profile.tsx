import React, {useEffect, useState} from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import { createUseStyles } from "react-jss";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaSignOutAlt, FaCaretDown } from 'react-icons/fa';
import Modal from "../components/Profile/Modal";
import Countdown from "../components/Profile/Countdown";

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '70%',
        height: '90vh',
        maxWidth: '1500px',
        margin: 'auto',
        overflow: 'auto',
        backgroundColor: '#F8FAE5',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        '@media (max-width: 600px)': {
            marginTop: '80px',
            borderRadius: '20px',
            width: '100%',
            backgroundColor:  '#F8FAE5',
        },
    },
    userIcon: {
        width: '300px',
        color: '#76453B',
        marginBottom: '50px',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    userDetails: {
        marginBottom: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    userDetailsText: {
        color: '#76453B',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        marginBottom: '10px',
        textAlign: 'center',
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
        fontFamily: '"Arial", sans-serif',
    },
    table: {
        marginTop: '40px',
        marginBottom: '40px',
        width: '80%',
        borderCollapse: 'collapse',
        maxHeight: '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s ease-in-out',
    },
    tableShow: {
        maxHeight: '1000px',
    },
    tableHeader: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
    },
    tableCell: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        textAlign: 'center',
    },
    manageUsersButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '20px',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    caretIcon: {
        marginLeft: '10px',
    },
    manageRoleButton: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    removeUserButton: {
        backgroundColor: '#481E14',
        color: 'red',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        fontSize: '15px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#76453B',
        },
    },
    modalText: {
        marginBottom: '20px',
    },
    modalButton: {
        backgroundColor: '#76453B',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '0 10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#B19470',
        },
    },
    modalButtonDisabled: {
        backgroundColor: 'gray',
        color: '#F8FAE5',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        margin: '0 10px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'not-allowed',
    },
    username: {
        color: 'red',
    },
});

interface User {
    username: string;
    email: string;
    roles: { name: string }[];
}
interface Role {
    name: string;
}
const Profile = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [allUsers, setAllUsers] = useState<User[] | null>(null);
    const [showUsers, setShowUsers] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        if (showModal) {
            setIsButtonDisabled(true);
            const timer = setTimeout(() => {
                setIsButtonDisabled(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showModal]);

    const handleManageUsersClick = () => {
        setShowUsers(!showUsers);
    };

    const fetchAllUsers = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:8080/api/user/all', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setAllUsers(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8080/api/user/current', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                let userData = response.data;
                if (userData) {
                    userData.roles = userData.roles.map((role: Role) => {
                        if (role.name === 'ROLE_MANAGER') {
                            return { name: 'manager' };
                        } else if (role.name === 'ROLE_USER') {
                            return { name: 'user' };
                        } else {
                            return role;
                        }
                    });
                }
                setUser(userData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        if (user && user.roles[0].name === 'manager') {
            fetchAllUsers();
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        console.log('User logged out');
        window.location.reload();
    };

    const handleManageRoleClick = (username: string) => {
        console.log(`Manage role for ${username}`);
    };

    const handleRemoveUserClick = (username: string) => {
        setUserToDelete(username);
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://localhost:8080/api/user/delete', userToDelete, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShowModal(false);
            setUserToDelete('');
            fetchAllUsers();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <DefaultTemplate>
                <div className={classes.wrapper}>
                    <img src={`${process.env.PUBLIC_URL}/pizzaman-logo.png`} className={classes.userIcon} alt="User"/>
                    {user && (
                        <div className={classes.userDetails}>
                        <p className={classes.userDetailsText}>Username: {user.username}</p>
                            <p className={classes.userDetailsText}>Role: {user.roles[0].name}</p>
                        </div>
                    )}
                    <button onClick={handleLogout} className={classes.logoutButton}>
                        <FaSignOutAlt/> Logout
                    </button>
                    {user && user.roles[0].name === 'manager' && (
                        <button onClick={handleManageUsersClick} className={classes.manageUsersButton}>
                            Manage Users <FaCaretDown className={classes.caretIcon} />
                        </button>
                    )}
                    {showUsers && user && user.roles[0].name === 'manager' && allUsers && (
                        <table className={`${classes.table} ${showUsers ? classes.tableShow : ''}`}>
                        <thead>
                        <tr className={classes.tableHeader}>
                            <th className={classes.tableCell}>Username</th>
                            <th className={classes.tableCell}>Email</th>
                            <th className={classes.tableCell}>Role</th>
                            <th className={classes.tableCell}></th>
                            <th className={classes.tableCell}></th>
                        </tr>
                        </thead>
                            <tbody>
                            {allUsers.map((user, index) => (
                                <tr key={index}>
                                    <td className={classes.tableCell}>{user.username}</td>
                                    <td className={classes.tableCell}>{user.email}</td>
                                    <td className={classes.tableCell}>{user.roles[0].name}</td>
                                    <td className={classes.tableCell}>
                                        <button onClick={() => handleManageRoleClick(user.username)}
                                                className={classes.manageRoleButton}>
                                            Manage Role
                                        </button>
                                    </td>
                                    <td className={classes.tableCell}>
                                        {user.roles[0].name !== 'ROLE_MANAGER' && (
                                            <button onClick={() => handleRemoveUserClick(user.username)}
                                                    className={classes.removeUserButton}>
                                                Remove user
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                    {showModal && (
                        <Modal>
                            <p className={classes.modalText}>Are you sure you want to delete user <span className={classes.username}>{userToDelete}</span>?</p>
                            <div>
                                <button disabled={isButtonDisabled} onClick={handleConfirmDelete}
                                        className={isButtonDisabled ? classes.modalButtonDisabled : classes.modalButton}>Yes
                                </button>
                                <button onClick={() => setShowModal(false)} className={classes.modalButton}>No</button>
                            </div>
                            <Countdown from={5} onComplete={() => {}}/>
                        </Modal>
                    )}
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default Profile;