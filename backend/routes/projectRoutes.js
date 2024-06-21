const express = require('express');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.get('/projects/:id', projectController.getProjectById);
router.post('/assign', userController.assignUserToProject);
router.get('/:projectId/users', userController.getUsersByProject);

module.exports = router;