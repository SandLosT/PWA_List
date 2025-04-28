var express = require('express');
var app = express();
var path = require('path');
const ejs = require('ejs');



const listaRoutes = require('./routes/listaRoutes.js');
const itemRoutes = require('./routes/itemRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para JSON
app.use(express.json());
// static files

app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'public/pages'))
app.engine('html', ejs.renderFile)

// 🌐 Rotas da API REST
app.use('/api/listas', listaRoutes);
app.use('/api/itens', itemRoutes);
app.use('/api/usuarios', usuarioRoutes);
// mapeamento das rotas
// 🔗 Importação das rotas da API


//home
  app.get('/', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'home', 'index.html'));
  });
//crud de itens
  app.get('/item', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'item', 'index.html'));
  });
  app.get('/item/criar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'item', 'criar.html'));
  });
  app.get('/item/editar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'item', 'editar.html'));
  });
  
//crud de listas
  app.get('/lista', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'lista', 'index.html'));
  });
  app.get('/lista/criar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'lista', 'criar.html'));
  });
  app.get('/lista/editar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'lista', 'editar.html'));
  });
  app.get('/lista/visualizar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'lista', 'visualizar.html'));
  });

//crud de usuarios
  app.get('/usuario', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'usuario', 'index.html'));
  });
  app.get('/usuario/editar', (req, res) => {
    res.render(path.join(clientPath, 'pages', 'usuario', 'editar.html'));
  });

module.exports =  app;

//arquivo de configuração do servidor