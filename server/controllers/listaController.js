const listaService = require('../services/listaService');

module.exports = {
  listar: async (req, res) => {
    try {
      const listas = await listaService.listar();
      res.status(200).json(listas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar listas' });
    }
  },

  visualizar: async (req, res) => {
    try {
      const lista = await listaService.visualizar(req.params.id);
      if (!lista) return res.status(404).json({ error: 'Lista não encontrada' });
      res.status(200).json(lista);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar lista' });
    }
  },

  criar: async (req, res) => {
    try {
      const id = await listaService.criar(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar lista' });
    }
  },

  atualizar: async (req, res) => {
    try {
      await listaService.atualizar(req.params.id, req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar lista' });
    }
  },

  excluir: async (req, res) => {
    try {
      await listaService.excluir(req.params.id);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir lista' });
    }
  }
};
