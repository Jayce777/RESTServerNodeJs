const {Router} =require('express');
const { check } = require('express-validator');
const { CargarArchivo } = require('../controllers/carga-archivos.controller');


const router=Router();

const { ValidaCampos } = require('../middlewares/validar_campos');

router.post('/',CargarArchivo);


module.exports=router;
