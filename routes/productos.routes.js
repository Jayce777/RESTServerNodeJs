const {Router} =require('express');
const { check } = require('express-validator');


const {
    ExisteProductoXId,
    ExisteCategoriaProductoXId
}=require('../helpers/custom-validators');

const router=Router();


const {
    ValidaCampos,
    ValidaJWT,
    ValidaRoles
   
} = require('../middlewares');

const {
    ProductosGet, 
    ProductoPost,
    ProductoGetByID,
    ProductoPutByID,
    ProductoDeleteByID
}=require('../controllers/productos.controller');


router.get('/',ProductosGet);

router.get('/:id',[
    check('id','El id no es válido').isMongoId(),
    check('id').custom(ExisteProductoXId),
    ValidaCampos
],ProductoGetByID);


router.post('/',[

    ValidaJWT,
    check('categoria','La categoría es obligatoria').not().isEmpty(),
    check('categoria','El id de la categoría no es válido').isMongoId(),
    check('categoria').custom(ExisteCategoriaProductoXId),
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('precio','El precio es obligatorio').not().isEmpty(),
    check('precio','El precio debe ser numérico').isNumeric(),
    ValidaCampos
],ProductoPost);


router.put('/:id',[
    ValidaJWT,
    check('categoria','La categoría es obligatoria').not().isEmpty(),
    check('categoria','El id de la categoría no es válido').isMongoId(),
    check('categoria').custom(ExisteCategoriaProductoXId),
    check('nombre','El nombre del producto es obligatorio').not().isEmpty(),
    check('precio','El precio debe ser numérico').isNumeric(),
    ValidaCampos

],ProductoPutByID);


router.delete('/:id',[
    ValidaJWT,
    check('id','El id no es válido').isMongoId(),
    ValidaRoles('ADMINISTRADOR', 'VENTAS'),
    check('id').custom(ExisteProductoXId),
    ValidaCampos

],ProductoDeleteByID);

module.exports=router;