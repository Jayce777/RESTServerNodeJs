

const  ValidaCampos  = require('../middlewares/validar_campos');
const  ValidaJWT  = require('../middlewares/valida_jwt');
const  ValidaRolesUsuarios = require('../middlewares/valida_roles');
const ValidaSubirArchivo=require('../middlewares/valida_subir_archivo');
const ValidaExtensionArchivo=require('../middlewares/valida_extension_archivo');
module.exports={
    ...ValidaCampos,
    ...ValidaJWT,
    ...ValidaRolesUsuarios,
    ...ValidaSubirArchivo,
    ...ValidaExtensionArchivo
}
