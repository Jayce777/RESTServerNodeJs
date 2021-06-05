const mongoose= require('mongoose');
const { Client } = require('pg');


const DBConnectionMongo=async()=>{

    try {

       await mongoose.connect(process.env.MONGODB_CON,
        {
            useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex:true,
             useFindAndModify:false
        });

        console.log('Conectado a DB!');
        
    } catch (error) {
        console.log({error});
        throw new Error('Error en DB');
    }

};



const DBConnectionPostgreSQL=async()=>{

    try {

        const connectionData = {
            user: process.env.USERPOSTGRE,
            host: '',
            database: process.env.POSTGRE_CON,
            password: process.env.PASSPOSTGRE,
            port: process.env.PORTPOSTGRESQL,
          }

        const client = new Client(connectionData);

        await client.connect();
        console.log('Conectado a DB PostgreSQL!');
        
    } catch (error) {
        console.log({error});
       // throw new Error('Error en DB PostgreSQL');
    }

};



module.exports={
    DBConnectionMongo,
    DBConnectionPostgreSQL
}