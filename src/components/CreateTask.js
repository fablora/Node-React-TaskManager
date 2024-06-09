import React, { useState, useEffect } from "react";
import { createTask, getProjects } from "../services/api";

const CreateTask = () => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState('To Do');
    const [assignedTo, setAssignedTo] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            taskTitle,
            taskDescription,
            taskStatus,
            assignedTo,
            dueDate,
            projectId,
        };

        try {
            const response = await createTask(newTask);
            console.log('New task added!', response);
        } catch (error) {
            console.error('An error occured while creating task', error);
        }
    };

    return (
        <div className = "wrapper">
            <div className = "form-box new-task">
                <form onSubmit = {handleSubmit}>
                    <h1>New Task</h1>
                    <div className = "input-box">
                        <input type = "text"
                        placeholder = "Task Title" 
                        value = {taskTitle} 
                        onChange = {(e) => setTaskTitle(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <input type = "text"
                        placeholder = "Task Description" 
                        value = {taskDescription} 
                        onChange = {(e) => setTaskDescription(e.target.value)} required />
                    </div>
                    <div>
                        <label>Select Task Status</label>
                        <select
                            value = {taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}> 
                            <option value = "To Do">To Do</option>
                            <option value = "In Progress">In Progress</option>  
                            <option value = "Completed">Completed</option>                             
                        </select>
                    </div>
                    <div className = "input-box">
                        <input type = "text"
                        placeholder = "Assigned To" 
                        value = {assignedTo} 
                        onChange = {(e) => setAssignedTo(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <label>Due Date:</label>
                        <input type = "date"
                        value = {dueDate} 
                        onChange = {(e) => setDueDate(e.target.value)} required />
                    </div>
                    <div>
                        <select
                            value = {projectId}
                            onChange = {(e) => setProjectId(e.target.value)} required>
                            <option value = ""> Select a project</option>
                            {projects.map((project) => (
                                <option key = {project._id} value = {project._id}>
                                    {project.projectName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type = "submit">Create Task</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;