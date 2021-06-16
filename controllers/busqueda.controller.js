const { request, response } = require("express");
const { ObjectId } = require('mongoose').Types;
const {
    Categoria,
    Producto,
    Usuario,
    Role
} = require('../models');

const colecciones = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

//Buscar colección usuarios
const BuscarUsuarios = async (termino = '', res = response) => {

    const EsIdMongo = ObjectId.isValid(termino);

    if (EsIdMongo) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            resultados: (usuario) ? [usuario] : []
        })
    }

    //crear expresión regular 
    const regex = new RegExp(termino, 'i');
    const condiciones = {
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    };
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(condiciones),
        Usuario.find(condiciones)

    ]);


    res.json({
        total,
        resultados: usuarios
    });

};

//Buscar colección categorías
const BuscarCategorias = async (termino = '', res = response) => {

    const EsIdMongo = ObjectId.isValid(termino);

    if (EsIdMongo) {
        const categoria = await Categoria.findById(termino).populate('usuario','nombre')
        return res.json({
            resultados: (categoria) ? [categoria] : []
        })
    }

    //crear expresión regular 
    const regex = new RegExp(termino, 'i');
    const condiciones = { nombre: regex, estado: true };
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(condiciones),
        Categoria.find(condiciones).populate('usuario','nombre')
      

    ]);


    res.json({
        total,
        resultados: categorias
    });

};




//Buscar colección productos
const BuscarProductos = async (termino = '', res = response) => {

    const EsIdMongo = ObjectId.isValid(termino);

    if (EsIdMongo) {
        const producto = await Producto.findById(termino).populate('categoria','nombre').populate('usuario','nombre')
        return res.json({
            resultados: (producto) ? [producto] : []
        })
    }

    //crear expresión regular 
    const regex = new RegExp(termino, 'i');
    const condiciones = { nombre: regex, estado: true };
    const [total, producto] = await Promise.all([
        Producto.countDocuments(condiciones),
        Producto.find(condiciones).populate('categoria','nombre')
        .populate('usuario','nombre')
        
    ]);


    res.json({
        total,
        resultados: producto
    });

};

const Busqueda = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if (!colecciones.includes(coleccion)) {

        return res.status(400).json({

            msg: `La colecciones permitidas son: ${colecciones}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            BuscarCategorias(termino, res);

            break;
        case 'productos':
            BuscarProductos(termino, res);

            break;
        case 'usuarios':
            BuscarUsuarios(termino, res);
            break;

        default:

            res.status(500).json({
                msg: 'La búsqueda generó un error, comunicate con el administrador',

            })
            break;
    }

};


module.exports = {
    Busqueda
}