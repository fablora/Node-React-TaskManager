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

// USER & AUTH ENDPOINT CALLS

/**
 * Registers a new user
 * @param {Object} userData - User data for registration
 * @returns {Object} - Registered user data
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        console.error('Error in registerUser API:', error.response.data);
        throw error;
    }
};

/**
 * Logs in a user
 * @param {Object} userData - User data for login
 * @returns {Object} - Logged in user data
 */
export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

/**
 * Fetches all users
 * @returns {Array} - List of users
 */
export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

/**
 * Fetches users assigned to a specific project
 * @param {String} projectId - ID of the project
 * @returns {Array} - List of users assigned to the project
 */
export const getUsersByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/projects/${projectId}/users`);
    return response.data;
};

// PROJECT ENDPOINT CALLS

/**
 * Creates a new project
 * @param {Object} projectData - Data for the new project
 * @returns {Object} - Created project data
 */
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_URL}/projects`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error in createProject API:', error.response.data);
        throw error;
    }
};

/**
 * Fetches all projects
 * @returns {Array} - List of projects
 */
export const getProjects = async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
};

/**
 * Fetches a project by ID
 * @param {String} id - ID of the project
 * @returns {Object} - Project data
 */
export const getProjectById = async (id) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response.data;
};

/**
 * Fetches projects for specific user
 * @param {String} userId - ID of the user
 * @returns {Array} - List of projects assigned to the user
 */
export const getProjectsByUser = async (userId) => {
    try {
        console.log('Get Projects by User ID', userId);
        const response = await axios.get(`${API_URL}/projects/user/${userId}`);
        console.log('Get Projects by User data', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects: ', error.response.data);
        throw error;
    }
};

/**
 * Assigns a user to a project
 * @param {String} userId - ID of the user
 * @param {String} projectId - ID of the project
 * @returns {Object} - Assignment data
 */
export const assignUserToProject = async (userId, projectId) => {
    const response = await axios.post(`${API_URL}/projects/assign`, { userId, projectId });
    return response.data;
};

/**
 * Removes a user from a project
 * @param {String} userId - ID of the user
 * @param {String} projectId - ID of the project
 * @returns {Object} - Removal confirmation data
 */
export const removeUserFromProject = async (userId, projectId) => {
    const response = await axios.post(`${API_URL}/users/removeFromProject`, { userId, projectId });
    return response.data;
};

// TASK ENDPOINT CALLS

/**
 * Creates a new task
 * @param {Object} taskData - Data for the new task
 * @returns {Object} - Created task data
 */
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

/**
 * Fetches tasks for a specific project
 * @param {String} projectId - ID of the project
 * @returns {Array} - List of tasks for the project
 */
export const getTasksByProject = async (projectId) => {
    const response = await axios.get(`${API_URL}/tasks/project/${projectId}`);
    return response.data;
};

/**
 * Fetches tasks for a specific user and project
 * @param {String} userId - ID of the user
 * @param {String} projectId - ID of the project
 * @returns {Array} - List of tasks for the user in the project
 */
export const getTasksByUserAndProject = async (userId, projectId) => {
    const response = await axios.get(`${API_URL}/tasks/user/${userId}/project/${projectId}`);
    return response.data;
};

/**
 * Fetches all tasks
 * @returns {Array} - List of tasks
 */
export const getTasks = async () => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
};

/**
 * Fetches a task by ID
 * @param {String} taskId - ID of the task
 * @returns {Object} - Task data
 */
export const getTaskById = async (taskId) => {
    const response = await axios.get(`${API_URL}/tasks/${taskId}`);
    return response.data;
};

/**
 * Updates a task
 * @param {String} taskId - ID of the task
 * @param {Object} taskData - Data for the task update
 * @returns {Object} - Updated task data
 */
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

/**
 * Assigns a task to a user
 * @param {String} userId - ID of the user
 * @param {String} taskId - ID of the task
 * @returns {Object} - Assignment data
 */
export const assignTaskToUser = async (userId, taskId) => {
    const response = await axios.post(`${API_URL}/tasks/assign`, { userId, taskId });
    return response.data;
};

/**
 * Deletes a task
 * @param {String} taskId - ID of the task
 * @returns {Object} - Deletion confirmation data
 */
export const deleteTask = async (taskId) => {
    const response = await axios.post(`${API_URL}/tasks/deleteTask`, { taskId });
    return response.data;
};