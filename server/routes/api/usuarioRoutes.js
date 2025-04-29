const express = require('express');
const router = express.Router();
const usuarioController = require('../../services/usuarioService');

// Rota padrão: /api/usuarios
router.get('/', usuarioController.listar);
router.post('/registrar', usuarioController.registrar);
router.post('/login', usuarioController.login);

module.exports = router;
