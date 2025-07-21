const mongoose = require('mongoose');
require('dotenv').config(); 
const conectarbd = async () => {
    try {
        const uri = process.env.MONGO_CONNECT; 
        if (!uri) {
            throw new Error(" ERROR: La variable de entorno MONGO_CONNECT no está definida.");
        }

        console.log('🔎 Intentando conectar a:', uri); 

        await mongoose.connect(uri, {
            tls: true,
            tlsAllowInvalidCertificates: false
        });

        console.log(' Conectado a la base de datos'); 
    } catch (error) {
        console.error(' No se pudo conectar con MongoDB:', error.message);
        process.exit(1); 
    }
};

module.exports = conectarbd;
