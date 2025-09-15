const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db.js');

router.post('/login', (req, res) => {
  const { email, senha } = req.body; // 🔹 usa email, igual no frontend

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro no login' });
    if (results.length === 0) return res.status(401).json({ erro: '❌ Usuário não encontrado' });

    const usuarioDb = results[0];
    const match = await bcrypt.compare(senha, usuarioDb.senha);

    if (match) {
      res.status(200).json({
        id_usuario: usuarioDb.id_usuario, // nome correto da coluna
        nome: usuarioDb.nome
      });
    } else {
      res.status(401).json({ erro: '❌ Senha incorreta' });
    }
  });
});

module.exports = router;
