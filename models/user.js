const mongoose = require('mongoose')
const UserSchema= new mongoose.Schema({
    nombres: String,
    apellido: String, 
    usuario:{
        type: String,
        unique: true,
        require: true
    },
    contrasenia: String,
    token: String,
    role: {
        type: String,
        default: 'user'
    }
    
})

const UserModel = mongoose.model('users', UserSchema)
module.exports = UserModel