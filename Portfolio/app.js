document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("j4-vI80yisWbqMFHB");

    const form = document.getElementById("formulario");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            emailjs.sendForm("service_emailjs", "template_testeAPI", this)
                .then(function (response) {
                    alert("Mensagem enviada com sucesso!");
                    form.reset();
                }, function (error) {
                    alert("Erro ao enviar: " + JSON.stringify(error));
                });
        })
    } else {
        console.error("Formulário não encontrado!");
    }
}
)
