const{Schema,model}= require('mongoose');

const ProductoSchema= Schema({
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
    precio:{
        type:Number,
        default:0
    },
    descripcion:{
        type:String,
        default:'SIN DESCRIPCION'
    },
    enstock:{
        type:Boolean,
        default:true  
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    },

});


//debe ser una función normal, no una función de flecha
ProductoSchema.methods.toJSON=function(){

      const{__v,estado,...producto}=this.toObject();
      
      return producto;
  }

module.exports=model('Producto',ProductoSchema);