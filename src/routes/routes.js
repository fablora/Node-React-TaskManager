import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element = {<Login />} />
                <Route path = '/register' element = {<Register />} />
                <Route path = '/login' element = {<Login />} />
                <Route element={<ProtectedRoute />}>                    
                    <Route path = '/admin' element = {<AdminDashboard/>} />
                    <Route path = '/dashboard' element = {<Dashboard/>} />
                </Route>
            </Routes>
        </Router>
    );
}

export default AppRoutes;