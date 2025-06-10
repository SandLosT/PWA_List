const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.get('/lista/:listaId', itemController.findByList);
router.post('/lista/:listaId', itemController.create);
router.get('/:id', itemController.findById);
router.put('/:id', itemController.update);
router.delete('/:id', itemController.delete);

module.exports = router;
