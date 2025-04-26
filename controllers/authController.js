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
    res.redirect("/auth/login")
})

router.post('/login', (req, res) => {
    res.redirect('/')
})

module.exports = router