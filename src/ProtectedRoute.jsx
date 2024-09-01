import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const validateToken = (token) => {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime ? decoded : null;
    } catch (error) {
        return null;
    }
};

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const decodedToken = token && validateToken(token);
    return decodedToken ? React.cloneElement(children, { decodedToken }) : <Navigate to="/login" />;
};

export default ProtectedRoute;