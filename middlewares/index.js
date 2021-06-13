

const  ValidaCampos  = require('../middlewares/validar_campos');
const  ValidaJWT  = require('../middlewares/valida_jwt');
const  ValidaRolesUsuarios = require('../middlewares/valida_roles');


module.exports={
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidaRolesUsuarios
}
