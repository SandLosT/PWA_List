const jwt = require('jsonwebtoken');

module.exports = {
    SECRET_KEY: "2FAB00D652046FB187CEBA3ED1FCCAEE698154A0614B596C3B4F6E8A251F0690",

    extrairToken: (request) => {
        let authorizationHeader = request.headers.authorization;
        let token = authorizationHeader.split(" ", 2);
        return token[1];
    },
    
    extrairPayload: (token) => {
        let parts = token.split('.');
        let payload = JSON.parse(atob(parts[1]));
        return payload;
    }
}