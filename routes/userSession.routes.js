const express = require('express');
const userSessionController = require('../controllers/userSession.controller');

const router = express.Router();

// List all sessions
router.get('/', userSessionController.findAll);

module.exports = router;