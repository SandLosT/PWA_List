const userRepository = require('../repositories/userRepository');

module.exports = {
  listar: async () => {
    return await userRepository.listar();
  },
  findByEmail: async (email) => {
    if (!email) throw new Error('Email é obrigatório');
    return await userRepository.findByEmail(email);
  }
};
