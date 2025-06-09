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
  update: async (id, usuario) => {
    return await usuarioRepository.update(id, usuario);
  }
};
