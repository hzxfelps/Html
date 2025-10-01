document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const operacao = document.getElementById("operacao").value;

    let resultado = 0;
    let erro = 0;

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