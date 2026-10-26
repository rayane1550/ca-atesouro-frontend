const fs = require('fs');
const path = require('path');
const Fastify = require('fastify');

const fastify = Fastify({
  logger: false,
});

const { renderInicialPage } = require('./src/pages/inicial');
const { renderHomePage } = require('./src/pages/home');

function readJsonFile(fileName) {
  const filePath = path.join(__dirname, 'data', fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function serveStaticFile(filePath, contentType) {
  return async function handler(request, reply) {
    const absolutePath = path.join(__dirname, 'public', filePath);

    if (!fs.existsSync(absolutePath)) {
      return reply.code(404).send({ error: 'Arquivo não encontrado' });
    }

    const content = fs.readFileSync(absolutePath);
    return reply.type(contentType).send(content);
  };
}

fastify.get('/', async (request, reply) => {
  return reply.type('text/html').send(renderInicialPage());
});

fastify.get('/home', async (request, reply) => {
  return reply.type('text/html').send(renderHomePage());
});

fastify.get('/css/:file', serveStaticFile('css/:file', 'text/css'));
fastify.get('/js/:file', serveStaticFile('js/:file', 'application/javascript'));

fastify.get('/api/personagens', async () => {
  return readJsonFile('personagens.json');
});

fastify.listen({ port: 3000, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});
