import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from './apiService';

function Signup() {
    const [username, setUsername] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = { username, given_name: givenName, family_name: familyName, email, password };

        try {
            await signupUser(user);
            navigate('/login', { state: { message: 'Signup successful! Please log in.' } });
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-2xl mb-4">Signup Form</h1>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Given Name"
                    value={givenName}
                    onChange={(e) => setGivenName(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Family Name"
                    value={familyName}
                    onChange={(e) => setFamilyName(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-2 rounded"
                    required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                    Sign Up
                </button>
            </form>
            <p className="mt-4">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">
                    Login
                </Link>
            </p>
        </div>
    );
}

export default Signup;