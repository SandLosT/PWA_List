const itemService = require('../services/itemService');

module.exports = {
  create: async (req, res) => {
    try {

      const { nome, quantidade, preco } = req.body;

      await itemService.create(req.params.listaId, { nome, quantidade, preco });

      res.status(201).json();
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  update: async (req, res) => {
    try {

      const { nome, quantidade, preco } = req.body;

      const item = await itemService.findById(req.params.listaId, req.params.itemId);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      item.nome = nome ?? item.nome;
      item.quantidade = quantidade ?? item.quantidade;
      item.preco = preco ?? item.preco;
      
      await itemService.update(req.params.listaId, req.body.itemId, item);

      res.status(200).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  },

  findById: async (req, res) => {
    try {

      var item = await itemService.findById(req.params.listaId, req.params.itemId);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }

      res.status(200).json(item);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao buscar item' });
    }
  },

  findByList: async (req, res) => {
    try {

      const itens = await itemService.findByList(req.params.listaId);

      res.status(200).json(itens);
    } catch (error) {

      res.status(500).json({ error: 'Erro ao listar itens da lista' });
    }
  },

  delete: async (req, res) => {
    try {

      await itemService.delete(req.params.listaId, req.body.itemId);

      res.status(204).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao excluir item' });
    }
  }
};
