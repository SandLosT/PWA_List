const express = require('express');
const router = express.Router();
const listaController = require('../controllers/listaController');

router.get('/usuario', listaController.findByUser);
router.get('/:id', listaController.findById);
router.get('/', listaController.findAll);
router.post('/', listaController.create);
router.put('/:id', listaController.update);
router.delete('/:id', listaController.delete);

module.exports = router;
