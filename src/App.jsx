import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Group from './Group';
import ProtectedRoute from './ProtectedRoute';
import LogoutButton from './LogoutButton';
import { AuthContext, AuthProvider } from './AuthContext';

function AppContent() {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div className="App">
            <div className="top-right-link absolute top-0 right-0">
                {isAuthenticated && (
                    <>
                        <LogoutButton />
                    </>
                )}
                <a href="/profile" className='ml-4'>Profile</a>
                <a href="/groups" className='ml-4'>Groups</a>
            </div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/groups"
                    element={
                        <ProtectedRoute>
                            <Group />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <AppContent />
            </Router>
        </AuthProvider>
    );
}

export default App;