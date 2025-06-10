const usuarioService = require('../services/usuarioService');
const passwordService = require('../services/passwordService');

module.exports = {

  findAll: async (req, res) => {
    try {

      const usuarios = await usuarioService.findAll();

      res.status(200).json(usuarios);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  },

  findById: async (req, res) => {
    try {
      const id = req.params.id;

      const usuario = await usuarioService.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  findByEmail: async (req, res) => {
    try {

      const { email } = req.params;

      const usuario = await usuarioService.findByEmail(email);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.status(200).json(usuario);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  update: async (req, res) => {
    try {

      const { nome, email, senha } = req.body;

      const usuario = await usuarioService.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      usuario.nome = nome ?? usuario.nome;
      usuario.email = email ?? usuario.email;

      if (senha) {
        usuario.senha = passwordService.generatePasswordHash(senha);
      }

      await usuarioService.update(req.params.id, usuario);

      res.status(200).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  delete: async (req, res) => {
    try {

      await usuarioService.delete(req.params.id);

      res.status(204).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  },
};
