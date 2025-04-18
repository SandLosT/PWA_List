var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('lista/index.html')
})

router.get('/criar', (req, res) => {
    res.render('lista/criar.html')
})

router.get('/editar', (req, res) => {
    res.render('lista/editar.html')
})

router.get('/visualizar', (req, res) => {
    res.render('lista/visualizar.html')
})

module.exports = router