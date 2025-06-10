const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.get('/:id', usuarioController.findById);
router.get('/', usuarioController.findAll);
router.get('/email/:email', usuarioController.findByEmail);
router.put('/:id', usuarioController.update);
router.delete('/:id', usuarioController.delete);
router.get('/exists/email/:email', usuarioController.existsByEmail);
router.get('/exists/username/:username', usuarioController.existsByUsername);

module.exports = router;
