const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");
const auth = (rolesPermitidos = []) => {
  return async (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ msg: "No se proporcionó el token." });
    }
    try {
      const  buscandoUsuario  = jwt.verify(token, process.env.SECRET_KEY);
      console.log(buscandoUsuario)
      const usuario = await Usuario.findById(buscandoUsuario?.usuario.id);
      if (!usuario) {
        return res.status(401).json({ msg: "Token no válido - usuario no encontrado." });
      }
      if (!rolesPermitidos.includes(usuario.role.toLowerCase())) {
        return res.status(403).json({ msg: "No tiene permisos para acceder a este recurso." });
      }
      req.usuario = usuario;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ msg: "Token no válido." });
    }
  };
};
module.exports = auth ;






