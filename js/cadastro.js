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
  
});
