const { request, response } = require("express");


const ProductosGet=async (req=request,res=response)=>{

    res.json({
        msg:'Get all'
    })

};

module.exports={
    ProductosGet
}