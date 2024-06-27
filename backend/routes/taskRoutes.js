const express = require('express');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.post('/assign', userController.assignTaskToUser)
router.get('/project/:projectId', taskController.getTasksByProject);
router.get('/user/:userId/project/:projectId', taskController.getTasksByUserAndProject);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.post('/deleteTask', taskController.deleteTask);

module.exports = router;