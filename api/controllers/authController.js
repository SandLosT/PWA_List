const authService = require('../services/authService');

module.exports = {
  login: async (req, res) => {
    const { email, senha } = req.body;

    try {
      const token = await authService.login(email, senha);

      res.status(200).json(token);
    } catch (error) {

      res.status(401).json({ error: error.message });
    }
  },

  register: async (req, res) => {
    const { nome, email, username, senha } = req.body;

    try {
      await authService.register({ nome, email, username, senha });

      res.status(201).json();
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
  }
};
