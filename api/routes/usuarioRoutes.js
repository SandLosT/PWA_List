const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const AuthController = require('../controllers/authController');

router.get('/', usuarioController.listar);
router.post('/registrar', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
