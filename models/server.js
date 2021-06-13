
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const{
   DBConnectionMongo,
 //  DBConnectionPostgreSQL
}=require('../database/config.db');

//rutas
const routerusuarios=require('../routes/usuarios.routes');
const routerauth=require('../routes/auth.routes');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        this.usuariospath='/api/usuarios';
        this.authpath='/api/auth';

        //Conexiones a base de datos
        this.conexionDDMongo();
        //this.conexionDBPostgreSQL();

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
        this.routes();
  
    }

    middlewarepublic(){

        this.app.use(cors());

        this.app.use(express.static('public'));


        this.app.use(express.json());
    }

    //Conexión con mongoDB Atlas
    async conexionDDMongo(){

        await DBConnectionMongo();

    }
 /*   async conexionDBPostgreSQL(){

      await DBConnectionPostgreSQL();
      
      
    }*/

    //funciones para las rutas
    routes(){
        this.app.use(this.authpath,routerauth);
       this.app.use(this.usuariospath,routerusuarios);
          
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports=Server;