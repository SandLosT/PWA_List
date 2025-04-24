const { db } = require('../firebase');

// Referência à coleção "usuarios"
const usuariosRef = db.collection('usuarios');

module.exports = {
  // GET /api/usuarios
  listar: async (req, res) => {
    try {
      const snapshot = await usuariosRef.get();
      const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  // POST /api/usuarios/registrar
  registrar: async (req, res) => {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Campos obrigatórios: nome, email e senha' });
      }

      // Verifica se já existe um usuário com esse e-mail
      const existente = await usuariosRef.where('email', '==', email).get();
      if (!existente.empty) {
        return res.status(409).json({ error: 'E-mail já cadastrado' });
      }

      const novoUsuario = { nome, email, senha };
      const docRef = await usuariosRef.add(novoUsuario);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  // POST /api/usuarios/login
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      const snapshot = await usuariosRef
        .where('email', '==', email)
        .where('senha', '==', senha)
        .get();

      if (snapshot.empty) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const user = snapshot.docs[0];
      res.status(200).json({ id: user.id, ...user.data() });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
};
