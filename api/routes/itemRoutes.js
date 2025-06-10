const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/lista/:listaId', itemController.findByList);
router.post('/lista/:listaId', itemController.create);
router.get('/:itemId/lista/:listaId', itemController.findById);
router.put('/:itemId/lista/:listaId', itemController.update);
router.delete('/:itemId/lista/:listaId', itemController.delete);

module.exports = router;