// routes/api/authRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/authController');

// POST - JSON APIs
router.post('/login', AuthController.login);       // Retorna JSON
router.post('/register', AuthController.registrar); // Retorna JSON


module.exports = router;