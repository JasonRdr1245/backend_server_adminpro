require('dotenv').config();
const express=require('express');
const cors=require('cors')
const {dbConnection} =require('./database/config');
//conexion a express
const app=express();
//cors
app.use(cors())
//base de datos
dbConnection();

//rutas
app.get('/',(req,res)=>{
    res.status(400)
    .json({
        ok:true,
        msg:'Hola mundO'
    });
})

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto '+process.env.PORT)
})