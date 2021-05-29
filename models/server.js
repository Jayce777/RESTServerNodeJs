
require('dotenv').config();
const express = require('express');

class Server{

    constructor(){
        this.app= express();
        this.port=process.env.PORT;
        
        //Middlewares
        this.middlewarepublic();
        //dispara las rutas
        this.routes();

       
    }

    middlewarepublic(){

        this.app.use(express.static('public'));
    }

    //funciones para las rutas
    routes(){

        this.app.get('/api', (req, res)=> {
            res.json({
                id:1,
                estado:'GET'
            });
        });

        this.app.post('/api', (req, res)=> {
            res.json({
                id:1,
                estado:'POST'
            });
        });

        this.app.put('/api', (req, res)=> {
            res.json({
                id:1,
                estado:'PUT'
            });
        });

        this.app.delete('/api', (req, res)=> {
            res.json({
                id:1,
                estado:'DELETE'
            });
        });
          
    }

    listen(){
        
        this.app.listen(this.port, () => {
            console.log(`REST Server esuchando en puerto: ${this.port}`);
        });
    }
}


module.exports=Server;