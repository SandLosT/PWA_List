const usuarioRepository = require('../repositories/usuarioRepository');
const passwordService = require('./passwordService');

module.exports = {
  findAll: async () => {
    return await usuarioRepository.findAll();
  },
  findById: async (id) => {
    return await usuarioRepository.findById(id);
  },
  findByEmail: async (email) => {
    return await usuarioRepository.findByEmail(email);
  },
  existsByEmail: async (email) => {
    return await usuarioRepository.existsByEmail(email);
  },
  existsByUsername: async (username) => {
    return await usuarioRepository.existsByUsername(username);
  },
  update: async (id, dados) => {
    return await usuarioRepository.update(id, dados);
  },
  delete: async (id) => {
    await usuarioRepository.delete(id);
  },
};