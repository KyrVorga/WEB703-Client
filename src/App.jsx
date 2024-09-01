import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';

function App() {
    return (
        <div className="App">
            <div className="top-right-link absolute top-0 right-0">
                <a href="/profile">Profile</a>
            </div>
            <Router>
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
                </Routes>
            </Router>
        </div>
    );
}

export default App;