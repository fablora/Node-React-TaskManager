import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getProjectsByUser, getTasksByUserAndProject, getTasks } from '../../services/api';
import styles from './Dashboard.module.css';

const Dashboard= () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            console.log(token);
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
                        {tasks.map(task => (
                            <div key = {task._id} className = {styles.task}>
                                <p>{task.taskTitle}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;