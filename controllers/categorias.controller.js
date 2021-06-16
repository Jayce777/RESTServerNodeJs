const { request, response } = require("express");

const Categoria=require('../models/categoria');

//Obtener todas las categorías - público    
const CategoriasGet=async(req=request,res=response)=>{
   
    const {limit=20,start=0}=req.query;

    const queryestado={estado:true};

    const [total,categorias]=await Promise.all([
     Categoria.countDocuments(queryestado)
     .skip(Number(start))
     .limit(Number(limit)),
     Categoria.find(queryestado)
     .skip(Number(start))
     .limit(Number(limit))
     .populate('usuario','nombre')
    ]);
    
        res.json({
    
            total,
            categorias
        })
    

};  

//Obtener categoría por ID - público
const CategoriaGetByID=async(req=request,res=response)=>{

        const id=req.params.id;
        const categoria=await Categoria.findById(id).populate('usuario','nombre')
        //console.log(categoria);
        res.json({
            categoria
        })
};

//Crear nueva categoría - privado post
const CategoriaPost=async(req=request,res=response)=>{
    
    const nombre=req.body.nombre.toUpperCase();

    const categoriaDB= await Categoria.findOne({nombre});

    if(categoriaDB){

        return res.status(400).json({

            msg:`Ya existe una categoría con el nombre ${nombre}`
        })
    }

    const data={
        nombre,
        usuario:req.usuarioautenticado._id
    }
    const categoria=new Categoria(data);
    categoria.save();

    res.status(201).json({

        msg:'Categoría creada correctamente',
        categoria
    })


};

//Actualizar categoría por ID - privado
const CategoriaPutByID=async(req=request,res=response)=>{
    
    const {id}=req.params;
    const {estado,usuario,...restbody}=req.body;

    restbody.nombre=restbody.nombre.toUpperCase();
    restbody.usuario=req.usuarioautenticado._id;
   

    const updatecategoria=await Categoria.findByIdAndUpdate(id,restbody,{new:true});

    res.json({
        updatecategoria
    })


};

//Borrar categoría por ID - privado - solo roles permitidos
const CategoriaDeleteByID=async(req=request,res=response)=>{
    
    const{id}=req.params;

    const categoria=await Categoria.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(
        categoria
    );

};






module.exports={
    CategoriasGet,
    CategoriaGetByID,
    CategoriaPost,
    CategoriaPutByID,
    CategoriaDeleteByID
}