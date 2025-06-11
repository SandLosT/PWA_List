const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const PORT = 8081
const path = require('path')
const authController = require('./controllers/authController')
const homeController = require('./controllers/homeController')
const itemController = require('./controllers/itemController')
const listaController = require('./controllers/listaController')
const usuarioController = require('./controllers/usuarioController')
const { authentication } = require('./middlewares/authenticationMiddleware')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('view engine', 'ejs')

// json request format
app.use(express.json())

// cookier-parser middleware
app.use(cookieParser())

// authentication middleware
app.use(authentication)

// pages
app.use('/', homeController)
app.use('/auth', authController)
app.use('/item', itemController)
app.use('/lista', listaController)
app.use('/usuario', usuarioController)

// service worker file
app.get('/service-worker', (req, res) => {
    res.sendFile(path.join(__dirname, 'service-worker.js'))
})

app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})