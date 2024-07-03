import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const useUserId = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error('Invalid token: ', error);
                setUserId(null);
            }
        }
    }, []);

    return userId;

};

export default useUserId;