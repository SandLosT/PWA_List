var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('usuario/index')
})

router.get('/editar', (req, res) => {
    res.render('usuario/editar')
})

router.get('/email/:email', (req, res) => {
    // verificar se o e-mail já existe
    console.log(`email = ${req.params.email}`)

    res.json(false)
})

router.get('/username/:username', (req, res) => {
    // verificar se o nome de usuário já existe
    console.log(`username = ${req.params.username}`)
    res.json(false)
})

module.exports = router