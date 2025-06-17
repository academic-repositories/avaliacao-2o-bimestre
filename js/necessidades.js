document.addEventListener('DOMContentLoaded', function () {
  const lista = document.getElementById('lista-necessidades');
  const nenhumResultado = document.getElementById('nenhum-resultado');
  const pesquisaInput = document.getElementById('pesquisa');
  const filtroTipo = document.getElementById('filtro-tipo');

  function obterNecessidades() {
    try {
      return JSON.parse(localStorage.getItem('necessidades')) || [];
    } catch (e) {
      return [];
    }
  }

  function gerarCard(necessidade) {
    return `
      <div class="card">
        <div class="type">${necessidade.tipoAjuda}</div>
        <div class="title">${necessidade.titulo}</div>
        <div class="desc">${necessidade.descricao}</div>
        <div class="institution"><b>Instituição:</b> ${necessidade.instituicao}</div>
        <div class="institution"><b>Endereço:</b> ${necessidade.rua}, ${necessidade.bairro}, ${necessidade.cidade} - ${necessidade.estado} | CEP: ${necessidade.cep}</div>
        <div class="contact"><b>Contato:</b> ${necessidade.contato}</div>
      </div>
    `;
  }

  function exibirNecessidades() {
    const todas = obterNecessidades();
    let filtradas = todas;

    const tipo = filtroTipo.value;
    if (tipo) {
      filtradas = filtradas.filter(n => n.tipoAjuda === tipo);
    }

    const termo = pesquisaInput.value.trim().toLowerCase();
    if (termo) {
      filtradas = filtradas.filter(n =>
        n.titulo.toLowerCase().includes(termo) ||
        n.descricao.toLowerCase().includes(termo)
      );
    }

    if (filtradas.length === 0) {
      lista.innerHTML = '';
      nenhumResultado.style.display = 'block';
    } else {
      lista.innerHTML = filtradas.map(gerarCard).join('');
      nenhumResultado.style.display = 'none';
    }
  }

  pesquisaInput.addEventListener('input', exibirNecessidades);
  filtroTipo.addEventListener('change', exibirNecessidades);

  exibirNecessidades();
});
