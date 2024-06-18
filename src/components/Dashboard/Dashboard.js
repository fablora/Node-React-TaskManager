import React, { useEffect, useState } from 'react';
import { getProjects, getTasks } from '../../services/api';
import styles from './Dashboard.module.css';

const Dashboard= () => {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const projectData = await getProjects();
            setProjects(projectData);

            const taskData = await getTasks();
            setTasks(taskData);
        };
        fetchData();
    }, []);

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;