const listaService = require('../services/listaService');
const jwtService = require('../services/jwtService');

module.exports = {
  create: async (req, res) => {
    try {

      const { nome } = req.body;

      var token = jwtService.extrairToken(req);
      var payload = jwtService.extrairPayload(token);

      await listaService.create({ nome, usuarioId: payload.usuario.id });

      res.status(201).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao criar lista' });
    }
  },

  update: async (req, res) => {
    try {

      const { nome } = req.body;

      var lista = await listaService.findById(req.params.id);

      if (!lista) {
        return res.status(404).json({ error: 'Lista não encontrada' });
      }

      lista.nome = nome ?? lista.nome;

      await listaService.update(req.params.id, lista);

      res.status(200).json();
    } catch (error) {

      res.status(500).json({ error: 'Erro ao atualizar lista' });
    }
  },

  findAll: async (req, res) => {
    try {

      var listas = await listaService.findAll();

      res.status(200).json(listas);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao listar listas' });
    }
  },

  findById: async (req, res) => {
    try {

      var lista = await listaService.findById(req.params.id);

      if (!lista) {
        return res.status(404).json({ error: 'Lista não encontrada' });
      }

      res.status(200).json(lista);
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao buscar lista' });
    }
  },

  findByUser: async (req, res) => {
    try {

      var token = jwtService.extrairToken(req);
      var payload = jwtService.extrairPayload(token);

      var listas = await listaService.findByUserId(payload.usuario.id);
      
      res.status(200).json(listas);
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao listar listas' });
    }
  },

  delete: async (req, res) => {
    try {

      await listaService.delete(req.params.id);

      res.status(204).json();
    } catch (error) {
      
      res.status(500).json({ error: 'Erro ao excluir lista' });
    }
  }
};
