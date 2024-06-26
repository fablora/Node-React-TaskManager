import React, { useState, useEffect } from "react";
import styles from './EditTaskForm.module.css';
import { getTaskById, updateTask, assignTaskToUser, getUsersByProject } from "../../services/api";

const EditTaskForm = ({ taskId, projectId, onClose, onEdit }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [taskStatus, setTaskStatus] = useState('To Do');
    const [users, setUsers] = useState([]);
    const [assignedTo, setAssignedTo] = useState('');

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const taskData = await getTaskById(taskId);
                setTaskTitle(taskData.taskTitle);
                setTaskDescription(taskData.taskDescription);
                setDueDate(taskData.dueDate.slice(0, 10));
                setAssignedTo(taskData.assignedTo);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const usersData =  await getUsersByProject(projectId);
                console.log('Fetched users:', usersData);
                setUsers(usersData);
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        };
        fetchTask();
        fetchUsers();
    }, [taskId, projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            taskTitle,
            taskDescription,
            dueDate,
            taskStatus,
            projectId, 
            assignedTo
        };

        try {
            const updatedTask = await updateTask(taskId, taskData);
            if (assignedTo) {
                await assignTaskToUser(assignedTo, updatedTask._id)
            }
            onEdit(updatedTask);
            onClose();
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className = {styles.modal}>
            <div className = {styles.modalContent}>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <h2>Edit Task</h2>
                        <label>Task Title</label>
                        <input
                            type = "text"
                            value = {taskTitle}
                            onChange = {(e) => setTaskTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Task Description</label>
                        <textarea
                            value = {taskDescription}
                            onChange = {(e) => setTaskDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input
                            type = 'date'
                            value = {dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Task Status</label>
                        <select value = {taskStatus} onChange = {(e) => setTaskStatus(e.target.value)}>
                            <option value = "To Do">To Do</option>
                            <option value = "In Progress">In Progress</option>
                            <option value = "Completed">Completed</option>
                        </select>
                    </div>
                    <div>
                        <label>Assign To</label>
                        <select value = {assignedTo} onChange = {(e) => setAssignedTo(e.target.value)}>
                            <option value = "">Select User</option>
                            {users.map(user => (
                                <option key = {user._id} value = {user._id}>{user.email}</option>
                            ))}
                        </select>
                    </div>
                    <button className = {styles.buttonEdit} type = "submit">Edit</button>
                    <button className = {styles.buttonCancel} type = "button" onClick = {onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default EditTaskForm;