const authService = require('../services/authService');
const JWT_SECRET = 'secreta-super-chave';
module.exports = {
  showLogin: (req, res) => {
    res.render('auth/login', { isAuthenticated: false });
  },

  showRegister: (req, res) => {
    res.render('auth/register', { isAuthenticated: false });
  },

  logout: (req, res) => {
    req.session.destroy(() => res.redirect('/auth/login'));
  },

  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const usuario = await authService.login(email, senha);

      // Gerar o token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },  // payload
        JWT_SECRET,  // chave secreta
        { expiresIn: '1h' } // tempo de expiração do token
      );

      // Retornar o token JWT como resposta
      res.json({ token });
    } catch (error) {
      console.error('Erro no login:', error.message);
      res.status(401).json({ error: error.message });
    }
  },

  registrar: async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
      await authService.register(email, senha, nome);
      res.status(200)
    } catch (error) {
      console.error('Erro no registro:', error.message);
      res.status(400).render('auth/register', {
        isAuthenticated: false,
        error: error.message
      });
    }
  }
};
