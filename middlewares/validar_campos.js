const { validationResult } = require('express-validator');


const ValidaCampos=(req,res,next)=>{

    const validaciones=validationResult(req);
    if(!validaciones.isEmpty()){
        return res.status(400).json(validaciones);
    }

    next();
};

module.exports={
    ValidaCampos
}