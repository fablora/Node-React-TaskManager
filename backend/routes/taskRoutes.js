const express = require('express');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/user/:userId/project/:projectId', taskController.getTasksByUserAndProject);


module.exports = router;