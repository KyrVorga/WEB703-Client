import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from './apiService';
import { AuthContext } from './AuthContext';

const LogoutButton = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logoutUser();
            logout(); // Update the auth state
            navigate('/login', { state: { message: 'You have been logged out.' } });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <p className='logout' onClick={handleLogout}>
            Logout
        </p>
    );
};

export default LogoutButton;