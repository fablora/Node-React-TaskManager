const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/removeFromProject', userController.removeUserFromProject);

module.exports = router;