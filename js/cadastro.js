document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-necessidade');
  const msgErro = document.getElementById('msg-erro');
  const msgSucesso = document.getElementById('msg-sucesso');
  const cepInput = document.getElementById('cep');

  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('focus', () => {
      msgErro.textContent = '';
      msgSucesso.textContent = '';
    });
  });

  cepInput.addEventListener('blur', function () {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length !== 8) return; // ignora CEP inválido

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(resp => resp.json())
      .then(data => {
        if (data.erro) {
          msgErro.textContent = 'CEP não encontrado!';
          form.rua.value = '';
          form.bairro.value = '';
          form.cidade.value = '';
          form.estado.value = '';
        } else {
          form.rua.value = data.logradouro || '';
          form.bairro.value = data.bairro || '';
          form.cidade.value = data.localidade || '';
          form.estado.value = data.uf || '';
        }
      })
      .catch(() => {
        msgErro.textContent = 'Erro ao consultar o CEP. Tente novamente.';
      });
  });

  
});
