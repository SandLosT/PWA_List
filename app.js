const lista = document.getElementById('lista');
const itemInput = document.getElementById('itemInput');

let itens = JSON.parse(localStorage.getItem('itens')) || [];

function renderizarLista() {
  lista.innerHTML = '';
  itens.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item}</span>
       <div class="botoes">
        <button class="editar" onclick="editarItem(${index})">✏️</button>
        <button class="excluir" onclick="removerItem(${index})">❌</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

function adicionarItem() {
  const valor = itemInput.value.trim();
  if (valor) {
    itens.push(valor);
    localStorage.setItem('itens', JSON.stringify(itens));
    itemInput.value = '';
    renderizarLista();
  }
}

function editarItem(index) {
  const novoValor = prompt('Editar item:', itens[index]);
  if (novoValor) {
    itens[index] = novoValor;
    localStorage.setItem('itens', JSON.stringify(itens));
    renderizarLista();
  }
}

function removerItem(index) {
  itens.splice(index, 1);
  localStorage.setItem('itens', JSON.stringify(itens));
  renderizarLista();
}

renderizarLista();
