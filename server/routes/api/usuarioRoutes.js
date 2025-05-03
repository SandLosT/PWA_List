const express = require('express');
const router = express.Router();
const usuarioController = require('../../controllers/usuarioController');
const AuthController = require('../../controllers/authController');


// Rota padrão: /api/usuarios
router.get('/', usuarioController.listar);
router.post('/registrar', AuthController.registrar);
router.post('/login', AuthController.login);

module.exports = router;
