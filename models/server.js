
require('dotenv').config();
const express = require('express');
const cors = require('cors');

//conexiones
const {
    DBConnectionMySQL
    
} = require('../database/config.db');

//rutas


const routerolesmysql=require('../routes/rolmysql.routes');
//Clase servidor
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //paths servidor
        
        this.pathsMYSQL = {
            rol:'/api/rolmysql'
        };

      
        //this.conexionDBPostgreSQL();
        this.conexionMYSQL();

        //Middlewares
        this.middlewarepublic();

        //dispara las rutas
        this.routes();

    }

    middlewarepublic() {

        this.app.use(cors());

        this.app.use(express.static('public'));

        this.app.use(express.json());
    }

   
    async conexionMYSQL(){

        await DBConnectionMySQL();
    }
    /*   async conexionDBPostgreSQL(){
   
         await DBConnectionPostgreSQL();
         
         
       }*/

    //funciones para las rutas
   
    routes() {
        this.app.use(this.pathsMYSQL.rol, routerolesmysql);
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports = Server;