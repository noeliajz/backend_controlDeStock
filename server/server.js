// server.js
const express = require('express');
const morgan = require('morgan');
const conectarbd = require('../dataBase/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.middleware();
        this.routes();
    }

    middleware() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use('/api', require('../routes/user')); // Asegúrate de que 'user' esté bien definido
        this.app.use('/api/product', require('../routes/product')); // Ruta para productos
    }

    listen() {
        conectarbd();
        this.app.listen(this.port, () => {
            console.log('Servidor en linea', this.port);
        });
    }
}

module.exports = Server;
