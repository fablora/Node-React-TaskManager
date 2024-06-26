import React, { useEffect, useState } from 'react';
import styles from './AdminDashboard.module.css';
import { getAllUsers, assignUserToProject, getProjects, getTasks, getTasksByProject, removeUserFromProject } from '../../services/api';
import CreateProjectForm from '../Project/CreateProject';
import CreateTaskForm from '../Task/CreateTask';
import TaskTable from '../Task/TaskTable';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [assignedUsers, setAssignedUsers] = useState([]);

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

    const handleAssignUserToProject = async (user) => {
        if (!assignedUsers.includes(user._id)) {
            await assignUserToProject(user._id, selectedProject._id);
            setAssignedUsers([...assignedUsers, user._id]);
        }
    };

    const handleRemoveUserFromProject = async (user) => {
        if (assignedUsers.includes(user._id)) {
            await removeUserFromProject(user._id, selectedProject._id);
            setAssignedUsers(assignedUsers.filter(userId => userId !== user._id));
        }
    };


    const handleProjectClick = async (project) => {
        setSelectedProject(project);
        setSelectedUser(null);
        const projectTasks = await getTasksByProject(project._id);
        setTasks(projectTasks);
        setAssignedUsers(project.assignedUsers || []);
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                <a key = {project._id} className = {styles.listMenuItemProjects} onClick = {() => handleProjectClick(project)}>
                                    <p>{project.projectName}</p>
                                </a>
                            ))}
                        </div>
                        <button className = {styles.button} type = 'button' onClick={() => setShowProjectForm(true)}>+ New Project</button>
                    </div>

                    {/* Users Elements*/}

                    {selectedProject && (
                        <div className = {styles.usersContainer}>
                            <h1 className = {styles.title}>
                                Users
                            </h1>
                            <input
                                type = "text"
                                placeholder = 'Search User...'
                                className = {styles.searchBar}
                                value = {searchTerm}
                                onChange = {(e) => setSearchTerm(e.target.value)}
                            />
                            <div className = {styles.listMenuUsers}>
                                {filteredUsers.sort((a, b) => assignedUsers.includes(b._id) - assignedUsers.includes(a._id)).map(user => (
                                    <div 
                                        key = {user._id}
                                        className = {`${styles.listMenuItemUsers} ${assignedUsers.includes(user._id) ? styles.active: ''}`}                                        
                                    >
                                        <p>{user.email}</p>
                                        <div className = {styles.userButtons}>
                                            <button className = {styles.addUserButton} onClick = {() => handleAssignUserToProject(user)}>+</button>
                                            <button className = {styles.removeUserButton} onClick = {() => handleRemoveUserFromProject(user)}>x</button>
                                        </div>                                       
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tasks Elements*/}

                    {selectedProject && (
                        <div className = {styles.tasksListContainer}>
                            <h1 className = {styles.title}>
                                Tasks
                            </h1>
                            <TaskTable tasks = {tasks} users = {users} projectId = {selectedProject._id}/>
                            <button className={styles.circleAddButton} type='button' onClick={() => setShowTaskForm(true)}>T</button>
                        </div>
                    )}                    
                </div>
            </div>
            {showProjectForm && (
                <CreateProjectForm
                    onClose = {() => setShowProjectForm(false)}
                    onCreate={(newProject) => setProjects([...projects, newProject])}
                />    
            )}
            {showTaskForm && (
                <CreateTaskForm
                    projectId = {selectedProject._id}
                    onClose = {() => setShowTaskForm(false)}
                    onCreate = {(newTask) => setTasks([...tasks, newTask])}
                />
            )}
        </div>
    );
};            

export default AdminDashboard;