const express = require('express');
const cors = require('cors');
const app = express();

// Importa rotas (mesma pasta do server.js)
const rotas = require('./rotas.js');

// Middleware
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use('/api', rotas);

// Teste de conexão com o banco
const db = require('./db');
app.get('/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).send('❌ Erro no banco: ' + err.message);
    res.send('✅ Banco conectado! Resultado: ' + results[0].resultado);
  });
});

// Sobe servidor
app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
