const mongoose= require('mongoose');

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



module.exports={
    DBConnectionMongo
}