const { db } = require('../firebase');

// Referência à coleção "listas"
const listaRef = db.collection('listas');

module.exports = {
  // GET /api/listas
  listar: async (req, res) => {
    try {
      const snapshot = await listaRef.get();
      const listas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(listas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar listas' });
    }
  },

  // GET /api/listas/:id
  visualizar: async (req, res) => {
    try {
      const doc = await listaRef.doc(req.params.id).get();
      if (!doc.exists) return res.status(404).json({ error: 'Lista não encontrada' });
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar lista' });
    }
  },

  // POST /api/listas
  criar: async (req, res) => {
    try {
      const novaLista = req.body;
      const docRef = await listaRef.add(novaLista);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar lista' });
    }
  },

  // PUT /api/listas/:id
  atualizar: async (req, res) => {
    try {
      await listaRef.doc(req.params.id).update(req.body);
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar lista' });
    }
  },

  // DELETE /api/listas/:id
  excluir: async (req, res) => {
    try {
      await listaRef.doc(req.params.id).delete();
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir lista' });
    }
  }
};
