const express = require('express');
const projectController = require('../controllers/projectController');
const userController = require('../controllers/userController');
const requireAuth = require('../middleware/authMiddleware');

const router = express.Router();
router.use(requireAuth);

router.get('/user/:userId', projectController.getProjectsByUser);

module.exports = router;