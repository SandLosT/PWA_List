const { db } = require('../firebase');
const Usuario = require('../models/usuarioModel');

module.exports = {
  create: async (dados) => {
      var usuario = new Usuario(dados);
      await db.collection('usuarios').add(usuario.toFirestore());
  },

  update: async (id, dados) => {
      var usuario = new Usuario(dados);
      await db.collection('usuarios').doc(id).update(usuario.toFirestore());
  },

  findAll: async () => {
    const snapshot = await db.collection('usuarios').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...Usuario.fromFirestore(doc.data()) }));
  },

  findById: async (id) => {
    const doc = await db.collection('usuarios').doc(id).get();
    return doc.exists ? { id: doc.id, ...Usuario.fromFirestore(doc.data()) } : null;
  },

  findByEmail: async (email) => {
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...Usuario.fromFirestore(doc.data()) };
  },

  findByUsername: async (username) => {
    const snapshot = await db.collection('usuarios').where('username', '==', username).get();
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...Usuario.fromFirestore(doc.data()) };
  },

  existsByEmail: async (email) => {
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();
    return !snapshot.empty;
  },

  existsByUsername: async (username) => {
    const snapshot = await db.collection('usuarios').where('username', '==', username).get();
    return !snapshot.empty;
  },

  delete: async (id) => {
    await db.collection('usuarios').doc(id).delete();
  },
};