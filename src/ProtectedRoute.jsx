import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // or a loading spinner
    }

    return isAuthenticated ? children : <Navigate to="/login" state={{ message: 'Unauthorized access. Please log in.', color: 'red'  }} />;
};

export default ProtectedRoute;