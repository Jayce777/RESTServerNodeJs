const{Schema,model}= require('mongoose');

const CategoriaSchema= Schema({

    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    estado:{
        type: Boolean,
        default:true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },

});

//debe ser una función normal, no una función de flecha
CategoriaSchema.methods.toJSON=function(){

  /*  const{__v,_id,usuario:{_id:uiduser,nombre,correo,rol},...categoria}=this.toObject();
    categoria.uid=_id;
    categoria.usuario={
        uiduser,
        nombre,
        correo,
        rol
    };
   */
    const{__v,estado,...categoria}=this.toObject();
    
    return categoria;
}

module.exports=model('Categoria',CategoriaSchema);