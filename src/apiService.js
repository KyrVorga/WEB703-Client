// src/apiService.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signupUser = async (user) => {
    try {
        const response = await fetch(`${API_BASE_URL}/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            credentials: 'include', 
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
            credentials: 'include', 
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

export const changePassword = async (userId, oldPassword, password) => {
    try {
        console.log('userId:', userId);
        const response = await fetch(`${API_BASE_URL}/user/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldPassword, password }),
            credentials: 'include',
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
            credentials: 'include', 
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
        const response = await fetch(`${API_BASE_URL}/user/one/${userId}`, {
            method: 'GET',
            credentials: 'include',
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
            credentials: 'include',
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
            credentials: 'include',
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

export const fetchGroups = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/group/all`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch groups');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching groups:', error);
        throw error;
    }
};

export const createGroup = async (name) => {
    try {
        const response = await fetch(`${API_BASE_URL}/groups/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to create group');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating group:', error);
        throw error;
    }
};

export const joinGroup = async (invitationCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}/invite/redeem/${invitationCode}`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to join group');
        }

        return await response.json();
    } catch (error) {
        console.error('Error joining group:', error);
        throw error;
    }
};

export const fetchInvitations = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/invite/all`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch invites');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching invites:', error);
        throw error;
    }
};

export const createInviteLink = async (groupId, maxUses, expiryDate) => {
    try {
        const response = await fetch(`${API_BASE_URL}/invite/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ group: groupId, maxUses, expiryDate }),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to create invite link');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating invite link:', error);
        throw error;
    }
};