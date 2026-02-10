const API_URL = 'http://localhost:8080/usuario';

        document.getElementById("registerForm").addEventListener("submit", function (event) {
            event.preventDefault(); 

            const username = document.getElementById("username").value;
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const zip = document.getElementById("zip").value;
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;

            if (password !== confirmPassword) {
                alert("As senhas não coincidem!");
                return;
            }

            const userData = {
                username: username,
                nome: name,
                email: email,
                endereco: zip,
                senha: password,
                perfil: 'USER' 
            };

            axios.post(API_URL, userData)
                .then(response => {
                    alert("Usuário cadastrado com sucesso!");
                    window.location.href = "login.html";
                })
                .catch(error => {
                    console.error('Erro ao cadastrar usuário:', error);
                    alert("Ocorreu um erro ao cadastrar o usuário.");
                });
        });