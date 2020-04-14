const express = require('express')
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const _ = require('underscore')

const app = express()

app.get('/usuario', function (req, res) {
    let from = req.query.from || 0  // Manejo de query params
    let limite = req.query.limite || 5

    // Controlamos los campos que queremos ver en la respuesta del servicio
    // con el segundo parámetro del find
    Usuario.find({estado: true}, 'nombre email role estado google img') 
        .skip(new Number(from))
        .limit(new Number(limite))
        .exec( (err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            Usuario.countDocuments({estado: true}, (err, conteo) => {
                res.json({
                    ok: true,
                    conteo,
                    usuarios
                })
            })
        })
  })
  
app.post('/usuario', function (req, res) {
    let body = req.body
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //Ciframos la contraseña del usuaurio
        role: body.role
    })

    usuario.save( (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})

app.put('/usuario/:id', function(req, res) {
    let userId = req.params.id  // Manejo de path params
    let body = _.pick(req.body, ['nombre','email','img','role','estado'])
    

    Usuario.findByIdAndUpdate(userId, body, {new: true, runValidators: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
    
})

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id

    // Borrado lógico
    let body = {estado: false}
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })

    // //borrando físico
    // Usuario.findByIdAndDelete(id, (err, usuarioBorrado) => {
    //     if (err) {
    //         return res.status(400).json({
    //             ok: false,
    //             err
    //         })
    //     }
    //     if (!usuarioBorrado) {
    //         return res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'Usuario no encontrado'
    //             }
    //         })
    //     }
    //     res.json({
    //         ok: true,
    //         usuario: usuarioBorrado
    //     })
    // })
})

module.exports = app