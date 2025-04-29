// routes/api/authRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

// POST - JSON APIs
router.post('/login', AuthController.login);       // Retorna JSON
router.post('/register', AuthController.register); // Retorna JSON


module.exports = router;