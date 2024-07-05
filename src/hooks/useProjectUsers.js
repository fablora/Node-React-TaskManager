import { useEffect, useState } from "react";
import { getUsersByProject } from "../services/api";

const useProjectUsers = (projectId) => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const fetchusers = async () => {
            try {
                const userData = await getUsersByProject(projectId);
                setUsers(userData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        if (projectId) {
            fetchusers();
        }
    }, [projectId]);

    return users;
}

export default useProjectUsers;