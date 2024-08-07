import React, { useState, useEffect } from "react";
import styles from './CreateTaskForm.module.css';
import { createTask, assignTaskToUser, getUsersByProject } from "../../services/api";
import useProjectUsers from "../../hooks/useProjectUsers";

const CreateTaskForm = ({ projectId, onClose, onCreate }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const users = useProjectUsers(projectId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            taskTitle,
            taskDescription,
            dueDate,
            projectId, 
            assignedTo
        };
        console.log('Creating task with data:', taskData);

        try {
            const newTask = await createTask(taskData);
            if (assignedTo) {
                await assignTaskToUser(assignedTo, newTask._id)
            }
            onCreate(newTask);
            onClose();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className = {styles.modal}>
            <div className = {styles.modalContent}>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <h2>New Task</h2>
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
                        <label>Assign To</label>
                        <select value = {assignedTo} onChange = {(e) => setAssignedTo(e.target.value)}>
                            <option value = "">Select User</option>
                            {users.map(user => (
                                <option key = {user._id} value = {user._id}>{user.email}</option>
                            ))}
                        </select>
                    </div>
                    <button className = {styles.buttonCreate} type = "submit">Add</button>
                    <button className = {styles.buttonCancel} type = "button" onClick = {onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskForm;



