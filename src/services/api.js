import axios from "axios";

const API_URL = 'http://localhost:5000';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
};

export const createProject = async (projectData) => {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
};

export const getProjects = async () => {
    const response = await axios.post(`${API_URL}/projects`);
    return response.data;
}

export const getProjectByID = async (id) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return response.data;
};