const { db } = require('../firebase');

module.exports = {
  create: async (nome, email, senha) => {
    try {
      const docRef = await db.collection('usuarios').add({ nome, email, senha });

      return true;
    } catch (error) {

      return false;
    }
  },

  update: async (id, usuario) => {
    try {

      const docRef = await db.collection('usuarios').doc(id);
      docRef.update(usuario);

      return true;
    } catch (error) {

      return false;
    }
  },

  findAll: async () => {
    const snapshot = await db.collection('usuarios').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  findById: async (id) => {
    const doc = await db.collection('usuarios').doc(id).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },

  findByEmail: async (email) => {
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },

  delete: async (id) => {
    await db.collection('usuarios').doc(id).delete();
  },
};