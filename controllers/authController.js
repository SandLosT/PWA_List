var express = require('express')
var router = express.Router()
var path = require('path')

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

router.post('/register', (req, res) => {
    // cadastrar o usuário
    var body = req.body
    console.log("request body:")
    console.log(body)

    res.json(true)
})

module.exports = router