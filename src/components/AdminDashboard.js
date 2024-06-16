import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { getAllUsers, createProject, createTask, assignUserToProject, assignUserToTask, getProjects, getTasks } from '../services/api';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userData = await getAllUsers();
            setUsers(userData);

            const projectData = await getProjects();
            setProjects(projectData);

            const taskData = await getTasks();
            setTasks(taskData);
        };
        fetchData();
    }, []);

    const handleAssignUserToProject = async (projectId, userId) => {
        await assignUserToProject(projectId, userId);
    };

    return (
        false
    );
};