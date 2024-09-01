// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from './apiService';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const user = { username, password };
            const response = await loginUser(user);
            console.log('Login successful:', response);
            localStorage.setItem('token', response.token);

            // On successful login, navigate to the profile page
            navigate('/profile');
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl mb-4">Login Form</h1>
                {location.state?.message && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
                        {location.state.message}
                    </div>
                )}
            <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
            <p className="mt-4">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-500">
                    Sign Up
                </Link>
            </p>
        </div>
    );
}

export default Login;