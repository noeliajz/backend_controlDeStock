const Producto = require("../models/product");
const Usuario = require("../models/user");

const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, descripcion, stock, categoria } = req.body;

    if (!req.file) {
      return res.status(400).json({ mensaje: 'Imagen requerida' });
    }

    let productoExistente = await Producto.findOne({ nombre });

    if (productoExistente) {
      productoExistente.stock += parseInt(stock);
      await productoExistente.save();
      return res.status(200).json({
        mensaje: 'Stock actualizado con éxito',
        producto: productoExistente,
      });
    }

    const nuevoProducto = new Producto({
      nombre,
      precio,
      descripcion,
      stock,
      categoria,
      imagen: req.file.filename,
    });

    await nuevoProducto.save();

    res.status(201).json({
      mensaje: 'Se creó el producto con éxito',
      producto: nuevoProducto,
    });
  } catch (error) {
    console.error('Error al crear o actualizar producto:', error);
    res.status(400).json({
      mensaje: 'Error al crear o actualizar producto',
      detalles: error.errors || error.message,
    });
  }
};

const obtenerTodosProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json({
            mensaje: 'Se encontraron los productos',
            productos
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar productos'
        });
    }
};

const editarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Producto actualizado',
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al actualizar el producto'
        });
    }
};

const obtenerUnProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Producto encontrado',
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al encontrar el producto'
        });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.status(200).json({
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
};

module.exports = {
    eliminarProducto, crearProducto, editarProducto, obtenerTodosProductos, obtenerUnProducto
};
