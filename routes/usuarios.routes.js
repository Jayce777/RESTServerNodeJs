const {Router} =require('express');
const { check } = require('express-validator');
const Role=require('../models/role');
const {ValidaCampos}=require('../middlewares/validar_campos');


const router=Router();


const {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}=require('../controllers/usuarios.controller');


router.get('/', UsuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('contrasena','La contraseña debe contener mínimo 6 carateres').isLength({min:7}),
    check('correo','El correo ingresado no es válido').isEmail(),
   // check('rol','El rol no es válido').isIn(['ADMINISTRADOR','USUARIO']),
   check('rol').custom( async(rol='')=>{

    const existerol= await Role.findOne({rol});
  //  console.log(rol);
    if( !existerol){
        throw new Error(`El rol ${rol} no existe`)
    }

   }),
    ValidaCampos

],UsuariosPost);


router.put('/:id',UsuariosPut);

router.delete('/',UsuariosDelete);


module.exports=router;

