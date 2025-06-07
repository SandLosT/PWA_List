const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secreta-super-chave';

function autenticarJWT(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.sendStatus(401); // Unauthorized
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.usuario = decoded;
    next();
  });
}

module.exports = autenticarJWT;
