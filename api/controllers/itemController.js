const itemService = require('../services/itemService');

module.exports = {
  create: async (req, res) => {
    try {

      const { nome, quantidade, preco } = req.body;

      const id = await itemService.create(req.params.listaId, { nome, quantidade, preco });

      res.status(201).json({ id });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  update: async (req, res) => {
    try {

      const item = await itemService.findById(req.params.id);

      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado' });
      }
      
      await itemService.update(req.params.id, req.body.listaId, req.body);

      res.status(200).json({ ok: true });
    } catch (error) {

      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  },

  findById: async (req, res) => {
    try {

      var item = await itemService.findById(req.params.id);

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

      await itemService.delete(req.params.id, req.body.listaId);

      res.status(200).json({ ok: true });
    } catch (error) {

      res.status(500).json({ error: 'Erro ao excluir item' });
    }
  }
};
