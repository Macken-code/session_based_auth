const express = require('express');
const roleController = require('../controllers/role.controller');

const router = express.Router();

// create role
router.post('/', roleController.save);

// List all role
router.get('/', roleController.findAll);

module.exports = router;