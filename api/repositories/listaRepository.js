const { db } = require('../firebase');
const Lista = require('../models/listaModel');

module.exports = {
  create: async (dados) => {
    const lista = new Lista(dados);
    await db.collection('listas').add(lista.toFirestore());
  },

  update: async (id, dados) => {
    const lista = new Lista(dados);
    await db.collection('listas').doc(id).update(lista.toFirestore());
  },

  findAll: async () => {
    const snapshot = await db.collection('listas').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...Lista.fromFirestore(doc.data())
    }));
  },

  findById: async (id) => {
    const doc = await db.collection('listas').doc(id).get();
    return doc.exists ? { id: doc.id, ...Lista.fromFirestore(doc.data()) } : null;
  },

  findByUserId: async (usuarioId) => {
    const snapshot = await db.collection('listas').where('usuarioId', '==', usuarioId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...Lista.fromFirestore(doc.data()) }));
  },

  delete: async (id) => {
    await db.collection('listas').doc(id).delete();
  }
};
