const {Router} =require('express');
const { check } = require('express-validator');


const router=Router();

const { ValidaCampos } = require('../middlewares/validar_campos');

const {Login, LoginGoogle}=require('../controllers/auth.controller');

router.post('/login',[
    check('correo','El correo ingresado no es válido').isEmail(),
    check('contrasena','La contraseña es obligatoria').not().isEmpty(),
    ValidaCampos
], Login);


router.post('/logingoogle',[
    check('id_token','No existe un id token').not().isEmpty(),
    ValidaCampos
], LoginGoogle);

module.exports=router;
