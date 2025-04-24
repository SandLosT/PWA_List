
const { db } = require('../firebase');
module.exports = {
  // GET /api/itens/lista/:listaId
  listarPorLista: async (req, res) => {
    try {
      const { listaId } = req.params;
      const itensRef = db.collection('listas').doc(listaId).collection('itens');
      const snapshot = await itensRef.get();

      const itens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      res.status(200).json(itens);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar itens da lista' });
    }
  },

  // POST /api/itens/lista/:listaId
  adicionar: async (req, res) => {
    try {
      const { listaId } = req.params;
      const novoItem = req.body;

      const docRef = await db.collection('listas').doc(listaId).collection('itens').add(novoItem);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao adicionar item' });
    }
  },

  // PUT /api/itens/:id
  atualizar: async (req, res) => {
    try {
      const { id } = req.params; //id do item
      const { listaId } = req.body; //id da lista

      if (!listaId) return res.status(400).json({ error: 'listaId é obrigatório para atualizar um item' });

      const itemRef = db.collection('listas').doc(listaId).collection('itens').doc(id);
      await itemRef.update(req.body);

      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar item' });
    }
  },

  // DELETE /api/itens/:id
  excluir: async (req, res) => {
    try {
      const { id } = req.params;
      const { listaId } = req.body;

      if (!listaId) return res.status(400).json({ error: 'listaId é obrigatório para excluir um item' });

      const itemRef = db.collection('listas').doc(listaId).collection('itens').doc(id);
      await itemRef.delete();

      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir item' });
    }
  }
};

