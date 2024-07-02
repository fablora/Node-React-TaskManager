import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getProjectsByUser, getTasksByUserAndProject } from '../../services/api';
import styles from './Dashboard.module.css';

const Dashboard= () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [displayTaskDescription, setDisplayTaskDescription] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const decodedToken = jwtDecode(token);
                const userId = decodedToken.userId;         
                const projectData = await getProjectsByUser(userId);
                setProjects(projectData);
            }
        };
        fetchData();
    }, []);

    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;         
            const taskData = await getTasksByUserAndProject(userId, project._id)
            setTasks(taskData);
        }
    };

    const handleTaskClick = (taskId) => {
        setDisplayTaskDescription(displayTaskDescription === taskId ? null : taskId);
    };

    return (
        <div className = {styles.wrapper}>
            <div className = {styles.centeredContent}>
                <div className = {styles.projectsContainer}>
                    <div className = {styles.sidebar}>
                        <h1 className = {styles.title}>
                            Projects
                        </h1>

                        {/* Projects Elements*/}

                        <div className = {styles.listMenu}>
                            {projects.map(project => (
                                <a key = {project._id} className = {styles.listMenuItem} onClick = {() => handleProjectClick(project)}>
                                    <p>{project.projectName}</p>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className = {styles.tasksListContainer}>
                        <h1 className = {styles.title}>
                            Tasks
                        </h1>
                        {/* Tasks Elements*/}
                        <table className = {styles.taskTable}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map(task => (
                                    <React.Fragment key = {task._id}>
                                        <tr onClick = {() => handleTaskClick(task._id)} className = {styles.taskRow}>
                                            <td>{task.taskTitle}</td>
                                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                            <td>{task.taskStatus}</td>
                                        </tr>
                                        {displayTaskDescription === task._id && (
                                            <tr className = {styles.taskDescriptionRow}>
                                                <td colSpan="3">{task.taskDescription}</td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;