const { db } = require('../firebase');

module.exports = {
  listarPorLista: async (listaId) => {
    const snapshot = await db.collection('listas').doc(listaId).collection('itens').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  adicionar: async (listaId, novoItem) => {
    const docRef = await db.collection('listas').doc(listaId).collection('itens').add(novoItem);
    return docRef.id;
  },

  atualizar: async (id, listaId, dados) => {
    const itemRef = db.collection('listas').doc(listaId).collection('itens').doc(id);
    await itemRef.update(dados);
  },

  excluir: async (id, listaId) => {
    const itemRef = db.collection('listas').doc(listaId).collection('itens').doc(id);
    await itemRef.delete();
  }
};
