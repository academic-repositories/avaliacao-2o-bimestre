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
  
});
