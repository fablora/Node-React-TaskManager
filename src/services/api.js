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

/* USER & AUTH ENDPOINTS */

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const getUsersByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/users`);
    return response.data;
};

/* PROJECT ENDPOINTS */

export const createProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_URL}/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error in createProject API:', error.response.data);
        throw error;
    }
};

export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

export const getProjectById = async (id) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
};

export const assignUserToProject = async (userId, projectId) => {
    const response = await axios.post(`${API_URL}/projects/assign`, { userId, projectId });
    return response.data;
};

export const removeUserFromProject = async (userId, projectId) => {
    const response = await axios.post(`${API_URL}/users/removeFromProject`, { userId, projectId });
    return response.data;
};

/* TASK ENDPOINTS */

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

export const getTaskById = async (taskId) => {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`);
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error in updateTask API:', error.response.data);
        throw error;
    }
};

export const assignTaskToUser = async (userId, taskId) => {
    const response = await axios.post(`${API_URL}/tasks/assign`, { userId, taskId });
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await axios.post(`${API_URL}/tasks/deleteTask`, { taskId });
    return response.data;
};