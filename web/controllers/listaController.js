const express = require('express')
const router = express.Router()
const settings = require('../settings.json')
const API_BASIC_ADDRESS = settings.servers['PWA_List.API'].address.basicAddress

router.get('/:id', async (req, res) => {
    const token = req.cookies.token
    
    const response = await fetch(API_BASIC_ADDRESS + '/api/listas/' + req.params.id, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return res.redirect('/lista')
    }

    const lista = await response.json()
    
    res.render('lista/visualizar', {
        isAuthenticated: req.isAuthenticated,
        lista: {
            itens: [],
            ...lista
        }
    })
})

router.get('/pesquisar/id/:id', async (req, res) => {
    const token = req.cookies.token
    
    const response = await fetch(API_BASIC_ADDRESS + '/api/listas/' + req.params.id, {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    const lista = await response.json()

    res.status(200).json(lista)
})

router.get('/', async (req, res) => {
    const token = req.cookies.token

    const response = await fetch(API_BASIC_ADDRESS + '/api/listas/usuario', {
        method: 'get',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return res.redirect('/auth/login')
    }

    const listas = await response.json()

    res.render('lista/index', {
        isAuthenticated: req.isAuthenticated,
        listas: listas.map(lista => ({
            itens: [],
            ...lista
        }))
    })
})

router.post('/criar', async (req, res) => {
    const token = req.cookies.token
    const { nome } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/listas', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({
            nome: nome
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(201).send()
})

router.put('/editar/:id', async (req, res) => {
    const token = req.cookies.token
    const { nome } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/listas/' + req.params.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'put',
        body: JSON.stringify({
            nome: nome
        })
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(200).send()
})

router.delete('/excluir/:id', async (req, res) => {
    const token = req.cookies.token

    console.log({token})
    console.log({listaId: req.params.id})

    const response = await fetch(API_BASIC_ADDRESS + '/api/listas/' + req.params.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        method: 'delete'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(204).send()
})

module.exports = router