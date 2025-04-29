module.exports = {
    showLogin: (req, res) => {
      res.render('auth/login', {
        isAuthenticated: false
      });
    },
  
    showRegister: (req, res) => {
      res.render('auth/register', {
        isAuthenticated: false
      });
    },
  
    logout: (req, res) => {
      res.redirect('/auth/login');
    },
  
    login: (req, res) => {
      // Aqui futuramente você poderia validar o usuário
      res.redirect('/');
    },
  
    register: (req, res) => {
      const body = req.body;
      console.log("Request body:");
      console.log(body);
  
      // Aqui futuramente você cadastraria no banco
      res.json(true);
    }
  };
  