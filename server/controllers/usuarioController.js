const usuarioService = require('../services/usuarioService');

module.exports = {
  listar: async (req, res) => {
    try {
      const usuarios = await usuarioService.listar();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  registrar: async (req, res) => {
    try {
      const id = await usuarioService.registrar(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
  },

  login: async (req, res) => {
    try {
      const usuario = await usuarioService.login(req.body);
      if (!usuario) return res.status(401).json({ error: 'Credenciais inválidas' });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }
};
