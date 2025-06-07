class Lista {
  constructor({ nome, criadaEm = null }) {
    if (!nome || typeof nome !== 'string') {
      throw new Error('O nome da lista é obrigatório e deve ser uma string');
    }

    this.nome = nome;
    this.criadaEm = criadaEm || new Date().toISOString();
  }

  toFirestore() {
    return {
      nome: this.nome,
      criadaEm: this.criadaEm
    };
  }

  static fromFirestore(data) {
    return new Lista(data);
  }
}

module.exports = Lista;
