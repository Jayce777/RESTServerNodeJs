
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload=require('express-fileupload');

//conexión Mongo
const {
    DBConnectionMongo,
    //  DBConnectionPostgreSQL
} = require('../database/config.db');

//rutas
const routerusuarios = require('../routes/usuarios.routes');
const routerauth = require('../routes/auth.routes');
const routectegorias = require('../routes/categorias.routes');
const routeproductos=require('../routes/productos.routes');
const routebusqueda=require('../routes/busqueda.routes');
const routecargararchivo=require('../routes/carga-archivos.routes');

//Clase servidor
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //paths servidor
        this.paths = {
            auth: '/api/auth',
            busqueda: '/api/busqueda',
            cargarchivo:'/api/cargararchivo',
            categorias: '/api/categorias',
            productos:'/api/productos',
            usuarios: '/api/usuarios',
        };

        //Conexiones a base de datos
        this.conexionDDMongo();
        //this.conexionDBPostgreSQL();

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
        this.routes();

    }

    middlewarepublic() {

        this.app.use(cors());

        this.app.use(express.static('public'));

        this.app.use(express.json());

        //carga de archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }

    //Conexión con mongoDB Atlas
    async conexionDDMongo() {

        await DBConnectionMongo();

    }
    /*   async conexionDBPostgreSQL(){
   
         await DBConnectionPostgreSQL();
         
         
       }*/

    //funciones para las rutas
    routes() {
        this.app.use(this.paths.auth, routerauth);
        this.app.use(this.paths.busqueda, routebusqueda);
        this.app.use(this.paths.cargarchivo, routecargararchivo);
        this.app.use(this.paths.categorias, routectegorias);
        this.app.use(this.paths.productos, routeproductos);
        this.app.use(this.paths.usuarios, routerusuarios);

    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports = Server;