const userRepository = require('../repositories/userRepository');

module.exports = {
  login: async (email, senha) => {
    if (!email || !senha) throw new Error('Email e senha são obrigatórios');

    const usuario = await userRepository.validateLogin(email, senha);
    if (!usuario) throw new Error('Credenciais inválidas');

    return usuario;
  },

  register: async (email, senha, nome) => {
    if (!email || !senha || !nome) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    const existente = await userRepository.findByEmail(email);
    if (existente) throw new Error('E-mail já cadastrado');

    const novoUsuario = await userRepository.create({ nome, email, senha });
    return novoUsuario;
  }
};
