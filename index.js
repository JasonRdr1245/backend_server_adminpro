const express=require('express');
const {dbConnection} =require('./database/config')
const app=express();
//base de datos
dbConnection();


app.get('/',(req,res)=>{
    res.status(400)
    .json({
        ok:true,
        msg:'Hola mundO'
    });
})

app.listen(3000,()=>{
    console.log('Servidor corriendo en puerto'+3000)
})