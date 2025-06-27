const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { crearProducto, editarProducto, eliminarProducto, obtenerTodosProductos, obtenerUnProducto} =require( '../controllers/product');
const auth = require('../middleware/auth');
const multer = require('multer');
const storage = multer.diskStorage({ /* igual que arriba */ });
const upload = multer({ storage });

router.get('/', auth(['admin', 'user']), obtenerTodosProductos);
router.get('/:id', auth('admin'),obtenerUnProducto);
router.delete('/:id', auth('admin') , eliminarProducto);

router.post('/',[
    check('nombre')
    .notEmpty()
    .withMessage('el campo nombre esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo nombre debe tener entre 3 y 25 caracteres máximo'),
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
    .withMessage('el descripcion  debe tener como minimo 3 y maximo 25 caracteres'),
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha '),
    check('categoria')
    .notEmpty()
    .withMessage('el campo categoria esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo categoria debe tener entre 3 y 35 caracteres máximo')

], auth('admin'), upload.single('imagen') ,crearProducto),
router.put('/:id', [
    check('nombre')
    .notEmpty()
    .withMessage('el campo nombre esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo nombre debe tener entre 3 y 25 caracteres máximo'),
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
    .withMessage('el descripcion  debe tener como minimo 3 y maximo 25 caracteres'),
    check('fecha')
    .notEmpty()
    .withMessage('el campo fecha esta vacio')
    .isDate()
    .withMessage(' debe ser del tipo fecha '),
    check('categoria')
    .notEmpty()
    .withMessage('el campo categoria esta vacio')
    .isLength({min:3 , max: 25 })
    .withMessage(' el campo categoria debe tener entre 3 y 35 caracteres máximo'), 
], auth('admin') , editarProducto)
    
    

module.exports= router