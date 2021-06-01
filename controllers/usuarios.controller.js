
const{response,request} =require('express');

const UsuariosGet=(req=request, res=response)=> {
    
    const {apikey,tel='Teléfono vacío'}=req.query;
    res.json({
        id:1,
        estado:'GET - Controlador',
        apikey,
        tel
    });
}

const UsuariosPost= (req, res=response)=> {

    const {nombre,edad}=req.body
    res.json({
        id:1,
        estado:'POST - Controlador',
        nombre,
        edad
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