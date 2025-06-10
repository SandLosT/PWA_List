function extrairPayload(token) {
    let parts = token.split('.');
    let payload = JSON.parse(atob(parts[1]));
    return payload;
}

export { extrairPayload } ;