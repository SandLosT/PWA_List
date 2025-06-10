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

  register: async (dados) => {

    if (await usuarioRepository.existsByEmail(dados.email)) {
      throw new Error('E-mail já existe');
    }

    if (await usuarioRepository.existsByUsername(dados.username)) {
      throw new Error('Nome de usuário já existe');
    }

    dados.senha = passwordService.generatePasswordHash(dados.senha);

    return await usuarioRepository.create(dados);
  }
};