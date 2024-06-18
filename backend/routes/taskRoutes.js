const express = require('express');
const taskController = require('../controllers/taskController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.post('/assign', userController.assignTaskToUser)

module.exports = router;