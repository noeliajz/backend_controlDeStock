const serverless = require('serverless-http');
const Server = require('../server/server');
const conectarbd = require('../dataBase/config');

// Instanciás tu app
const server = new Server();

// Conectás a la base de datos
conectarbd();

// Exportás la app adaptada como función serverless
module.exports = serverless(server.app);
