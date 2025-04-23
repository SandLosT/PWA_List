const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Rota padrão: /api/itens
router.get('/lista/:listaId', itemController.listarPorLista);
router.post('/lista/:listaId', itemController.adicionar);
router.put('/:id', itemController.atualizar);
router.delete('/:id', itemController.excluir);

module.exports = router;
