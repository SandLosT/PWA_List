const listaRepository = require('../repositories/listaRepository');

module.exports = {
  listar: async () => {
    return await listaRepository.listar();
  },

  visualizar: async (id) => {
    if (!id) throw new Error('ID é obrigatório');
    return await listaRepository.visualizar(id);
  },

  criar: async (novaLista) => {
    if (!novaLista?.nome) throw new Error('Nome da lista é obrigatório');
    return await listaRepository.criar(novaLista);
  },

  atualizar: async (id, dados) => {
    if (!id || !dados) throw new Error('Parâmetros inválidos');
    await listaRepository.atualizar(id, dados);
  },

  excluir: async (id) => {
    if (!id) throw new Error('ID é obrigatório');
    await listaRepository.excluir(id);
  }
};
