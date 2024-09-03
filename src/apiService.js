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
            credentials: 'include', // Include credentials in the request
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
            credentials: 'include', // Include credentials in the request
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
            credentials: 'include', // Include credentials in the request
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

export const checkAuth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Auth check failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getUserData = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/${userId}`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/all`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Failed to fetch all users');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};


export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/logout`, {
            method: 'GET',
            credentials: 'include', // Include credentials in the request
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}