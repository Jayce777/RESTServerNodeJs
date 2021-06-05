const{Schema,model}= require('mongoose');


const UsuarioSchema=Schema({

    nombre:{
        type:String,
        required:[true,'Nombre obligatorio']
    },
    correo:{
        type:String,
        required:[true,'Correo obligatorio'],
        unique:true
    },
    contrasena:{
        type:String,
        required:[true,'Contraseña obligatorio']
    },
    img:{
        type:String
       
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMINISTRADOR','USUARIO']
    },
    estado:{
        type:Boolean,
       default:true
    },
    google:{
        type:Boolean,
       default:false
    }


});


module.exports=model('Usuario',UsuarioSchema);