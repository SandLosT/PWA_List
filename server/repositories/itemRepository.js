const { db } = require('../firebase');

module.exports = {
  listarPorLista: async (listaId) => {
    const snapshot = await db.collection('listas').doc(listaId).collection('itens').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  adicionar: async (listaId, novoItem) => {
    const docRef = await db.collection('listas').doc(listaId).collection('itens').add(novoItem);
    return { id: docRef.id };
  },

  atualizar: async (listaId, itemId, dados) => {
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).update(dados);
  },

  excluir: async (listaId, itemId) => {
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).delete();
  }
};
