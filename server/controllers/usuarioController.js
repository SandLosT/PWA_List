const { findByEmail } = require('../repositories/userRepository');
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
  findByEmail: async (req, res) => { 
    try {
      const { email } = req.params;
      const usuario = await findByEmail(email);
      if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });
      res.status(200).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
};
