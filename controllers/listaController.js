var express = require('express')
var router = express.Router()

var id = 3

var listas = [
    {
        id: 1,
        titulo: "Lista da farmácia",
        itens: [
            {
                id: 1,
                nome: "Dipirona 1g",
                quantidade: 1,
                preco: 7.99
            },
            {
                id: 2,
                nome: "Paracetamol 750mg",
                quantidade: 1,
                preco: 14.99
            },
            {
                id: 3,
                nome: "Ibuprofeno 600mg",
                quantidade: 1,
                preco: 19.99
            }
        ]
    },
    {
        id: 2,
        titulo: "Compras da semana",
        itens: [
            {
                id: 4,
                nome: "Leite 1L",
                quantidade: 3,
                preco: 5.99
            },
            {
                id: 5,
                nome: "Pão de forma",
                quantidade: 2,
                preco: 6.99
            },
            {
                id: 6,
                nome: "Shampoo",
                quantidade: 1,
                preco: 24.99
            },
            {
                id: 7,
                nome: "Ovo",
                quantidade: 1,
                preco: 19.99
            }
        ]
    },
    {
        id: 3,
        titulo: "Lista de materiais",
        itens: [
            {
                id: 8,
                nome: "Caderno",
                quantidade: 1,
                preco: 29.99
            },
            {
                id: 9,
                nome: "Caneta",
                quantidade: 10,
                preco: 9.99
            },
            {
                id: 10,
                nome: "Mochila",
                quantidade: 1,
                preco: 139.99
            },
            {
                id: 11,
                nome: "Estojo de lápis",
                quantidade: 1,
                preco: 19.99
            },
            {
                id: 12,
                nome: "Cola",
                quantidade: 1,
                preco: 9.99
            }
        ]
    }
]

router.get('/criar', (req, res) => {
    res.render('lista/criar')
})

router.get('/editar', (req, res) => {
    res.render('lista/editar')
})

router.get('/:id', (req, res) => {
    var lista = listas.find(lista => lista.id == req.params.id)

    if (lista == null || lista == undefined) {
        res.redirect("/lista")
    }

    res.render('lista/visualizar', lista)
})

router.get('/', (req, res) => {
    res.render('lista/index', {
        listas: listas
    })
})

router.post('/criar', (req, res) => {
    var lista = req.body

    console.log("criando lista: " + lista)

    listas.push({
        id: ++id,
        titulo: lista.titulo,
        itens: []
    })

    res.status(201)
})

module.exports = router