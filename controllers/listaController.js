var express = require('express')
var router = express.Router()
var db = require('../test/inMemoryDb')

var ID_SEQUENCIAL = 0

// pagina: Visualizar Lista
router.get('/:id', (req, res) => {
    var lista = db.listas.find(lista => lista.id == req.params.id)

    if (lista == null || lista == undefined) {
        res.redirect("/lista")
        return
    }

    res.render('lista/visualizar', lista)
})

router.get('/pesquisarPorId/:id', (req, res) => {
    var lista = db.listas.find(lista => lista.id == req.params.id)
    res.json(lista)
})

// pagina: Minhas Listas
router.get('/', (req, res) => {
    console.log(db.listas)
    res.render('lista/index', {
        listas: db.listas
    })
})

router.post('/criar', (req, res) => {
    var body = req.body

    db.listas.push({
        id: ++ID_SEQUENCIAL,
        titulo: body.titulo,
        itens: []
    })

    console.log(db.listas)

    res.status(201).send()
})

router.put('/editar/:id', (req, res) => {
    if (!req.body) {
        res.status(400).json({
            titulo: 'Dados inválidos',
            mensagem: 'A requisição deve ter corpo!',
            timespan: new Date().getTime()
        })
        return
    }

    var index = db.listas.findIndex(lista => lista.id == req.params.id)

    if (index == -1) {
        res.status(404).json({
            titulo: "Não encontrado",
            mensagem: `A lista com id ${req.params.id} não existe!`,
            timespan: new Date().getTime()
        })
        return
    }
    
    var lista = db.listas.at(index)
    lista.titulo = req.body.titulo

    db.listas[index] = lista

    res.status(200).send()
})

router.delete('/excluir/:id', (req, res) => {
    var index = db.listas.findIndex(lista => lista.id == req.params.id)

    if (index == -1) {
        res.status(404).json({
            titulo: "Não encontrado",
            mensagem: `A lista com id ${req.params.id} não existe!`,
            timespan: new Date().getTime()
        })
        return
    }

    db.listas.splice(index, 1)

    res.status(204).send()
})

module.exports = router