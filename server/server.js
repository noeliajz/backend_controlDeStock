const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
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
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api', require('../routes/user'));
        this.app.use('/api/product', require('../routes/product'));
    }

    listen() {
        conectarbd();
        this.app.listen(this.port, () => {
            console.log('Servidor en línea en el puerto', this.port);
        });
    }
}

module.exports = Server;
