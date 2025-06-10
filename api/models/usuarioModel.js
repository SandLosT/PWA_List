class Usuario {
    constructor({ nome, email, username, senha }) {
        if (!nome || typeof nome !== 'string') {
            throw new Error('O nome do usuário é obrigatório e deve ser uma string');
        }

        if (!email || typeof email !== 'string') {
            throw new Error('O email do usuário é obrigatório e deve ser uma string');
        }

        if (!username || typeof username !== 'string') {
            throw new Error('O username do usuário é obrigatório e deve ser uma string');
        }

        if (!senha || typeof senha !== 'string') {
            throw new Error('A senha do usuário é obrigatório e deve ser uma string');
        }

        this.nome = nome;
        this.email = email;
        this.username = username;
        this.senha = senha;
        this.criadoEm = new Date().toISOString();
    }

    toFirestore() {
        return {
            nome: this.nome,
            email: this.email,
            username: this.username,
            senha: this.senha,
            criadoEm: this.criadoEm
        };
    }

    static fromFirestore(data) {
        return new Usuario(data);
    }
}

module.exports = Usuario;