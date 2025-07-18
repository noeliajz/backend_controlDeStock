/* require('dotenv').config(); 

const Server = require('./server/server');
const server = new Server();

server.listen();
 */
const serverless = require('serverless-http');
const Server = require('../server/server');
const conectarbd = require('../dataBase/config');

const server = new Server();

conectarbd();

module.exports = serverless(server.app);
