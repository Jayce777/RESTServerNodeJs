const { response, request } = require("express");
const bcryptjs = require('bcryptjs');


const{GenerarJWT,VerificarTokenGoogle}=require('../helpers');



const Login = async (req, res = response) => {
    
    res.json({
        msg: 'Sesión iniciada correctamente',
        usuario,
        token

    });




};

const LoginGoogle = async (req = request, res = response) => {

    res.json({
        msg: 'Sesión de google iniciada correctamente',
      

    })


}


module.exports = {
    Login,
    LoginGoogle
}