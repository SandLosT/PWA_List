const jwt = require('jsonwebtoken')
const settings = require('../settings.json')
const JWT_SECRET = settings.servers['PWA_List.API'].security.authentication.JWT_SECRET

exports.authentication = (request, response, next) => {
    const token = request.cookies.token
    if (!token) {
        request.isAuthenticated = false
    } else {
        try {
            const payload = jwt.verify(token, JWT_SECRET)
            request.usuario = payload.usuario
            request.isAuthenticated = true
        } catch (error) {
            request.isAuthenticated = false
        }
    }

    if (request.path != '/' && !request.path.includes('/auth') && !request.isAuthenticated) {
        return response.redirect('/auth/login')
    } else {
        next()
    }
}