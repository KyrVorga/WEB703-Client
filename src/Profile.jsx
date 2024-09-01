import React, { useState } from 'react';
import { changePassword } from './apiService';

function Profile({ decodedToken }) {
    const user = decodedToken.user;
    const isAdmin = decodedToken.role === 'admin';

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await changePassword(currentPassword, newPassword);
            setSuccess('Password changed successfully');
        } catch (error) {
            setError('Failed to change password');
        }
    };

    return (
        <div className="flex flex-col items-center mt-10 text-white">
            <h2 className="text-2xl mb-4">Profile</h2>
            <p className="mb-4">Welcome, {user.username}!</p>
            <div className="mb-6">
                <h3 className="text-xl mb-2">Account Information</h3>
                <p>Email: {user.email}</p>
                <p>Username: {user.username}</p>
            </div>
            <div className="mb-6">
                <h3 className="text-xl mb-2">Change Password</h3>
                <form className="flex flex-col space-y-4" onSubmit={handlePasswordChange}>
                    <label className="flex flex-col">
                        Current Password:
                        <input
                            type="password"
                            name="currentPassword"
                            className="border border-gray-300 p-2 rounded bg-gray-800 text-white"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col">
                        New Password:
                        <input
                            type="password"
                            name="newPassword"
                            className="border border-gray-300 p-2 rounded bg-gray-800 text-white"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Change Password
                    </button>
                </form>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </div>
            {isAdmin && (
                <div className="mb-6">
                    <h3 className="text-xl mb-2">Admin: List of All Users</h3>
                    <ul className="list-disc list-inside">
                        <li>User 1</li>
                        <li>User 2</li>
                        <li>User 3</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Profile;