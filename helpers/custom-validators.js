
const Role=require('../models/role');
const Usuario=require('../models/usuario');

const RoleExiste= async(rol='')=>{

    const existerol= await Role.findOne({rol});
  //  console.log(rol);
    if( !existerol){
        throw new Error(`El rol ${rol} no existe`)
    }
};


const ExisteEmail=async (correo='')=>{

    const existemail= await Usuario.findOne({correo});
   // console.log(existemail);    
    if(existemail){
        // retona un status de error
        throw new Error(`El correo ${correo} ya ha sido registrado`)

    }
};

const ExisteUsuarioXId=async (id='')=>{

    const existeid= await Usuario.findById(id);
   // console.log(existemail);    
    if(!existeid){
        // retona un status de error
        throw new Error(`El id ${id} no pertenece a un usuario creado`)

    }
};



module.exports={
    RoleExiste,
    ExisteEmail,
    ExisteUsuarioXId
}