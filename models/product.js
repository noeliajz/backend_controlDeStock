const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    precio: {
        type: Number,
        required: true,
        min: 1,
        max:1000000000,
    },
    descripcion: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    stock: {
        type: Number,
        required: true,
        min: 1,
        max:1000000000,
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
