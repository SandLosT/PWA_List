var express = require('express')
var router = express.Router()
var db = require('../test/inMemoryDb')

var ID_SEQUENCIAL = 12

router.get('/criar', (req, res) => {

    if (!req.query.listaId) {
        res.redirect("/lista")
        return
    }

    var lista = db.listas.find(lista => lista.id == req.query.listaId)

    if (!lista) {
        res.redirect("/lista")
        return
    }

    res.render('item/criar', {
        lista: lista
    })
})

router.get('/editar/:id', (req, res) => {
    var lista = db.listas.find(lista => lista.itens.some(item => item.id == req.params.id))

    if (!lista) {
        if (!req.body) {
            res.redirect('/lista/' + lista.id)
            return
        }
    }

    var item = lista.itens.find(item => item.id == req.params.id)

    res.render('item/editar', item)
})

router.post('/criar', (req, res) => {
    if (!req.body) {
        res.status(400).json({
            titulo: 'Dados inválidos',
            mensagem: 'A requisição deve ter corpo!',
            timespan: new Date().getTime()
        })
        return
    }

    var body = req.body

    var item = {
        id: ++ID_SEQUENCIAL,
        nome: body.nome,
        quantidade: parseInt(body.quantidade),
        preco: parseFloat(body.preco),
        listaId: body.listaId
    }

    var index = db.listas.findIndex(lista => lista.id == body.listaId)

    if (index == -1) {
        res.status(404).json({
            titulo: "Não encontrado",
            mensagem: `A lista com id ${body.listaId} não existe!`,
            timespan: new Date().getTime()
        })
        return
    }

    var lista = db.listas.at(index)
    lista.itens.push(item)

    db.listas[index] = lista

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

    var body = req.body

    var listaIndex = db.listas.findIndex(lista => lista.itens.some(item => item.id == req.params.id))

    if (listaIndex == -1) {
        res.status(404).json({
            titulo: "Não encontrado",
            mensagem: `A lista com id ${body.listaId} não existe!`,
            timespan: new Date().getTime()
        })
        return
    }

    var lista = db.listas.at(listaIndex)

    var itemIndex = lista.itens.findIndex(item => item.id == req.params.id)
    var item = lista.itens.at(itemIndex)
    item.nome = body.nome
    item.quantidade = parseInt(body.quantidade)
    item.preco = parseFloat(body.preco)

    lista.itens[itemIndex] = item
    db.listas[listaIndex] = lista

    res.status(200).send()
})

router.post('/diminuir/:id', (req, res) => {
    var listaIndex = db.listas.findIndex(lista => lista.itens.some(item => item.id == req.params.id))

    if (listaIndex == -1) {
        if (!req.body) {
            res.status(404).json({
                titulo: "Não encontrado",
                mensagem: `O item com id ${req.params.id} não existe!`,
                timespan: new Date().getTime()
            })
            return
        }
    }

    var lista = db.listas.at(listaIndex)

    var itemIndex = lista.itens.findIndex(item => item.id == req.params.id)
    var item = lista.itens.at(itemIndex)

    if ((item.quantidade - 1) < 0) {
        item.quantidade = 0
    } else {
        item.quantidade = parseInt(item.quantidade) - 1
    }

    lista.itens[itemIndex] = item

    db.listas[listaIndex] = lista

    res.status(200).json({
        quantidade: item.quantidade
    })
})

router.post('/aumentar/:id', (req, res) => {
    var listaIndex = db.listas.findIndex(lista => lista.itens.some(item => item.id == req.params.id))

    if (listaIndex == -1) {
        if (!req.body) {
            res.status(404).json({
                titulo: "Não encontrado",
                mensagem: `O item com id ${req.params.id} não existe!`,
                timespan: new Date().getTime()
            })
            return
        }
    }

    var lista = db.listas.at(listaIndex)

    var itemIndex = lista.itens.findIndex(item => item.id == req.params.id)
    var item = lista.itens.at(itemIndex)

    item.quantidade = parseInt(item.quantidade) + 1

    lista.itens[itemIndex] = item

    db.listas[listaIndex] = lista

    res.status(200).json({
        quantidade: item.quantidade
    })
})

router.delete('/excluir/:id', (req, res) => {
    var listaIndex = db.listas.findIndex(lista => lista.itens.some(item => item.id == req.params.id))

    if (listaIndex == -1) {
        if (!req.body) {
            res.status(404).json({
                titulo: "Não encontrado",
                mensagem: `O item com id ${req.params.id} não existe!`,
                timespan: new Date().getTime()
            })
            return
        }
    }

    var lista = db.listas.at(listaIndex)

    var itemIndex = lista.itens.findIndex(item => item.id == req.params.id)
    lista.itens.splice(itemIndex, 1)

    db.listas[listaIndex] = lista

    res.status(204).send()
})

module.exports = router