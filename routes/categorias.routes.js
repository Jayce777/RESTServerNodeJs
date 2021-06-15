const {Router} =require('express');
const { check } = require('express-validator');

const router=Router();

const {
     ValidaCampos,
     ValidaJWT,
     ValidaRoles
    
} = require('../middlewares');

const {
    ExisteCategoriaXId
} = require('../helpers/custom-validators');




const { 
    CategoriasGet,
    CategoriaGetByID,
    CategoriaPost,
    CategoriaPutByID,
    CategoriaDeleteByID
} = require('../controllers/categorias.controller');


//Obtener todas las categorías - público    
router.get('/',CategoriasGet );


//Obtener categoría por ID - público
router.get('/:id',[
   check('id','El id no es válido').isMongoId(),
   check('id').custom(ExisteCategoriaXId),
   ValidaCampos,
],CategoriaGetByID);


//Crear nueva categoría - privado post
router.post('/',[
    ValidaJWT,
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    ValidaCampos

],CategoriaPost );


//Actualizar categoría por ID - privado
router.put('/:id',[
    ValidaJWT,
    check('id','El id no es válido').isMongoId(),
    check('nombre','El nombre de categoría es obligatorio').not().isEmpty(),
    ValidaRoles('ADMINISTRADOR', 'VENTAS'),
    check('id').custom(ExisteCategoriaXId),
    ValidaCampos

],CategoriaPutByID );


//Borrar categoría por ID - privado - solo roles permitidos
router.delete('/:id',[
    ValidaJWT,
    check('id','El id no es válido').isMongoId(),
    ValidaRoles('ADMINISTRADOR', 'VENTAS'),
    check('id').custom(ExisteCategoriaXId),
    ValidaCampos
],CategoriaDeleteByID );


module.exports=router;