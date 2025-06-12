const express = require('express')
const router = express.Router()
const settings = require('../settings.json')
const API_BASIC_ADDRESS = settings.servers['PWA_List.API'].address.basicAddress

router.get('/login', (req, res) => {
    res.render('auth/login', {
        isAuthenticated: req.isAuthenticated
    })
})

router.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body

        const response = await fetch(API_BASIC_ADDRESS + '/api/auth/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })
        })

        if (!response.ok) {
            if (response.status == 401) {
                return res.status(401).json({ error: 'Credenciais inválidas!' })
            } else {
                return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
            }
        }

        const token = await response.json()

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000
        });

        res.status(200).send()
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
})

router.get('/register', (req, res) => {
    res.render('auth/register', {
        isAuthenticated: req.isAuthenticated
    })
})

router.post('/register', async (req, res) => {
    try {
        const { nome, email, username, senha } = req.body

        const response = await fetch(API_BASIC_ADDRESS + '/api/auth/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                username: username,
                senha: senha
            })
        })

        if (!response.ok) {
            return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
        }

        res.status(201).send()
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
})

router.get('/existe/email/:email', async (req, res) => {
    try {
        const email = req.params.email

        const response = await fetch(API_BASIC_ADDRESS + '/api/auth/exists/email/' + email)
        
        if (!response.ok) {
            return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
        }
        
        var existe = await response.json()
        
        res.status(200).json(existe)
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
})

router.get('/existe/username/:username', async (req, res) => {
    try {
        const username = req.params.username

        const response = await fetch(API_BASIC_ADDRESS + '/api/auth/exists/username/' + username)
        
        if (!response.ok) {
            return res.status(response.status).json({ error: `Erro(${response.status}): ${response.statusText}` })
        }
        
        var existe = await response.json()
        
        res.status(200).json(existe)
    } catch (error) {
        res.status(500).json({ error: error?.message })
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        expires: new Date(0),
        maxAge: 0
    });
    res.redirect('/auth/login')
})

module.exports = router