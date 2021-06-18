
const { request, response } = require('express');
const { SubirArchivo } = require('../helpers');


const CargarArchivo = async (req = request, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return  res.status(400).json({
            msg:'No existen archivos para subir'
        });
    
    }

    const extensiones = ['txt'];


    await SubirArchivo(req.files,undefined,'imgs')
    .then(respuesta=> res.json({nombre:respuesta}))
    .catch(error=>res.status(400).json({msg:error}))
   

   // res.json({msg:'Archivo subido ok'});
};


module.exports = {
    CargarArchivo
}