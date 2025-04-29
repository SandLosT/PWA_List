const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

// GET rotas de páginas
router.get('/login', AuthController.showLogin);
router.get('/register', AuthController.showRegister);

// GET ação de logout
router.get('/logout', AuthController.logout);

// POST ações
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

module.exports = router;
