const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearProducto, editarProducto, eliminarProducto, obtenerTodosProductos, obtenerUnProducto} =require( '../controllers/product')

router.get('/',  obtenerTodosProductos);
router.get('/:id', obtenerUnProducto);
router.delete('/:id', eliminarProducto);

router.post('/',[
    check('nombre')
    .notEmpty()
    .withMessage('el campo nombre esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo nombre debe tener entre 3 y 35 caracteres máximo'),
    check('precio')
    .notEmpty()
    .withMessage('el campo precio esta vacío')
    .isNumeric()
    .withMessage('el campo precio debe ser del tipo numerico')
    .custom((value) => {
        if(value >= 1 && value <=1000000000){
            return true
        } else{
            throw new Error('el precio debe estar entre 1 y 1000000000')
        }
    }),
    check('stock')
    .notEmpty()
    .withMessage('el campo stock esta vacío')
    .isNumeric()
    .withMessage('el campo precio debe ser del tipo numerico')
    .custom((value) => {
        if(value >= 1 && value <=1000000000){
            return true
        } else{
            throw new Error('el stock debe estar entre 1 y 1000000000')
        }
    }),
    check('descripcion')
    .notEmpty()
    .withMessage('el campo descripción esta vacio')
    .isLength({min: 3, max:25})
    .withMessage('el descripcion  debe tener como minimo 3 y maximo 30 caracteres'),
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha ')

], crearProducto),
router.put('/:id', [
    check('nombre')
    .notEmpty()
    .withMessage('el campo nombre esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo nombre debe tener entre 3 y 35 caracteres máximo'),
    check('precio')
    .notEmpty()
    .withMessage('el campo precio esta vacío')
    .isNumeric()
    .withMessage('el campo precio debe ser del tipo numerico')
    .custom((value) => {
        if(value >= 1 && value <=1000000000){
            return true
        } else{
            throw new Error('el precio debe estar entre 1 y 1000000000')
        }
    }),
    check('descripcion')
    .notEmpty()
    .withMessage('el campo descripción esta vacio')
    .isLength({min: 3, max:25})
    .withMessage('el descripcion  debe tener como minimo 3 y maximo 30 caracteres'),
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha ') 
], editarProducto)
    
    

module.exports= router