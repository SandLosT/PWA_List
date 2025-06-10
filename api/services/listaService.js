const listaRepository = require('../repositories/listaRepository');

module.exports = {
  findAll: async () => {
    return await listaRepository.findAll();
  },

  findById: async (id) => {
    return await listaRepository.findById(id);
  },

  findByUserId: async (usuarioId) => {
    return await listaRepository.findByUserId(usuarioId);
  },

  create: async (dados) => {
    await listaRepository.create(dados);
  },

  update: async (id, dados) => {
    await listaRepository.update(id, dados);
  },

  delete: async (id) => {
    await listaRepository.delete(id);
  }
};
