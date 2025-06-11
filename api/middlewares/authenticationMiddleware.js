const jwt = require('jsonwebtoken');
const jwtService = require('../services/jwtService');

/**
 * Extrai o *token Bearer* do cabeçalho authorization da solicitação HTTP.
 * Chama o método `verify()` do módulo **jsonwebtoken** para validar o token recebido na solicitação.
 * @param request Objeto do tipo `Express.Request` que contém as informações da **solicitação HTTP**.
 * @param response Objeto do tipo `Express.Response` que contém as informações da **resposta HTTP**.
 * @param next Referência para o próximo *middleware*.
 * @returns 
 */
exports.authentication = (request, response, next) => {
    let authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
        return response.status(401).json("Acesso negado. É obrigatório informar o token no cabeçalho 'authorization'!");
    }
    let token = authorizationHeader.split(" ", 2);
    if (token[0] != "Bearer") {
        return response.status(401).json("Acesso negado. O token informado não é do tipo Bearer!")
    }
    try {
        jwt.verify(token[1], jwtService.SECRET_KEY);
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json(`Acesso negado. O token expirou em ${error.expiredAt}!`);
        }
        return response.status(401).json("Acesso negado. Token inválido!");
    }
};