const { db } = require('../firebase');

module.exports = {
  listar: async () => {
    const snapshot = await db.collection('usuarios').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  registrar: async ({ nome, email, senha }) => {
    if (!nome || !email || !senha) {
      throw new Error('Campos obrigatórios: nome, email e senha');
    }

    const existente = await db.collection('usuarios').where('email', '==', email).get();
    if (!existente.empty) {
      throw new Error('E-mail já cadastrado');
    }

    const docRef = await db.collection('usuarios').add({ nome, email, senha });
    return docRef.id;
  },

  login: async ({ email, senha }) => {
    const snapshot = await db.collection('usuarios')
      .where('email', '==', email)
      .where('senha', '==', senha)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const user = snapshot.docs[0];
    return { id: user.id, ...user.data() };
  }
};
