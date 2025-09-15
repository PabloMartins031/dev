document.querySelectorAll('.olhinho').forEach(olho => {
    olho.addEventListener('click', () => {

    const input = olho.previousElementSibling;
    
    if (input.type === 'password') {
        input.type = 'text';
        olho.src = '../Icones/olhoaberto.png'; // ícone aberto
    } else {
        input.type = 'password';
        olho.src = '../Icones/olhofechado.png'; // ícone fechado
    }

    })
})

async function login() {
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }) // ✅ corrigido
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.erro || 'Falha no login');
    }

    alert(`✅ Login bem-sucedido! Bem-vindo, ${data.nome}`);
    localStorage.setItem('usuario_id', data.id_usuario);

  } catch (err) {
    console.error('Erro no login:', err);
    alert(`❌ Login falhou: ${err.message}`);
  }
}
