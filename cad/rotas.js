const express = require('express'); // ✅ Importa o Express
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('./db.js');


// Rota de registro
router.post('/register', async (req, res) => {
    const { cpf ,usuario, email , senha, confirmarSenha } = req.body;

    // Validação básica
    if (!usuario || !senha || !confirmarSenha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    if (senha !== confirmarSenha) {
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    try {
        // Criptografa a senha
        const hash = await bcrypt.hash(senha, 10);

        // Insere no banco
        db.query(
            'INSERT INTO usuarios (nome,cpf, email, senha) VALUES (?, ?, ?,?)',
            [usuario,cpf, email || null, hash],
            (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Usuário já existe' });
                }
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ 
                message: 'Usuário cadastrado com sucesso!',
                id_usuario: result.insertId
            });
            }
        );

    } catch (err) {
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;
