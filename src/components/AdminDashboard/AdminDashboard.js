import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { getAllUsers, createProject, createTask, assignUserToProject, assignTaskToUser, getProjects, getTasks } from '../../services/api';
import CreateProjectForm from '../Project/CreateProject';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

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

    const handleCreateProject = (newProject) => {
        setProjects([...projects, newProject]);
    };

    const handleAssignUserToProject = async (projectId, userId) => {
        await assignUserToProject(projectId, userId);
    };

    const handleAssignTaskToUser = async (taskId, userId) => {
        await assignTaskToUser(taskId, userId);
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
                                <a key = {project._id} className = {styles.listMenuItem}>
                                    <p>{project.projectName}</p>
                                </a>
                            ))}
                        </div>
                        <button className = {styles.button} type = 'button' onClick={() => setShowProjectForm(true)}>+ New Project</button>
                    </div>

                    <div className = {styles.tasksListContainer}>
                        <h1 className = {styles.title}>
                            Tasks
                        </h1>

                        {/* Tasks Elements*/}
                        {tasks.map(task => (
                            <div key = {task._id} className = {styles.task}>
                                <p>{task.taskName}</p>
                            </div>
                        ))}
                        <button className = {styles.circleAddButton} type = 'button'>T</button>
                    </div>
                </div>
            </div>
            {showProjectForm && (
                <CreateProjectForm
                    onClose = {() => setShowProjectForm(false)}
                    onCreate = {handleCreateProject}
                />
            )}
        </div>
    );
};

export default AdminDashboard;