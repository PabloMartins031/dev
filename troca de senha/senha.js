async function troca_senha() {
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmarSenha").value.trim();
  const email = document.getElementById("email").value.trim();

  // validação básica
  if (!senha || !confirmar || !email) {
    alert("Preencha todos os campos!");
    return;
  }

  if (senha !== confirmar) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/trocar-senha", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email, novaSenha: senha })
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.mensagem); // sucesso
      form.reset(); // limpa o formulário
    } else {
      alert(data.erro); // erro do servidor
    }
  } catch (err) {
    console.error("Erro na requisição:", err);
    alert("Ocorreu um erro ao trocar a senha.");
  }
}