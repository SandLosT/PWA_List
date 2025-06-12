const listaRepository = require('../repositories/listaRepository');
const itensRepository = require('../repositories/itemRepository');

module.exports = {
  findAll: async () => {
    var listas = await listaRepository.findAll();
    return await Promise.all(listas.map(async (lista) => {
      var itens = await itensRepository.findByList(lista.id);
      return {
        ...lista,
        itens: itens
      }
    }));
  },

  findById: async (id) => {
    var lista = await listaRepository.findById(id);
    var itens = await itensRepository.findByList(lista.id);
    return {
      ...lista,
      itens: itens
    }
  },

  findByUserId: async (usuarioId) => {
    var listas = await listaRepository.findByUserId(usuarioId);
    return await Promise.all(listas.map(async (lista) => {
      var itens = await itensRepository.findByList(lista.id);
      return {
        ...lista,
        itens: itens
      }
    }));
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
