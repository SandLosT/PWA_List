const { db } = require('../firebase');
const Lista = require('../models/listaModel');

module.exports = {
  listar: async () => {
    const snapshot = await db.collection('listas').get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...Lista.fromFirestore(doc.data())
    }));
  },

  visualizar: async (id) => {
    const doc = await db.collection('listas').doc(id).get();
    return doc.exists ? { id: doc.id, ...Lista.fromFirestore(doc.data()) } : null;
  },

  criar: async (dados) => {
    const lista = new Lista(dados); // valida e instancia a model
    const docRef = await db.collection('listas').add(lista.toFirestore());
    return { id: docRef.id };
  },

  atualizar: async (id, dados) => {
    const lista = new Lista(dados); // novamente valida
    await db.collection('listas').doc(id).update(lista.toFirestore());
  },

  excluir: async (id) => {
    await db.collection('listas').doc(id).delete();
  }
};
