const express = require('express');
const router = express.Router();

router.get('/criar', (req, res) => res.render('lista/criar'));
router.get('/editar', (req, res) => res.render('lista/editar'));
router.get('/:id', (req, res) => res.render('lista/visualizar', { id: req.params.id }));
router.get('/', (req, res) => res.render('lista/index'));

module.exports = router;
