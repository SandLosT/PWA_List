const { db } = require('../firebase');

module.exports = {
  listar: async () => {
    const snapshot = await db.collection('listas').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  visualizar: async (id) => {
    const doc = await db.collection('listas').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  criar: async (novaLista) => {
    const docRef = await db.collection('listas').add(novaLista);
    return { id: docRef.id };
  },

  atualizar: async (id, dados) => {
    await db.collection('listas').doc(id).update(dados);
  },

  excluir: async (id) => {
    await db.collection('listas').doc(id).delete();
  }
};
