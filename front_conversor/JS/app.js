document.getElementById('formulario').addEventListener('submit', async function (e) {
    e.preventDefault();
    const temp = parseFloat(document.getElementById('temp').value);
    const de = document.getElementById('de').value;
    const para = document.getElementById('para').value;

    try {
        const response = await fetch('http://localhost:8080/conversor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                temp: temp,
                de: de,
                para: para
            })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        if (data.erro) {
            document.getElementById('erro').textContent = data.erro;
        } else {
            document.getElementById('resultado').textContent = 'Resultado: ' + data.resultado;
        }

    } catch (err) {
        document.getElementById('erro').textContent = 'Erro: ' + err.message;
    }


    
});

/*
switch (operacao) {
    case "somar":
        resultado = num1 + num2;
        break;
    case "subtrair":
        resultado = num1 - num2;
        break;
    case "multiplicar":
        resultado = num1 * num2;
        break;
    case "dividir":
        if (num2 == 0) {
            erro = "Não é possível dividir por zero!";
        } else {
            resultado = num1 / num2;
        }
        break;
    default:
        erro = "Operação inválida!";
}


if (erro == 0) {
    document.getElementById("resultado").textContent = resultado;
} else {
    document.getElementById("erro").textContent = erro;
}
})

*/
