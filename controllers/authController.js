var express = require('express')
var router = express.Router()

router.get('/login', (req, res) => {
    res.render('auth/login', {
        isAuthenticated: false
    })
})

router.get('/register', (req, res) => {
    res.render('auth/register', {
        isAuthenticated: false
    })
})

router.get('/logout', (req, res) => {
    // destruir a sessão do usuário
})

module.exports = router