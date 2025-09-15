// rota.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('./db'); // sua conexão com MySQL

// PUT /api/trocar-senha
router.put('/trocar-senha', async (req, res) => {
  try {
    const { email, novaSenha } = req.body;

    if (!email || !novaSenha) {
      return res.status(400).json({ erro: 'Informe o email e a nova senha' });
    }

    // Criptografa a nova senha
    const hash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha no banco
    db.query(
      'UPDATE usuarios SET senha = ? WHERE email = ?',
      [hash, email],
      (err, resultado) => {
        if (err) {
          console.error('Erro ao atualizar senha:', err);
          return res.status(500).json({ erro: 'Erro interno no servidor' });
        }

        if (resultado.affectedRows === 0) {
          return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json({ mensagem: 'Senha atualizada com sucesso!' });
      }
    );
  } catch (erro) {
    console.error('Erro na rota trocar-senha:', erro);
    res.status(500).json({ erro: 'Erro no servidor' });
  }
});

module.exports = router;
