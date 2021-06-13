const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { GenerarJWT } = require("../helpers/generar-JWT");



const Login = async (req, res = response) => {
    const { correo, contrasena } = req.body;

    try {

        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({

                msg: 'Usuario o contraseña incorrectos - u'
            })
        }
        // verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({

                msg: 'Usuario o contraseña incorrectos - estado'
            })
        }
        // verficar contrasena
        const validacontrasena = bcryptjs.compareSync(contrasena, usuario.contrasena);
        if (!validacontrasena) {
            return res.status(400).json({

                msg: 'Usuario o contraseña incorrectos - contraseña'
            })
        }

        // generar JWT
        const token =await GenerarJWT(usuario.id);

        res.json({
            msg: 'Sesión iniciada correctamente',
            usuario,
            token

        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Se produjo un error, contáctese con el administrador'
        })
    }




};


module.exports = {
    Login
}