
/////////// Cadastro///////////
async function cadastro() {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const confirmar = document.getElementById("confirmarSenha").value.trim();

  // Primeiro validação no frontend
  if (senha !== confirmar) {
    alert("⚠️ As senhas não coincidem!");
    return;
  }

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirmar,
        cpf: cpf
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Falha ao registrar usuário');
    }

    const id_usuario = data.id_usuario;

    if (!id_usuario) throw new Error('ID de usuário não retornado pelo servidor');

    alert(`✅ Cadastro realizado com sucesso! Seu ID: ${id_usuario}`);
    localStorage.setItem('usuario_id', id_usuario);

  } catch (err) {
    console.error('Erro no cadastro:', err);
    alert(`❌ Cadastro falhou: ${err.message}`);
  }
}
