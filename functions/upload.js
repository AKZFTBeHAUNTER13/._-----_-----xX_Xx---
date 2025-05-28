const { v4: uuidv4 } = require('uuid');

let storage = {}; // Em produção, salve isso num banco ou bucket

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Método não permitido' };
  }

  const boundary = event.headers['content-type'].split('boundary=')[1];
  const body = Buffer.from(event.body, 'base64').toString('utf8');
  const match = body.match(/filename=".*?\.lua"\r\nContent-Type:.*?\r\n\r\n([\s\S]*?)\r\n--/);

  if (!match || !match[1]) {
    return { statusCode: 400, body: 'Envie um arquivo .lua válido.' };
  }

  const luaCode = match[1];
  const id = uuidv4().slice(0, 8);
  storage[id] = luaCode;

  return {
    statusCode: 200,
    body: JSON.stringify({ rawUrl: `/api/raw?id=${id}` })
  };
};
