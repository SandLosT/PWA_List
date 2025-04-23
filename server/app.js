var express = require('express')
var app = express()
var path = require('path')


const listaRoutes = require('./routes/listaRoutes.js');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para JSON
app.use(express.json());
// static files
const clientPath = path.join(__dirname, '..', 'client');

app.use(express.json());

// 🌐 Rotas da API REST
app.use('/api/listas', listaRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/usuarios', usuarioRoutes);
// mapeamento das rotas
// 🔗 Importação das rotas da API

// Servir arquivos estáticos da pasta client
app.use(express.static(clientPath));


//home
  app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'home', 'index.html'));
  });
//crud de itens
  app.get('/item', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'item', 'index.html'));
  });
  app.get('/item/criar', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'item', 'criar.html'));
  });
  app.get('/item/editar', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'item', 'editar.html'));
  });
  
//crud de listas
  app.get('/lista', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'lista', 'index.html'));
  });
  app.get('/lista/criar', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'lista', 'criar.html'));
  });
  app.get('/lista/editar', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'lista', 'editar.html'));
  });
  app.get('/lista/visualizar', (req, res) => {
    res.sendFile(path.join(clientPath, 'pages', 'lista', 'visualizar.html'));
  });

module.exports =  app;

//arquivo de configuração do servidor