const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        mongoose.connect('mongodb://localhost:27017/', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        
        })
        console.log('se logro')
    } catch (error) {
        console.log(error);
        throw new Error('error a la hora de iniciar la base de datos')
    }
}

module.exports={
    dbConnection
}