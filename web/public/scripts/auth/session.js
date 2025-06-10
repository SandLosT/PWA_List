import { extrairPayload } from "../modules/token.js"

function loadSession() {
    let token = localStorage.getItem("security-auth-jwt")
    if (token === null) {
        window.location.href = "/auth/login"
    }
    let payload = extrairPayload(token)
    if (new Date(Date.now()) > new Date(payload.exp * 1000)) {
        localStorage.removeItem("security-auth-jwt")
        window.location.href = "/auth/login"
    }
    return payload.usuario
}

function destroySession(e) {
    e.preventDefault()
    localStorage.removeItem("security-auth-jwt")
    window.location.href = "/auth/login"
}

window.onload = () => {
    loadSession()
}