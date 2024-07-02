import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    let user = null;

    if (token) {
        try {
            user = jwtDecode(token);
            console.log('Decoded User:', user);
        } catch (e) {
            console.error('Invalid token:', e);
            return <Navigate to="/login" replace />;
        }

        if (user.role === 'admin') {
            console.log('Admin user. Allowing access to admin routes.');
            return <Outlet />;
        } else {
            console.log('Non-admin user. Redirecting to dashboard... User Role:', user.role);
            return <Outlet />;
        }
    } else {
        console.log('No token found. Redirecting to login.');
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
