const { Router } = require('express');
const { check } = require('express-validator');  // ✅ Importa correctamente
const router = Router();
const { getAllUser, createUser, updateUser, deleteUser, loginUser, logoutUser, getOneUser} = require('../controllers/user');
const auth = require('../middleware/auth');  // ✅ Ahora `auth` está bien exportado

router.get('/', /* auth('user'), */ getAllUser);
router.get('/:id', /* auth('user'), */ getOneUser);

router.post('/login', [
    check('usuario', 'El usuario está vacío').notEmpty(),
    check('usuario', 'Debe ser de tipo email').isEmail(),
    check('contrasenia', 'El campo contraseña está vacío').notEmpty(),
    check('contrasenia', 'Debe tener como mínimo 4 caracteres').isLength({ min: 4 })
], loginUser);

router.post('/', [
    check('nombres', 'El mínimo de caracteres es 3').isLength({ min: 3 }),
    check('nombres', 'El campo nombres está vacío').notEmpty(),
    check('apellido', 'El mínimo de caracteres es 3').isLength({ min: 3 }),
    check('apellido', 'El campo apellido está vacío').notEmpty(),
    check('usuario', 'El usuario está vacío').notEmpty(),
    check('usuario', 'Debe ser de tipo email').isEmail(),
    check('contrasenia', 'El campo contraseña está vacío').notEmpty(),
    check('contrasenia', 'Debe tener como mínimo 4 caracteres').isLength({ min: 4 }),
], createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;
