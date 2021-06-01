const {Router} =require('express');

const router=Router();


const {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}=require('../controllers/usuarios.controller');


router.get('/', UsuariosGet);

router.post('/',UsuariosPost);


router.put('/:id',UsuariosPut);

router.delete('/',UsuariosDelete);


module.exports=router;

