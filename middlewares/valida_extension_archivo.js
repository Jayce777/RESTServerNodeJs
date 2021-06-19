const { request, response } = require("express");

const extensionesPermitidas=[
    'jpg',
    'png',
    'pdf',
    'txt',
    'docx'
  
]

const ValidaExtensionArchivo=async(req=request,res=response,next)=>{

   const { archivo } = req.files;

   const arrarchivo = archivo.name.split('.');
   const extension = arrarchivo[arrarchivo.length - 1];

   if (!extensionesPermitidas.includes(extension)) {

    return res.status(400).json({
     msg: `Archivo con extensión ${extension} no permitido, extensiones permitidas: ${extensionesPermitidas}`
    });
      
   }
    next();
}

module.exports={
    ValidaExtensionArchivo
}