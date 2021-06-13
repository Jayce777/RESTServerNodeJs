const jwt=require('jsonwebtoken')


const GenerarJWT=(uid='')=>{

    return new Promise((resolve,reject)=>{

        const payload={uid};

        jwt.sign(payload,process.env.SECRETTOPRIVATEKEY,
            {
                expiresIn:'4h'
            },(err,token)=>{
                if(err){
                    console.log(err);
                    reject('No se pudo generar el token, intente nuevamente')
                }else{

                    resolve(token)
                }
            })  


    });
};

module.exports={
    GenerarJWT
};