function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');

    if (cep !== "") {
        var validacep = /^[0-9]{8}$/;

        if (validacep.test(cep)) {
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('estado').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('regiao').value = "...";
            document.getElementById('ibge').value = "...";
            document.getElementById('ddd').value = "...";

            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro na requisição');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.erro) {
                        alert('CEP não encontrado');
                        return;
                    }

                    document.getElementById('rua').value = data.logradouro || "";
                    document.getElementById('bairro').value = data.bairro || "";
                    document.getElementById('cidade').value = data.localidade || "";
                    document.getElementById('estado').value = data.estado || "";
                    document.getElementById('uf').value = data.uf || "";
                    document.getElementById('regiao').value = data.regiao || "";
                    document.getElementById('ibge').value = data.ibge || "";
                    document.getElementById('ddd').value = data.ddd || "";
                })
                .catch(error => {
                    alert('Erro ao buscar CEP: ' + error.message);
                });
        } else {
            alert('Formato de CEP inválido.');
        }
    }
}
