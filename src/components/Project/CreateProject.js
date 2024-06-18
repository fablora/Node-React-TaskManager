import React, { useState } from "react";
import styles from './CreateProjectForm.module.css';
import { createProject } from "../../services/api";

const CreateProjectForm = ({ onClose, onCreate }) => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData ={
            projectName,
            projectTimeline: {
                start: new Date (startDate),
                end: new Date (endDate)
            }
        };

        try {
            const newProject = await createProject(projectData);
            onCreate(newProject);
            onClose();
        } catch (error) {
            console.error('An error occured while creating project:', error);
        }
    };

    return (
        <div className = {styles.modal}>
            <div className = {styles.modalContent}>
                <h2>Create New Project</h2>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label>Project Name:</label>
                        <input
                            type = "text"
                            value = {projectName}
                            onChange = {(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Start Date</label>
                        <input
                            type = "date"
                            value = {startDate}
                            onChange = {(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                    <label>End Date</label>
                        <input
                            type = "date"
                            value = {endDate}
                            onChange = {(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <button className = {styles.buttonCreate} type = "submit">Create</button>
                    <button className = {styles.buttonCancel} type = "button" onClick = {onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectForm;