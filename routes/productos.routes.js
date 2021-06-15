const {Router} =require('express');
const { check } = require('express-validator');

const router=Router();

const {ProductosGet}=require('../controllers/productos.controller');


router.get('/',ProductosGet);


module.exports=router;