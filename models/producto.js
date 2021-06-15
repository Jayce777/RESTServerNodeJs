const{Schema,model}= require('mongoose');

const ProductoSchema= Schema({

    rol:{
        type: String,
        required:[true,'El rol el obligatorio']
    }

});

module.exports=model('Producto',ProductoSchema);