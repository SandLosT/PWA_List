// routes/views/authViewRoutes.js

const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');

// GET - renderiza views
router.get('/login', AuthController.showLogin);     // Retorna página
router.get('/register', AuthController.showRegister); // Retorna página
router.get('/logout', AuthController.logout);      // Pode retornar JSON

module.exports = router;