var express = require('express')
var app = express()
var path = require('path')
var ejs = require('ejs')

// static files
app.use(express.static(path.join(__dirname, 'public')))

// view engine
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public/pages'))
app.engine('html', ejs.renderFile)

// rotas
// falta inserir a rota das outras sub-pastas que estão dentro da pasta "pages"
var homeController = require('./controllers/homeController')
var listaController = require('./controllers/listaController')

app.use('/', homeController)
app.use('/lista', listaController)

const PORT = 8080
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})