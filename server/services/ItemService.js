const itemRepository = require('../repositories/itemRepository');

module.exports = {
  listarPorLista: async (listaId) => {
    if (!listaId) throw new Error('Lista ID é obrigatório');
    return await itemRepository.listarPorLista(listaId);
  },

  adicionar: async (listaId, novoItem) => {
    if (!listaId || !novoItem?.descricao) throw new Error('Dados inválidos');
    return await itemRepository.adicionar(listaId, novoItem);
  },

  atualizar: async (listaId, itemId, dados) => {
    if (!listaId || !itemId || !dados) throw new Error('Parâmetros inválidos');
    await itemRepository.atualizar(listaId, itemId, dados);
  },

  excluir: async (listaId, itemId) => {
    if (!listaId || !itemId) throw new Error('Parâmetros obrigatórios');
    await itemRepository.excluir(listaId, itemId);
  }
};
