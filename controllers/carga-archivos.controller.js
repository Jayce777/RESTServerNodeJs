const path=require('path');
const fs=require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response, json } = require('express');
const { SubirArchivo } = require('../helpers');

const {Usuario,Producto}=require('../models');
const { model } = require('mongoose');

const pathnoimage=path.join(__dirname,'../assets/no-image.jpg');

const ObtenerArchivo=async(req,res=response)=>{

    const{coleccion,id}=req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            
        modelo=await Usuario.findById(id);
            if(!modelo){

                return res.sendFile(pathnoimage);
            }
            break;
            case 'productos':
                modelo=await Producto.findById(id);
                if(!modelo){

                    return res.sendFile(pathnoimage);

                }

                break;
        default:
            res.status(500).json({
                msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
            })
            break;
    }

    try {
        
        if(modelo.img){

           // const pathimagen=path.join(__dirname,'../uploads',coleccion,modelo.img);
        //    if(fs.existsSync(pathimagen)){

          //     return res.sendFile(pathimagen);
            //}
            console.log(modelo.img);

            return  res.json({archive:modelo.img});


        }

       // res.json({archive:pathnoimage});
         res.json({archive:'https://rest-server07.herokuapp.com'+pathnoimage});


    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
        })
    }
   
  
};


const CargarArchivo = async (req = request, res = response) => {

    //const extensiones = ['txt'];
    await SubirArchivo(req.files,undefined,'imgs')
    .then(respuesta=> res.json({nombre:respuesta}))
    .catch(error=>res.status(400).json({msg:error}))
   
};

const ActualizarArchivoImg=async(req = request, res = response) =>{

    const {coleccion,id}=req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            
        modelo=await Usuario.findById(id);
            if(!modelo){

                return json.status(400).json({
                    msg:`No eixste un usuario con el id ${id}`
                })
            }
            break;
            case 'productos':
                modelo=await Producto.findById(id);
                if(!modelo){

                    return json.status(400).json({
                        msg:`No eixste un producto con el id ${id}`
                    })
                }

                break;
        default:
            res.status(500).json({
                msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
            })
            break;
    }

    try {
        
        //Limpiar imáganes anteriores
        if(modelo.img){

            const pathimagen=path.join(__dirname,'../uploads',coleccion,modelo.img);

            if(fs.existsSync(pathimagen)){

                fs.unlinkSync(pathimagen);
            }

        }

        const nombrearchivo=  await SubirArchivo(req.files,undefined,coleccion);
        modelo.img=nombrearchivo;

        await modelo.save();
    
      
        res.json({modelo});
    
    } catch (error) {
        res.status(500).json({
            msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
        })
    }
   
   
};


const ActualizarArchivoImgCloudinary=async(req = request, res = response) =>{

    const {coleccion,id}=req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            
        modelo=await Usuario.findById(id);
            if(!modelo){

                return json.status(400).json({
                    msg:`No eixste un usuario con el id ${id}`
                })
            }
            break;
            case 'productos':
                modelo=await Producto.findById(id);
                if(!modelo){

                    return json.status(400).json({
                        msg:`No eixste un producto con el id ${id}`
                    })
                }

                break;
        default:
            res.status(500).json({
                msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
            })
            break;
    }

    try {
        
        //Limpiar imáganes anteriores
        if(modelo.img){

          const nombreimgarr=modelo.img.split('/');
          const nombrecloudinary=nombreimgarr[nombreimgarr.length-1];
          const [id_public]=nombrecloudinary.split('.');
           cloudinary.uploader.destroy(id_public);
        }

        const {tempFilePath}=req.files.archivo;
        const {secure_url}=await cloudinary.uploader.upload(tempFilePath);
        modelo.img=secure_url;
        await modelo.save();
    
        res.json({modelo});
    
    } catch (error) {
        res.status(500).json({
            msg:'Se produjo un error al actualizar la imagen, conumíquese con el Administrador'
        })
    }
   
   
};

module.exports = {
    CargarArchivo,
    ActualizarArchivoImg,
    ObtenerArchivo,
    ActualizarArchivoImgCloudinary
}