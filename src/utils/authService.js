import config from "../config";

export const register = async (userData) => {
    const response = await fetch(`${config.API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const data = await response.json();
        const user = {
            id: data.user.id,
            username: data.user.username,
            timestamp: Date.now()
        };
        localStorage.setItem('user', JSON.stringify(user));
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.error);
    }
};

export const login = async (userData) => {
    const response = await fetch(`${config.API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
    });

    if (response.ok) {
        const data = await response.json();
        const user = {
            id: data.user.id,
            username: data.user.username,
            timestamp: Date.now()
        };
        localStorage.setItem('user', JSON.stringify(user));
        return data;
    } else {
        const error = await response.json();
        throw new Error(error.error);
    }
};

export const refreshAccessToken = async () => {
    const response = await fetch(`${config.API}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
    });

    if (response.ok) {
        const data = await response.json();
        return data.accessToken;
    } else {
        throw new Error('Failed to refresh token');
    }
};

export const logout = async () => {
    await fetch(`${config.API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    localStorage.removeItem('user');
};

export const checkRefreshTokenInCookies = () => {
    return Cookies.get("refreshToken") !== undefined;
};