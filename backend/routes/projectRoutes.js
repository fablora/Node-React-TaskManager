const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.get('/projects/:id', projectController.getProjectById);

module.exports = router;