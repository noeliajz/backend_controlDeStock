const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

module.exports = (role) => async (req, res, next) => {
    try {
        const token = req.header('authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ msg: 'No hay token, autorización denegada' });
        }

        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const userLogin = await UserModel.findOne({ _id: verifyToken.usuario.id, token });

        if (userLogin && userLogin.role === role) {
            req.userLoginId = userLogin._id;
            next();
        } else {
            res.status(401).json({ msg: 'Usuario no autorizado' });
        }
    } catch (error) {
        res.status(400).json({ msg: 'Token inválido' });
    }
};
