const authService = require('../services/authService');
const usuarioService = require('../services/usuarioService');

module.exports = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const token = await authService.login(email, senha);

      res.status(200).json(token);
    } catch (error) {

      res.status(401).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    const { nome, email, username, senha } = req.body;

    try {
      await authService.register({ nome, email, username, senha });

      res.status(201).json();
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
  },

  existsByEmail: async (req, res) => {
    try {

      var existe = await usuarioService.existsByEmail(req.params.email);

      res.status(200).json({ existe });
    } catch (error) {

      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  existsByUsername: async (req, res) => {
    try {

      var existe = await usuarioService.existsByUsername(req.params.username);

      res.status(200).json({ existe });
    } catch (error) {

      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },
};
