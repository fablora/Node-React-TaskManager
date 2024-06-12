import React, { useEffect, useState } from 'react';
import { getProjects, getTasks } from '../services/api';
import './Dashboard.css';

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
        <div className = "wrapper">
            <div className = "centered-content">
                <div className = "projects-container">
                    <div className = "sidebar">
                        <h1 className = "title-has-text-primary">
                            Projects
                        </h1>
                        <div className = "list-menu">
                            <a className = "list-menu-item">
                                <p>Project 1</p>
                            </a>
                        </div>

                    </div>

                    <div className= "tasks-list-container">
                        <h1 className = "title-has-text-primary">
                            Tasks
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;