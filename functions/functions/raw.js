let storage = require('./upload').storage;

exports.handler = async function (event) {
  const id = event.queryStringParameters.id;
  const ua = event.headers['user-agent'] || '';

  if (!id || !storage[id]) {
    return { statusCode: 404, body: 'Código não encontrado' };
  }

  const isRoblox = ua.includes('Roblox') || event.headers['referer'] === 'loadstring';

  if (!isRoblox) {
    return {
      statusCode: 403,
      headers: { 'Content-Type': 'text/html' },
      body: `<h1 style="text-align:center;margin-top:20%">Você não tem autorização para acessar diretamente.</h1>`
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: storage[id]
  };
};
