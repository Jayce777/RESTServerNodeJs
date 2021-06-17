const {Router} =require('express');


const router=Router();

const{
    RolesMysqlGet, 
    RolesMysqlPost
}=require('../controllers/rol.controller');

router.get('/',RolesMysqlGet);

router.post('/',RolesMysqlPost);


module.exports=router;