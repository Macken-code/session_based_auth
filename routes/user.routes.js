const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// signup user
router.post('/', userController.save);

// get connected user
router.get('/me', userController.getMe)

module.exports = router;