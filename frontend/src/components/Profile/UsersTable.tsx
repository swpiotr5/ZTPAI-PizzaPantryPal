// UsersTable.tsx
import React from 'react';
import { createUseStyles } from "react-jss";
import { User } from '../../container/Profile';

const useStyles = createUseStyles({
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
        '@media (max-width: 600px)': {
            '&:nth-child(2)': {
                display: 'none',
            },
            fontSize: '14px',
        },
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
        '@media (max-width: 600px)': {
            padding: '5px 10px',
            fontSize: '12px',

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
        '@media (max-width: 600px)': {
            padding: '5px 10px',
            fontSize: '12px',

        },
    },
});

interface UsersTableProps {
    showUsers: boolean;
    allUsers: User[] | null;
    handleManageRoleClick: (username: string) => void;
    handleRemoveUserClick: (username: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ showUsers, allUsers, handleManageRoleClick, handleRemoveUserClick }) => {
    const classes = useStyles();

    const mapRole = (roleName: string) => {
        switch (roleName) {
            case 'ROLE_USER':
                return 'user';
            case 'ROLE_MANAGER':
                return 'manager';
            default:
                return roleName;
        }
    };

    if (!showUsers || !allUsers) {
        return null;
    }
    return (
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
                    <td className={classes.tableCell}>{mapRole(user.roles[0].name)}</td>
                    <td className={classes.tableCell}>
                        {user.username !== 'admin' && (
                        <button onClick={() => handleManageRoleClick(user.username)}
                                className={classes.manageRoleButton}>
                            Manage Role
                        </button>
                        )}
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
    );
};