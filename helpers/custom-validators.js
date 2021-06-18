
const {Usuario,Categoria,Role, Producto}=require('../models');

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

/*
Validadores de categorías
*/
const ExisteCategoriaXId=async (id='')=>{
    
  const existeidcategoria= await Categoria.findById(id);
   //console.log(existeidcategoria);    
    if(!existeidcategoria){
        // retona un status de error
        throw new Error(`El id ${id} no pertenece a una categoría creada`)

    }
};

/*
Validadores de productos
*/
const ExisteCategoriaProductoXId=async (categoria='')=>{
    
    const existeidcategoria= await Categoria.findById(categoria);
     //console.log(existeidcategoria);    
      if(!existeidcategoria){
          // retona un status de error
          throw new Error(`El id ${categoria} no pertenece a una categoría creada`)
  
      }
  };

  const ExisteProductoXId=async (id='')=>{
    
    const existeidproducto= await Producto.findById(id);
     //console.log(existeidcategoria);    
      if(!existeidproducto){
          // retona un status de error
          throw new Error(`El id ${id} no pertenece a un producto creado`)
  
      }
  };


/*
Validador de colecciones
*/

const ColeccionPermitida=async(coleccion,colecciones=[])=>{

    const incluida=colecciones.includes(coleccion);

    if(!incluida){

        throw new Error(`La coleccion ${coleccion} no existe, permitidas: ${colecciones}`);
        
    }
    return true;

};


module.exports={
    RoleExiste,
    ExisteEmail,
    ExisteUsuarioXId,
    ExisteCategoriaXId,
    ExisteCategoriaProductoXId,
    ExisteProductoXId,
    ColeccionPermitida
}