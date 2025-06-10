const { db } = require('../firebase');
const Item = require('../models/itemModel');

module.exports = {
  create: async (listaId, dados) => {
    const item = new Item(dados);
    await db.collection('listas').doc(listaId).collection('itens').add(item.toFirestore());
  },

  update: async (listaId, itemId, dados) => {
    const item = new Item(dados);
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).update(item.toFirestore());
  },

  findById: async (listaId, itemId) => {
    const doc = await db.collection('listas').doc(listaId).collection('itens').doc(itemId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  findByList: async (listaId) => {
    const snapshot = await db.collection('listas').doc(listaId).collection('itens').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...Item.fromFirestore(doc.data())}));
  },

  delete: async (listaId, itemId) => {
    await db.collection('listas').doc(listaId).collection('itens').doc(itemId).delete();
  }
};
