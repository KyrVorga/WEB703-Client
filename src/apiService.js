// src/apiService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API_BASE_URL:', API_BASE_URL);

export const signupUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Signup failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const loginUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        console.log('response:', response);

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!response.ok) {
            throw new Error('Password change failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};