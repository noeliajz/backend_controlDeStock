const { validationResult } = require("express-validator")
const UserModel = require("../models/user")
const bcrypt = require('bcryptjs')
const { JsonWebTokenError } = require("jsonwebtoken")

const getAllUser = async(req, res) => {
   try {
    const allUsers = await UserModel.find()
    res.status(200).json({msg:'Se envian todos los usuarios', allUsers})
   } catch (error) {
    console.log(error)    
    res.status(400).json({msg: 'No se encontraron usuarios'})
   }
}

const getOneUser = async(req, res) => {
    try {
     const id = req.params.id
     const getUser = await UserModel.findOne({_id:id})
     res.status(200).json({msg:'Usuario encontrado', getUser})
    } catch (error) {
     console.log(error)    
     res.status(404).json({msg: 'No se encontro el usuario'})
    }
 }

const createUser = async(req, res ) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }
        const body= req.body
        const userExist =await UserModel.findOne({
            usuario: body.usuario
        })
        if(userExist){
            return res.status(400).json({msg: 'El usuario ya existe'})}

            const salt = await bcrypt.genSaltSync()
            body.contrasenia = await bcrypt.hash(body.contrasenia, salt)
            const user= new UserModel(body)
            await user.save() 
            console.log(user)
            res.status(201).json({msg:'Usuario creado'})
        } catch (error) {
            console.log(error)       
    }
}

const updateUser = async ( req, res) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }
        const updateUser = await UserModel.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.status(200).json({msg: 'Usuario actualizado'})

    } catch (error) {
        console.log(error)
        res.status(400).json({msg:'No se actualizo el usuario'})
    }
}

const deleteUser = async (req, res) => {
    try {
        await UserModel.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg:'usuario eliminado'})
    } catch (error) {
        console.log(error)
        res.status(404).json({msg:'no se elimino el usuario'})
    }
}

const loginUser= async(req, res) => {
    try {
        const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()})
    }
    const {usuario, contrasenia} = req.body
    const userExist = await UserModel.findOne({usuario})
    if(!userExist){
        return res.status(400).json({msg:'el usuario no existe'})
    }
    const passCheck= await bcrypt.compare( contrasenia, userExist.contrasenia)
    res.send('Usuario logueado')
    if(passCheck){
        const jwPayload = {
            usuario: {
                id: userExist.id,
                username: userExist.usuario
            }
        }
        const token  = jwt.sign(jwtPayload, process.env.SECRET_KEY)
        userExist.token= token
        const userUpdate = await UserModel.findByIdAndUpdate({_id:userExist._id, userExist, new: true})
        res.status(200).json({msg: 'usuario logueado'})
    }else{
        res.status(422).json({msg: 'usuario y/o contraseña incorrectos'})
    }
} catch (error) {
        console.log(error)
    }
}

/* const logoutUser = async (req, res) => {
    const userId = await UserModel.findOne({req.userLoginId})
    userId.token =''
    const userLogout = await UserModel.findByIdAndUpdate(
        {_id: req.userLoginId}, userId, {new: true
    })
    res.status(200).json({msg:'usuario deslogueado'})
} */

module.exports = {
    getAllUser, createUser, updateUser, deleteUser, loginUser/* , logoutUser */
}