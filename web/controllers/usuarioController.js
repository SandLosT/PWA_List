const express = require('express')
const router = express.Router()
const settings = require('../settings.json')
const API_BASIC_ADDRESS = settings.servers['PWA_List.API'].address.basicAddress

router.get('/', async (req, res) => {
    const token = req.cookies.token
    
    const response = await fetch(API_BASIC_ADDRESS + '/api/usuarios/' + req.usuario.id, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'get'
    })

    if (!response.ok) {
        return res.redirect('/lista')
    }

    const usuario = await response.json()

    res.render('usuario/index', {
        isAuthenticated: req.isAuthenticated,
        usuario: usuario
    })
})

router.put('/editar', async (req, res) => {
    const token = req.cookies.token
    const { nome, username } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/usuarios/' + req.usuario.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            nome: nome,
            username: username
        }),
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.status(200).send()
})

router.put('/alterar-email', async (req, res) => {
    const token = req.cookies.token
    const { email } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/usuarios/' + req.usuario.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            email: email
        }),
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0),
        maxAge: 0
    });

    res.status(200).send()
})

router.put('/alterar-senha', async (req, res) => {
    const token = req.cookies.token
    const { senha } = req.body

    const response = await fetch(API_BASIC_ADDRESS + '/api/usuarios/' + req.usuario.id, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        method: 'put',
        body: JSON.stringify({
            senha: senha
        }),
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0),
        maxAge: 0
    });

    res.status(200).send()
})

router.delete('/excluir', async (req, res) => {
    const token = req.cookies.token
    
     const response = await fetch(API_BASIC_ADDRESS + '/api/usuarios/' + req.usuario.id, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'delete'
    })

    if (!response.ok) {
        return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
    }

    res.cookie('token', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0),
        maxAge: 0
    });

    res.status(204).send()
})

module.exports = router