var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    res.render('home/index.html')
})

module.exports = router