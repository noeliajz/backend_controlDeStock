require("dotenv").config();
const { validationResult } = require("express-validator");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUser = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json({ msg: "Se envían todos los usuarios", allUsers });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "No se encontraron usuarios" });
  }
};

const getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getUser = await UserModel.findOne({ _id: id });
    if (!getUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json({ msg: "Usuario encontrado", getUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    const { nombres, apellido, usuario, contrasenia } = req.body;

    const userExist = await UserModel.findOne({ usuario });

    if (userExist) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    const salt = await bcrypt.genSaltSync();
    const hashedPassword = await bcrypt.hash(contrasenia, salt);

    const newUser = new UserModel({
      nombres,
      apellido,
      usuario,
      contrasenia: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ msg: "Usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};


const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }
    
   
     const updateUser = await UserModel.findByIdAndUpdate(
     
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    
    if (!updateUser) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
 
    res.status(200).json({ msg: "Usuario actualizado correctamente", updateUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userDeleted = await UserModel.findByIdAndDelete({ _id: req.params.id });

    if (!userDeleted) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

const loginUser = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array() });
      }
  
      const { usuario, contrasenia } = req.body;
      const userExist = await UserModel.findOne({ usuario });
  
      if (!userExist) {
        return res.status(400).json({ msg: "El usuario no existe" });
      }
  
      const passCheck = await bcrypt.compareSync(contrasenia, userExist.contrasenia);
      console.log( userExist)
      if (!passCheck) {
        return res.status(400).json({ msg: "Usuario y/o contraseña incorrectos" });
      }
  
      const jwPayload = {
        usuario: {
          id: userExist.id,
          username: userExist.usuario,
        },
      };
  
      const token = jwt.sign(jwPayload, process.env.SECRET_KEY, { expiresIn: "1h" });
  
      const role = userExist.role || "user"; 
  
      await UserModel.findByIdAndUpdate(userExist._id, { token });
  
      res.status(200).json({ token, role });
    } catch (error) {
      console.error("Error en login:", error);
      res.status(500).json({ msg: "Error en el servidor" });
    }
  };
  
module.exports = {
  getAllUser,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
