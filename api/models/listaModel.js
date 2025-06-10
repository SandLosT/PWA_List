class Lista {
  constructor({ nome, usuarioId, criadaEm = null }) {
    if (!nome || typeof nome !== 'string') {
      throw new Error('O nome da lista é obrigatório e deve ser uma string');
    }

    if (!usuarioId || typeof usuarioId !== 'string') {
      throw new Error('O ID do usuário é obrigatório e deve ser uma string');
    }

    this.nome = nome;
    this.usuarioId = usuarioId;
    this.criadaEm = criadaEm || new Date().toISOString();
  }

  toFirestore() {
    return {
      nome: this.nome,
      usuarioId: this.usuarioId,
      criadaEm: this.criadaEm
    };
  }

  static fromFirestore(data) {
    return new Lista(data);
  }
}

module.exports = Lista;
