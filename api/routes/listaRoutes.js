const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');

router.get('/', listaController.listar);
router.get('/:id', listaController.visualizar);
router.post('/', listaController.criar);
router.put('/:id', listaController.atualizar);
router.delete('/:id', listaController.excluir);

module.exports = router;
