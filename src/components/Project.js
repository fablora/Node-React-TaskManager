import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${id}`)
            .then(response => setProject(response.data));
    }, [id]);

    if (!project) return <div>Loading...</div>;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <h2>Tasks</h2>
            {project.task.map(task => (
                <div key={task._id}>
                    <h3>{task.title}</h3>
                </div>
            ))}
        </div>
    );
}

export default Project;