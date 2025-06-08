const express = require('express');
const app = express();
const cors = require('cors');
const {validateToken} = require('./middlewares/jwtMiddleware');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const listaRoutes = require('./routes/listaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use(/(.*)/, validateToken);
app.use('/api/itens', itemRoutes);
app.use('/api/listas', listaRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`)
})