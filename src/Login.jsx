import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from './apiService';
import { AuthContext } from './AuthContext';
import { checkAuth } from './apiService';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showMessage, setShowMessage] = useState(true);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const user = { username, password };
            await loginUser(user);

            const authData = await checkAuth();

            login(authData.user); // Pass the user data to the login function
            
            navigate('/profile');
        } catch (error) {
            console.error('Login failed', error);
            setErrorMessage('Login failed. Please check your username and password.');
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl mb-4">Login Form</h1>
            {showMessage && location.state?.message && (
                <div
                    className={`border px-4 py-3 rounded relative mb-4 ${
                        location.state.color === 'red'
                            ? 'border-red-400 text-red-400'
                            : 'border-green-400 text-green-400'
                    }`}
                >
                    {location.state.message}
                    <p
                        onClick={() => setShowMessage(false)}
                        className="absolute top-0 right-0 text-xl font-bold cursor-pointer"
                    >
                        &times;
                    </p>
                </div>
            )}
            {errorMessage && (
                <div className="border border-red-400 text-red-400 px-4 py-3 rounded relative mb-4">
                    {errorMessage}
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