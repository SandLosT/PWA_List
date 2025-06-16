const express = require('express')
const router = express.Router()
const settings = require('../settings.json')
const API_BASIC_ADDRESS = settings.servers['PWA_List.API'].address.basicAddress

router.get('/pesquisar/:itemId/lista/:listaId', async (req, res) => {
    const token = req.cookies.token
    
    const response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'get'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    const item = await response.json()

    res.json(item)
})

router.post('/criar/:listaId', async (req, res) => {
    const token = req.cookies.token
    const { nome, quantidade, preco } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/itens/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
            nome: nome,
            quantidade: quantidade,
            preco: preco
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(201).send()
})

router.put('/editar/:itemId/lista/:listaId', async (req, res) => {
    const token = req.cookies.token
    const { nome, quantidade, preco } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            nome: nome,
            quantidade: quantidade,
            preco: preco
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(200).send()
})

router.put('/diminuir/:itemId/lista/:listaId', async (req, res) => {
    const token = req.cookies.token

    var response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'get'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    const item = await response.json()

    if ((item.quantidade - 1) < 0) {
        return res.status(200).send()
    }

    response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            quantidade: parseInt(item.quantidade) - 1
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(200).send()
})

router.put('/aumentar/:itemId/lista/:listaId', async (req, res) => {
    const token = req.cookies.token

    var response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'get'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    const item = await response.json()

    response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            quantidade: parseInt(item.quantidade) + 1
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(200).send()
})

router.delete('/excluir/:itemId/lista/:listaId', async (req, res) => {
    const token = req.cookies.token

    const response = await fetch(API_BASIC_ADDRESS + '/api/itens/' + req.params.itemId + '/lista/' + req.params.listaId, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'delete'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(204).send()
})

module.exports = router