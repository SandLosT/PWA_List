const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('usuario/index'));

router.get('/editar', (req, res) => res.render('usuario/editar'));

router.get('/email/:email', (req, res) => {
  console.log(`email = ${req.params.email}`);
  res.json(false);
});

router.get('/username/:username', (req, res) => {
  console.log(`username = ${req.params.username}`);
  res.json(false);
});

module.exports = router;
