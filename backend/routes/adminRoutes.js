const express = require('express');
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const requireAdmin = require('../middleware/adminAuthMiddleware');

const router = express.Router();

router.use(requireAdmin);

// Users Routes

router.get('/users', userController.getAllUsers);
router.post('/users/removeFromProject', userController.removeUserFromProject);

// Projects Routes

router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.createProject);
router.post('/projects/assign', userController.assignUserToProject);
router.get('/projects/:projectId/users', userController.getUsersByProject);
router.get('/projects/:id', projectController.getProjectById);

// Tasks Routes

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.post('/tasks/assign', userController.assignTaskToUser)
router.get('/tasks/project/:projectId', taskController.getTasksByProject);
router.put('/tasks/:taskId', taskController.updateTask);
router.post('/tasks/deleteTask', taskController.deleteTask);
router.get('/tasks/:taskId', taskController.getTaskById);

module.exports = router;