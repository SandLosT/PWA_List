function obterListas() {
  return JSON.parse(localStorage.getItem('listas')) || [];
}

function salvarListas(listas) {
  localStorage.setItem('listas', JSON.stringify(listas));
}
