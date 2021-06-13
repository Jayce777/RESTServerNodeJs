const {Router} =require('express');
const { check } = require('express-validator');

const { 
    ExisteEmail,
} = require('../helpers/custom-validators');
const router=Router();

const { ValidaCampos } = require('../middlewares/validar_campos');


const {Login}=require('../controllers/auth.controller');

router.post('/login',[
    check('correo','El correo ingresado no es válido').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),

  //  check('correo').custom(ExisteEmail),
    ValidaCampos
], Login);

module.exports=router;
