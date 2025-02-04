const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now // Guarda la fecha actual automáticamente
    }
});

const Producto = mongoose.model('Producto', ProductoSchema);

module.exports = Producto;
