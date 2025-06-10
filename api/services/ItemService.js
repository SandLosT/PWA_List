const itemRepository = require('../repositories/itemRepository');

module.exports = {
  create: async (listaId, dados) => {
    return await itemRepository.create(listaId, dados);
  },

  update: async (listaId, itemId, dados) => {
    await itemRepository.update(listaId, itemId, dados);
  },

  findById: async (id) => {
    return await itemRepository.findById(id);
  },
  
  findByList: async (listaId) => {
    return await itemRepository.findByList(listaId);
  },

  delete: async (listaId, itemId) => {
    await itemRepository.delete(listaId, itemId);
  }
};
