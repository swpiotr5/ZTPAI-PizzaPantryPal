import React, {useEffect, useState} from 'react';
import DefaultTemplate from "../components/DefaultTemplate/DefaultTemplate";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Modal from "../components/Profile/Modal";
import { ManageUsersButton } from "../components/Profile/ManageUsersButton";
import { LogoutButton } from "../components/Profile/LogoutButton";
import { UserDetails } from "../components/Profile/UserDetails";
import { UsersTable } from "../components/Profile/UsersTable";
import { DeleteUserModal } from "../components/Profile/DeleteUserModal";
import {createUseStyles} from "react-jss";
import { ManageRoleModal } from "../components/Profile/ManageRoleModal";


const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '70%',
        height: 'auto',
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
            height: '100%',
            backgroundColor:  '#F8FAE5',
            '&::-webkit-scrollbar': {
                display: 'none',
            },
        },
        '&::-webkit-scrollbar': {
            width: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#F8FAE5',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#76453B',
            borderRadius: '5px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
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
        '@media (max-width: 600px)': {
            width: '150px',
            marginBottom: '20px',
            marginTop: '20px',
        },
    },
});

export interface User {
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
    const [showChangeRoleModal, setShowChangeRoleModal] = useState(false);
    const [userToChangeRole, setUserToChangeRole] = useState('');

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

    useEffect(() => {
        if (showChangeRoleModal) {
            setIsButtonDisabled(true);
            const timer = setTimeout(() => {
                setIsButtonDisabled(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showChangeRoleModal]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        console.log('User logged out');
        window.location.reload();
    };

    const handleManageRoleClick = (username: string) => {
        setUserToChangeRole(username);
        setShowChangeRoleModal(true);
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

    const handleConfirmChangeRole = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://localhost:8080/api/user/changerole', userToChangeRole, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setShowChangeRoleModal(false);
            setUserToChangeRole('');
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
                    {user && <UserDetails user={user}/>}
                    <LogoutButton handleLogout={handleLogout} />
                    {user && user.roles[0].name === 'manager' && (
                        <ManageUsersButton handleManageUsersClick={handleManageUsersClick} />
                    )}
                    {showUsers && user && user.roles[0].name === 'manager' && allUsers && (
                        <UsersTable showUsers={showUsers} allUsers={allUsers} handleManageRoleClick={handleManageRoleClick} handleRemoveUserClick={handleRemoveUserClick} />
                    )}
                    {showModal && (
                        <DeleteUserModal showModal={showModal} userToDelete={userToDelete} isButtonDisabled={isButtonDisabled} handleConfirmDelete={handleConfirmDelete} setShowModal={setShowModal} />
                    )}
                    {showChangeRoleModal && (
                        <ManageRoleModal
                            showModal={showChangeRoleModal}
                            userToChangeRole={userToChangeRole}
                            isButtonDisabled={isButtonDisabled}
                            handleConfirmChangeRole={handleConfirmChangeRole}
                            setShowChangeRoleModal={setShowChangeRoleModal}
                        />
                    )}
                </div>
            </DefaultTemplate>
        </div>
    );
};

export default Profile;