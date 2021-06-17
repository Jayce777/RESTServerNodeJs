const {Router} =require('express');
const { check } = require('express-validator');
const {
     Busqueda
} = require('../controllers/busqueda.controller');


const router=Router();


router.get('/:coleccion/:termino',Busqueda);


module.exports=router;