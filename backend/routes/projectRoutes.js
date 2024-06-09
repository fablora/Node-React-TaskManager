const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router.post('/projects', projectController.createProject);
router.get('/projects/:id', projectController.getProjectById);

module.exports = router;