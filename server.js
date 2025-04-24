var express = require('express')
var app = express()
var path = require('path')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('view engine', 'ejs')

// controllers
var authController = require('./controllers/authController')
var homeController = require('./controllers/homeController')
var itemController = require('./controllers/itemController')
var listaController = require('./controllers/listaController')
var usuarioController = require('./controllers/usuarioController')

app.use('/auth', authController)
app.use('/', homeController)
app.use('/item', itemController)
app.use('/lista', listaController)
app.use('/usuario', usuarioController)

// service worker file
app.get('/service-worker', (req, res) => {
    res.sendFile(path.join(__dirname, 'service-worker.js'))
})

const PORT = 8081
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})