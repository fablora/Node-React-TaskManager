import React, { useEffect, useState } from 'react';
import useUserId from '../../hooks/useUserId';
import { getProjectsByUser, getTasksByUserAndProject } from '../../services/api';
import styles from './Dashboard.module.css';
import LogoutButton from '../Buttons/LogoutButton';

const Dashboard= () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [displayTaskDescription, setDisplayTaskDescription] = useState(null);
    const userId = useUserId();

    useEffect(() => {
        const fetchData = async () => {
            if (userId) {    
                const projectData = await getProjectsByUser(userId);
                setProjects(projectData);
            }
        };
        fetchData();
    }, [userId]);

    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        if (userId) {    
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
                    <LogoutButton />
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