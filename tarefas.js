let tarefas = [
  { nome: 'Comprar leite', categoria: 'compras', realizada: false },
  { nome: 'Escutar chimbinha', categoria: 'lazer', realizada: true }
];

const listaTarefasEl = document.querySelector('#lista-tarefas');
const inputNome = document.querySelector('#nova-tarefa-nome');
const selectCategoria = document.querySelector('#nova-tarefa-categoria');
const btnIncluir = document.querySelector('#incluir-nova-tarefa');
const filtroCategoria = document.querySelector('#filtro-de-categoria');


function insereTarefaNaPagina(tarefa) {
  const li = document.createElement('li');
  li.innerHTML = tarefa.nome;
  li.classList.add('item-tarefa');
  li.classList.add(`categoria-${tarefa.categoria}`);
  if (tarefa.realizada === true) {
    li.classList.add('marcado');
  }
  li.addEventListener('click', function() {
    li.classList.toggle('marcado'); 
    tarefa.realizada = !tarefa.realizada; 
  });

  listaTarefasEl.appendChild(li);
}

listaTarefasEl.innerHTML = '';
tarefas.forEach(function(tarefa) {
  insereTarefaNaPagina(tarefa);
});

function adicionarNovaTarefa() {
  const nomeDigitado = inputNome.value;
  if (nomeDigitado === '') return; 
  const novaTarefa = {
    nome: nomeDigitado,
    categoria: selectCategoria.value,
    realizada: false
  };
  tarefas.push(novaTarefa);
  insereTarefaNaPagina(novaTarefa);
  inputNome.value = '';
  inputNome.focus();
}

btnIncluir.addEventListener('click', adicionarNovaTarefa);
inputNome.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') {
    adicionarNovaTarefa();
  }
});

filtroCategoria.addEventListener('change', function() {
  const categoriaEscolhida = filtroCategoria.value;
  const todosOsItensHTML = document.querySelectorAll('.item-tarefa');

  todosOsItensHTML.forEach(function(item) {
    item.classList.remove('retido-no-filtro');
    if (categoriaEscolhida !== '' && !item.classList.contains(`categoria-${categoriaEscolhida}`)) {
      item.classList.add('retido-no-filtro');
    }
  });
});