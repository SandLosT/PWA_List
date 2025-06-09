const usuarioRepository = require('../repositories/usuarioRepository');
const passwordService = require('./passwordService');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('./jwtService');

module.exports = {
  login: async (email, senha) => {
    if (!email || !senha) {
      throw new Error('Email e senha são obrigatórios');
    }

    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new Error('E-mail não existe!');
    }

    if (!passwordService.verifyPasswordHash(senha, usuario.senha)) {
      throw new Error("Senha incorreta!");
    }

    const token = jwt.sign(
      {
        usuario: {
          id: usuario.id
        }
      },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    );

    return token;
  },

  register: async (email, senha, nome) => {

    if (!email || !senha || !nome) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    const usuario = await usuarioRepository.findByEmail(email);

    if (usuario) {
      throw new Error('E-mail já existe');
    }

    var senhaHash = passwordService.generatePasswordHash(senha);

    return await usuarioRepository.create(nome, email, senhaHash);
  }
};
