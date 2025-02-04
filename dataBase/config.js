const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno

const conectarbd = async () => {
    try {
        const uri = process.env.MONGO_CONNECT; // ← Aquí usamos MONGO_CONNECT
        if (!uri) {
            throw new Error(" ERROR: La variable de entorno MONGO_CONNECT no está definida.");
        }

        console.log('🔎 Intentando conectar a:', uri); // Depuración

        await mongoose.connect(uri, {
            tls: true,
            tlsAllowInvalidCertificates: false
        });

        console.log(' Conectado a la base de datos'); // Mueve este log aquí

    } catch (error) {
        console.error(' No se pudo conectar con MongoDB:', error.message);
        process.exit(1); // Detener la ejecución si falla la conexión
    }
};

module.exports = conectarbd;
