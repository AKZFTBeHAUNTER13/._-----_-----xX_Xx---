const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Pasta onde ficam os arquivos RAW
const RAW_FOLDER = path.join(__dirname, 'raw_scripts');

// Endpoint para acessar um arquivo pelo nome, exemplo: /raw/meuscript.lua
app.get('/raw/:filename', (req, res) => {
  const filename = req.params.filename;

  // Caminho do arquivo
  const filePath = path.join(RAW_FOLDER, filename);

  // Verifica se o arquivo existe
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Arquivo não encontrado');
  }

  // Lê o arquivo e retorna como texto puro
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler arquivo');

    // Define Content-Type para texto plano (RAW)
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor RAW rodando em http://localhost:${PORT}`);
});
