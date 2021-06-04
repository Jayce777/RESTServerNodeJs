
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const{
   DBConnectionMongo
}=require('../database/config.db');

//rutas
const routerusuarios=require('../routes/usuarios.routes');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        this.usuariospath='/api/usuarios';

        //Conexiones a base de datos
        this.conexionDDMongo();

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
        this.routes();
  
    }

    middlewarepublic(){

        this.app.use(express.static('public'));

        this.app.use(cors());

        this.app.use(express.json());
    }

    //Conexión con mongoDB Atlas
    async conexionDDMongo(){

        await DBConnectionMongo();
    }

    //funciones para las rutas
    routes(){

       this.app.use(this.usuariospath,routerusuarios);
          
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports=Server;