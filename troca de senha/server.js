// server.js
const express = require('express');
const cors = require('cors');
const trocarSenhaRouter = require('./rota');
const db = require('./db');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', trocarSenhaRouter);

// Rota teste de conexão com o banco
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).send('❌ Erro no banco: ' + err.message);
    res.send('✅ Banco conectado! Resultado: ' + results[0].resultado);
  });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
