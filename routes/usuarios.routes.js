const {Router} =require('express');
const { check } = require('express-validator');
const {ValidaCampos}=require('../middlewares/validar_campos');
const { ValidaJWT } = require('../middlewares/valida_jwt');
const { ValidaRolAdministrador,ValidaRoles } = require('../middlewares/valida_roles');

const { 
    RoleExiste,
    ExisteEmail,
    ExisteUsuarioXId
} = require('../helpers/custom-validators');


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
    check('contrasena','La contraseña debe contener mínimo 7 carateres').isLength({min:7}),
    check('correo','El correo ingresado no es válido').isEmail(),
    check('correo').custom(ExisteEmail),
   // check('rol','El rol no es válido').isIn(['ADMINISTRADOR','USUARIO']),
   check('rol').custom(RoleExiste),
    ValidaCampos

],UsuariosPost);


router.put('/:id',[
    check('id','El id no es válido').isMongoId(),
    check('id').custom(ExisteUsuarioXId),
   check('contrasena','La contraseña debe contener mínimo 7 carateres').isLength({min:7}),
    check('rol').custom(RoleExiste),
    ValidaCampos

],UsuariosPut);

router.delete('/:id',[
    ValidaJWT,
   // ValidaRolAdministrador,
   ValidaRoles('ADMINISTRADOR','VENTAS'),
    check('id','El id no es válido').isMongoId(),
    check('id').custom(ExisteUsuarioXId),
    ValidaCampos
],UsuariosDelete);


module.exports=router;

