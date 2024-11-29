const express = require('express');
const { getAllUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// This router for getting all users and their information from the database
router.get('/', getAllUsers);

// This router for creating new users in the database
router.post('/', createUser);

module.exports = router;
