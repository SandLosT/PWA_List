var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('home/index', {
        isAuthenticated: true,
        usuario: {
            nome: "Douglas Lima",
            username: "douglaslima"
        }
    })
})

module.exports = router