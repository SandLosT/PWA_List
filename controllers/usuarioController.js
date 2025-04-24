var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('usuario/index')
})

router.get('/editar', (req, res) => {
    res.render('usuario/editar')
})

module.exports = router