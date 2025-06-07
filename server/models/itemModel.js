class Item {
  constructor({ nome, quantidade, preco, criadoEm = null }) {
    if (!nome || typeof nome !== 'string') {
      throw new Error('O nome do item é obrigatório e deve ser uma string');
    }

    if (quantidade === undefined || typeof quantidade !== 'number') {
      throw new Error('A quantidade é obrigatória e deve ser um número');
    }

    if (preco === undefined || typeof preco !== 'number') {
      throw new Error('O preço é obrigatório e deve ser um número');
    }

    this.nome = nome;
    this.quantidade = quantidade;
    this.preco = preco;
    this.criadoEm = criadoEm || new Date().toISOString();
  }

  toFirestore() {
    return {
      nome: this.nome,
      quantidade: this.quantidade,
      preco: this.preco,
      criadoEm: this.criadoEm
    };
  }

  static fromFirestore(data) {
    return new Item(data);
  }
}

module.exports = Item;
