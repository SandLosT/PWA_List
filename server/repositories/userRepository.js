const { db } = require('../firebase');

module.exports = {
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

  create: async ({ nome, email, senha }) => {
    const docRef = await db.collection('usuarios').add({ nome, email, senha });
    return { id: docRef.id, nome, email };
  },

  validateLogin: async (email, senha) => {
    const snapshot = await db.collection('usuarios')
      .where('email', '==', email)
      .where('senha', '==', senha)
      .get();

    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  }
};
