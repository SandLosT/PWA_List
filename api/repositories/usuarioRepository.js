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

  listar: async () => {
    const snapshot = await db.collection('usuarios').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  findByEmail: async (email) => {
    const snapshot = await db.collection('usuarios').where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  },
};
