const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}

let Schema = mongoose.Schema
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    }, 
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    }, 
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    }, 
    img: {
        type: String,
        required: false
    }, 
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    }, 
    estado: {
        type: Boolean,
        default: true
    }, 
    google: {
        type: Boolean,
        default: false
    }
})

// Vamos a modificar la impresión JSON del schema usuario para que no lleve
// el password al retornar en el servicio
usuarioSchema.methods.toJSON = function() { //Usamos función usual porque necesitamos el this
    let user = this
    let userObject = user.toObject()
    delete userObject.password
    
    return userObject
}

usuarioSchema.plugin(uniqueValidator, {
    message:'{PATH} debe ser único'
})
module.exports = mongoose.model('Usuario', usuarioSchema)