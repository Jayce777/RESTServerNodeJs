
const{response,request} =require('express');
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/usuario');

const UsuariosGet=(req=request, res=response)=> {
    
    const {apikey,tel='Teléfono vacío'}=req.query;
    res.json({
        id:1,
        estado:'GET - Controlador',
        apikey,
        tel
    });
}

const UsuariosPost= async(req, res=response)=> {

    const {nombre,correo,contrasena,rol}=req.body
    const usuario=new Usuario( {nombre,correo,contrasena,rol});

    //verificar si el correo existe


    //encriptar contraseña
    const salt=bcryptjs.genSaltSync(10);
    usuario.contrasena = bcryptjs.hashSync(contrasena, salt);
    //guardar en base de datos
    await usuario.save();

    res.json({
       // estado:'POST - Controlador',
        usuario
    });
}

const UsuariosPut=  (req, res=response)=> {

    const id=req.params.id;

    res.json({
        id,
        estado:'PUT - Controlador'
    });
}

const UsuariosDelete=  (req,  res=response)=> {
    res.json({
        id:1,
        estado:'DELETE  - Controlador'
    });
}


module.exports={
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
};