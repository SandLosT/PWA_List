const { db } = require('../firebase');
const Item = require('../models/itemModel');

module.exports = {
  listarPorLista: async (listaId) => {
    const snapshot = await db.collection('listas').doc(listaId).collection('itens').get();

    // debug
    snapshot.docs.forEach(x => console.log(x.data()));

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...Item.fromFirestore(doc.data())
    }));
  },

  adicionar: async (listaId, novoItemData) => {
    const item = new Item(novoItemData); // valida
    const docRef = await db.collection('listas').doc(listaId).collection('itens').add(item.toFirestore());
    return { id: docRef.id };
  },

  atualizar: async (listaId, itemId, dados) => {
    const item = new Item(dados); // valida
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).update(item.toFirestore());
  },

  excluir: async (listaId, itemId) => {
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).delete();
  }
};
