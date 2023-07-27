require('dotenv').config();
const express=require('express');
const cors=require('cors')
const {dbConnection} =require('./database/config');
//conexion a express
const app=express();
//cors
app.use(cors())
//base de datos
dbConnection()
// Lectura y parseo del body
app.use(express.json())



app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/hospitales',require('./routes/hospitales.routes'))
app.use('/api/medicos',require('./routes/medicos.routes.js'))
app.use('/api/todo',require('./routes/busquedas.routes'))
app.use('/api/uploads',require('./routes/upload.routes'))


//rutas
// app.get('/api/usuario',(req,res)=>{
//     res.status(400)
//     .json({
//         ok:true,
//         msg:'Hola mundO'
//     });
// })

app.listen(process.env.PORT,()=>{
    console.log('Servidor corriendo en puerto '+process.env.PORT)
})