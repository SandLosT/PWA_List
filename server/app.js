const express = require('express');
const app = express();
const path = require('path');

//configuração
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine (EJS, Pug, Handlebars... aqui é um exemplo para EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




// Rotas de API - que retornam json
const itemRoutes = require('./routes/data/itemRoutes');
const listaRoutes = require('./routes/data/listaRoutes');
const usuarioRoutes = require('./routes/data/usuarioRoutes');
const authRoutes = require('./routes/data/authRoutes');

app.use('/api/itens', itemRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);

// Rotas de View - que renderizam views
const listaViewRoutes = require('./routes/viewsRoutes/listaViewRoutes');
const usuarioViewRoutes = require('./routes/viewsRoutes/usuarioViewRoutes');
const authViewRoutes = require('./routes/viewsRoutes/authViewRoutes');
const homeViewRoutes = require('./routes/viewsRoutes/homeViewRoutes');
app.use('/lista', listaViewRoutes);
app.use('/usuario', usuarioViewRoutes);
app.use('/auth', authViewRoutes);
app.use('/', homeViewRoutes);

// Exporta o app para ser usado no server.js
module.exports = app;
