const {Router} =require('express');
const { check } = require('express-validator');
const {
     CargarArchivo, 
     ActualizarArchivoImg, 
     ObtenerArchivo,
     ActualizarArchivoImgCloudinary
} = require('../controllers/carga-archivos.controller');

const { ColeccionPermitida } = require('../helpers');


const router=Router();

const {
    ValidaCampos,
    ValidaSubirArchivo
 } = require('../middlewares');


router.get('/:coleccion/:id',ObtenerArchivo);


router.post('/',ValidaSubirArchivo,CargarArchivo);

router.put('/:coleccion/:id',[
     ValidaSubirArchivo,
    check('id','El id es inválido').isMongoId(),
    check('coleccion').custom(c=>ColeccionPermitida(c,['usuarios','productos'])),
    ValidaCampos
],ActualizarArchivoImgCloudinary);
//ActualizarArchivoImg);


module.exports=router;
