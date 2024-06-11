import React, { useState } from "react";
import { createProject } from "../services/api";

const CreateProject = () => {
    const [projectName, setProjectName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject ={
            projectName,
            projectTimeline: {
                start: startDate,
                end: endDate
            }
        };

        try {
            const response = await createProject(newProject);
            console.log('Project created successfully:', response);
        } catch (error) {
            console.error('An error occured while creating project:', error);
        }
    };

    return (
        <div className = "wrapper">
            <div className = "form-box new-project">
                <form onSubmit = {handleSubmit}>
                    <h1>New Project</h1>
                    <div className = "input-box">
                        <input type = "text"
                        placeholder = "Project Name" 
                        value = {projectName} 
                        onChange = {(e) => setProjectName(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <label>Start Date</label>
                        <input type = "date"                        
                        value = {startDate} 
                        onChange = {(e) => setStartDate(e.target.value)} required />
                    </div>
                    <div className = "input-box">
                        <label>End Date</label>
                        <input type = "date"                        
                        value = {endDate} 
                        onChange = {(e) => setEndDate(e.target.value)} required />
                    </div>
                    <button type = "submit">Create Project</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProject;