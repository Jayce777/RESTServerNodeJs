
const{response,request} =require('express');
const bcryptjs=require('bcryptjs');

const Usuario=require('../models/usuario');

const UsuariosGet=async(req=request, res=response)=> {
    
    const {limit=5,start=0}=req.query;
    const queryestado={estado:true};

   const [total,usuarios]=await Promise.all([
    Usuario.countDocuments(queryestado)
    .skip(Number(start))
    .limit(Number(limit)),
    Usuario.find(queryestado)
    .skip(Number(start))
    .limit(Number(limit))
   ]);
   
    res.json({
        total,
        usuarios
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

const UsuariosPut= async (req, res=response)=> {

    const id=req.params.id;
    const {_id,google,correo,contrasena,...restbody}=req.body;

    if(contrasena){
        const salt=bcryptjs.genSaltSync(10);
        restbody.contrasena = bcryptjs.hashSync(contrasena, salt);
    }

    const usuarioUpdate=await Usuario.findByIdAndUpdate(id,restbody);

    res.json(
       
       usuarioUpdate
    );
}

const UsuariosDelete=  async(req,res=response)=> {

    const{id}=req.params;

    //const uid=req.uid;
    const usuarioautenticado= req.usuarioautenticado;
    //Borrar fisicamente
    //const usuario=await Usuario.findByIdAndDelete(id);
    const usuario=await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json(
       usuario
    );
}


module.exports={
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
};