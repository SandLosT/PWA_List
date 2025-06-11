const express = require('express')
const router = express.Router()
const settings = require('../settings.json')
const API_BASIC_ADDRESS = settings.servers['PWA_List.API'].address.basicAddress

router.get('/', (req, res) => {
    res.render('usuario/index')
})

router.get('/editar', (req, res) => {
    res.render('usuario/editar')
})

module.exports = router