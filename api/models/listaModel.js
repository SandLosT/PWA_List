class Lista {
  constructor({ nome, usuarioId }) {
    if (!nome || typeof nome !== 'string') {
      throw new Error('O nome da lista é obrigatório e deve ser uma string');
    }

    if (!usuarioId || typeof usuarioId !== 'string') {
      throw new Error('O ID do usuário é obrigatório e deve ser uma string');
    }

    this.nome = nome;
    this.usuarioId = usuarioId;
    this.criadoEm = new Date().toISOString();
  }

  toFirestore() {
    return {
      nome: this.nome,
      usuarioId: this.usuarioId,
      criadoEm: this.criadoEm
    };
  }

  static fromFirestore(data) {
    return new Lista(data);
  }
}

module.exports = Lista;