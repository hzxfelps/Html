document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacao = document.getElementById("operacao").value;

    let resultado = 0;
    let erro = 0;

    try {
        const response = await fetch("http://localhost:8080/calcular", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
                //application/x-www-form-urlencoded
            },
            body: new URLSearchParams({
                num1,
                num2,
                operacao
            })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        if (data.erro) {
            document.getElementById('erro').textContent = data.erro;
        } else {
            document.getElementById('resultado').textContent = data.resultado;
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