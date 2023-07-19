const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        mongoose.connect(process.env.DB_URL, {
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