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

    function validarFormulario() {
        const campos = [
            { id: 'instituicao', nome: 'Nome da Instituição' },
            { id: 'tipo-ajuda', nome: 'Tipo de Ajuda' },
            { id: 'titulo', nome: 'Título da Necessidade' },
            { id: 'descricao', nome: 'Descrição Detalhada' },
            { id: 'cep', nome: 'CEP' },
            { id: 'rua', nome: 'Rua' },
            { id: 'bairro', nome: 'Bairro' },
            { id: 'cidade', nome: 'Cidade' },
            { id: 'estado', nome: 'Estado' },
            { id: 'contato', nome: 'Contato' }
        ];
        for (const campo of campos) {
            if (!form[campo.id].value.trim()) {
                msgErro.textContent = `Preencha o campo: ${campo.nome}`;
                form[campo.id].focus();
                return false;
            }
        }

        if (!/^\d{5}-?\d{3}$/.test(form.cep.value.trim())) {
            msgErro.textContent = 'Digite um CEP válido (00000-000)';
            form.cep.focus();
            return false;
        }

        const contato = form.contato.value.trim();
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contato);
        const telValido = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/.test(contato);

        if (!emailValido && !telValido) {
            msgErro.textContent = 'Digite um e-mail ou telefone válido!';
            form.contato.focus();
            return false;
        }

        return true;
    }

    function salvarNecessidade(dados) {
        let necessidades = [];
        try {
            necessidades = JSON.parse(localStorage.getItem('necessidades')) || [];
        } catch (e) {
            necessidades = [];
        }
        necessidades.push(dados);
        localStorage.setItem('necessidades', JSON.stringify(necessidades));
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        msgErro.textContent = '';
        msgSucesso.textContent = '';

        if (!validarFormulario()) return;

        const dados = {
            instituicao: form.instituicao.value.trim(),
            tipoAjuda: form['tipo-ajuda'].value,
            titulo: form.titulo.value.trim(),
            descricao: form.descricao.value.trim(),
            cep: form.cep.value.trim(),
            rua: form.rua.value.trim(),
            bairro: form.bairro.value.trim(),
            cidade: form.cidade.value.trim(),
            estado: form.estado.value.trim(),
            contato: form.contato.value.trim(),
            dataCadastro: new Date().toISOString()
        };

        salvarNecessidade(dados);

        msgSucesso.textContent = 'Necessidade cadastrada com sucesso!';
        form.reset();

        document.querySelector('.main-container').scrollIntoView({ behavior: 'smooth' });

        if (typeof mostrarMensagemRapida === "function") {
            mostrarMensagemRapida('Necessidade cadastrada!', 'sucesso');
        }
    });
});
