const mongoose= require('mongoose');
//const { Client } = require('pg');
const mysql=require('mysql');
const {promisify}=require('util');


const database={
    host:process.env.MYSQL_CON,
    user:process.env.MYSQL_USER,
    password:'',
    port:process.env.MYSQL_PORT,
    database:process.env.MYSQL_DB
};



const DBConnectionMySQL=async()=>{

    try {
        //crea una conexión a la BDD con los parámetros de conexión
        const db=mysql.createPool(database);
        //utilizar conexión
        db.getConnection((err, conexion) => {

            if (conexion)
                conexion.release();
                 
        });

        db.query=await promisify(db.query);
        console.log('conectado a DB MySQL');
        return db;

    } catch (error) {
        console.log({error});
        throw new Error('Error en DB MySQL');
    }
};



module.exports={
    DBConnectionMySQL
}