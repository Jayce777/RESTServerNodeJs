const { request, response } = require("express");
const jwt = require('jsonwebtoken');



const ValidaJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        res.status(401).json({

            msg: 'No se ha enviado un token en la cabecera'
        })
    }
   // console.log(token);
    try {

        const { uid } = jwt.verify(token, process.env.SECRETTOPRIVATEKEY);

       // const usuario = await Usuario.findById({ _id: uid });

        //validar si el usuario existe
        if (!usuario) {

            return res.status(401).json({

                msg: 'El usuario no existe'
            })
        }

        //valida que el usuario esté activo
        if (!usuario.estado) {

            return res.status(401).json({

                msg: 'Token no válido - usuario no existe'
            })
        }
        req.usuarioautenticado = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({

            msg: 'El token no es válido'
        })
    }

};

module.exports = {
    ValidaJWT
}