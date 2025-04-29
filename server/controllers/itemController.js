const itemService = require('../services/ItemService');

module.exports = {
  listarPorLista: async (req, res) => {
    try {
      const itens = await itemService.listarPorLista(req.params.listaId);
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar itens da lista' });
    }
  },

  adicionar: async (req, res) => {
    try {
      const id = await itemService.adicionar(req.params.listaId, req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  atualizar: async (req, res) => {
    try {
      await itemService.atualizar(req.params.id, req.body.listaId, req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  },

  excluir: async (req, res) => {
    try {
      await itemService.excluir(req.params.id, req.body.listaId);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir item' });
    }
  }
};
