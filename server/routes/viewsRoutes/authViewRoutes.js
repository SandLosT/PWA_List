// routes/views/authViewRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/authController');

// GET - renderiza views
router.get('/login', AuthController.showLogin);
router.get('/register', AuthController.showRegister);

module.exports = router;