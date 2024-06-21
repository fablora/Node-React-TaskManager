import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../components/Home';
import Project from '../components/Project';
import Task from  '../components/Task'
import Register from '../components/Register';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard/Dashboard';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path = '/' element = {<Home />} />
                <Route path = '/projects/:id' element = {<Project />} />
                <Route path = '/register' element = {<Register />} />
                <Route path = '/login' element = {<Login />} />
                <Route path = '/dashboard' element = {<Dashboard/>} /> {/* element = {<ProtectedRoute element = {Dashboard} />} ---- element = {<Dashboard/>} */}
                <Route path = '/admin' element = {<AdminDashboard/>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;