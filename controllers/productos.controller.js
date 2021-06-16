const { request, response } = require("express");
const { populate } = require("../models/producto");

const Producto=require('../models/producto');

//Obtener todas las categorías - público    
const ProductosGet=async (req=request,res=response)=>{

    const {limit=20,start=0}=req.query;
    const queryestado={estado:true};

   const [total,productos]=await Promise.all([
    Producto.countDocuments(queryestado),
    Producto.find(queryestado)
    .skip(Number(start))
    .limit(Number(limit))
    .populate('usuario','nombre')
    .populate('categoria','nombre')
   ]);
   
    res.json({
        total,
        productos
    });

};


//Obtener categoría por ID - público
const ProductoGetByID=async(req=request,res=response)=>{

    const id=req.params.id;
    const producto=await Producto.findById(id).populate('categoria','nombre')
    //console.log(categoria);
    res.json({
        producto
    })
};


//Crear nueva categoría - privado post
const ProductoPost=async (req=request,res=response)=>{

    const nombre=req.body.nombre.toUpperCase();
    const enstock=req.body.enstock;
    const categoria=req.body.categoria;
    const precio=req.body.precio;
    let descripcion=req.body.descripcion;

    if(descripcion!==undefined){ 
        descripcion=descripcion.toUpperCase();
    }

    const productoDB= await Producto.findOne({nombre});

    if(productoDB){

        return res.status(400).json({

            msg:`Ya existe un producto con el nombre ${nombre}`
        })
    }

    const data={
        nombre,
        enstock,
        descripcion,
        usuario:req.usuarioautenticado._id,
        categoria,
        precio
    }
   // console.log(data);
    const producto=new Producto(data);
    producto.save();

    res.status(201).json({

        msg:'Producto creada correctamente',
        producto
    })
};

//Actualizar categoría por ID - privado
const ProductoPutByID=async(req=request,res=response)=>{

    const id=req.params.id;
    //req.usuarioautenticado._id;
    const{estado,usuario,...restbody}=req.body;

    if(restbody.nombre){
        restbody.nombre=restbody.nombre.toUpperCase()
    }

    if(restbody.descripcion){
        restbody.descripcion=restbody.descripcion.toUpperCase()
    }

    restbody.usuario=req.usuarioautenticado._id;

    const updateproducto=await Producto.findByIdAndUpdate(id,restbody,{new:true});

    res.json({
        updateproducto
    })

};

//Borrar categoría por ID - privado - solo roles permitidos
const ProductoDeleteByID=async(req=request,res=response)=>{

    const{id}=req.params;

    const producto=await Producto.findByIdAndUpdate(id,{estado:false},{new:true});
    res.json(
        producto
    );
};

module.exports={
    ProductosGet,
    ProductoPost,
    ProductoGetByID,
    ProductoPutByID,
    ProductoDeleteByID
}