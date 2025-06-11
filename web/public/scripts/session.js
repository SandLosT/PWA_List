// function extrairPayload(token) {
//     let parts = token.split('.');
//     let payload = JSON.parse(atob(parts[1]));
//     return payload;
// }

// function loadSession() {
//     let token = localStorage.getItem("jwt")
//     if (token === null) {
//         window.location.href = "/auth/login"
//     }
//     let payload = extrairPayload(token)
//     if (new Date(Date.now()) > new Date(payload.exp * 1000)) {
//         localStorage.removeItem("jwt")
//         window.location.href = "/auth/login"
//     }
//     return payload.usuario
// }

// function destroySession(e) {
//     e.preventDefault()
//     localStorage.removeItem("jwt")
//     window.location.href = "/auth/login"
// }

// function isAuthenticated() {
//     let token = localStorage.getItem("jwt")
//     if (token === null) {
//         return false
//     }
//     let payload = extrairPayload(token)
//     if (new Date(Date.now()) > new Date(payload.exp * 1000)) {
//         return false
//     }
//     return true
// }