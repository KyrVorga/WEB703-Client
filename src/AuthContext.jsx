import React, { createContext, useState, useEffect } from 'react';
import { checkAuth } from './apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({ isAuthenticated: null, user: null });

    useEffect(() => {
        const authenticate = async () => {
            try {
                const data = await checkAuth();
                setAuthState({ isAuthenticated: data.authenticated, user: data.user });
            } catch (error) {
                setAuthState({ isAuthenticated: false, user: null });
            }
        };

        authenticate();
    }, []);

    const login = (user) => {
        setAuthState({ isAuthenticated: true, user });
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return (
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};