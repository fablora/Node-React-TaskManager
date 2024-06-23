import axios from "axios";

const API_URL = 'http://localhost:5000';

axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
};

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const getTasksByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/tasks/project/${projectId}`);
    return response.data;
};

export const getTasksByUserAndProject = async (userId, projectId) => {
    const response = await axios.get(`${API_URL}/tasks/user/${userId}/project/${projectId}`);
    return response.data;
};

export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};

export const getUsersByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/users`);
    return response.data;
};

export const getProjectByID = async (id) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${API_URL}/tasks`, taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in createTask API:', error.response.data);
        throw error;
    }
};

export const assignUserToProject = async (userId, projectId) => {
    const response = await axios.post(`${API_URL}/projects/assign`, { userId, projectId });
    return response.data;
};

export const assignTaskToUser = async (userId, taskId) => {
    const response = await axios.post(`${API_URL}/tasks/assign`, { userId, taskId });
    return response.data;
};