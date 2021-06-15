const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const{GenerarJWT,VerificarTokenGoogle}=require('../helpers');



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

const LoginGoogle = async (req = request, res = response) => {

    const { id_token } = req.body;


    try {

        const { nombre, img, correo } = await VerificarTokenGoogle(id_token);

        let usuario =await Usuario.findOne({ correo });

        // Si no existe un usuario con el correo enviado, crear uno nuevo
        if (!usuario) {
            const data = {
                nombre,
                correo,
                contrasena: 'google',// La contraseña debe ir llena
                img,
                google: true
            };
            usuario = new Usuario(data);
            console.log(usuario);
            await usuario.save();
        }

        // Usuario activo en BDD

        if (!usuario.estado) {

            return res.status(401).json({

                msg: 'El usuario de google no puede ser autenticado'
            })
        }

         // generar JWT
         const token =await GenerarJWT(usuario.id);

        res.json({
            msg: 'Sesión de google iniciada correctamente',
           usuario,
           token

        })

    } catch (error) {
        res.status(400).json({
            msg: 'Id token de google inválido'
        })
    }


}


module.exports = {
    Login,
    LoginGoogle
}