import axios from 'axios';

const API_URL = 'http://localhost:4000';

const login = async (userid, password) => {
    const response = await axios.post(`${API_URL}/login`, { userid, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const register = async (formData) => {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
};

export default { login, register };
