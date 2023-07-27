const {response} = require('express')
const Usuario = require("../models/usuario")
const encryptation =require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const getUsuarios=async(req,res=response)=>{
    //const totalRegistros=await Usuario.count()
    const desde=Number(req.query.desde)||0;
    const limit=Number(req,query.limit)||5;
    

    //usuarios=await Usuario.find({},'nombre email role google')
    //        .skip(desde)
    //        .limit(limit)
    const [usuarios,totalRegistros]=await Promise.all([
        Usuario.find({},'nombre email role google img')
            .skip(desde)
            .limit(limit),

        Usuario.countDocuments()
    ])
    

    res.json({
        ok:true,
        usuarios,
        uid: req.uid,
        totalRegistros
    })

}
const crearUsuario=async(req,res=response)=>{
    const {email,password}=req.body;

    //middleware

    try{
        const existeEmail=await Usuario.findOne({email});

        if(existeEmail){
             return res.status(400).json({
                 ok:false,
                 msg: 'El correo ya esta registrado'
             })
         }
        const usuario= new Usuario(req.body);   
        //encriptar contraseña

        const salt = encryptation.genSaltSync();
        usuario.password = encryptation.hashSync(password,salt);
        await usuario.save();

        const token=generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            ok: false,
            mensaje: 'Error al crear el usuario',
            error: error.message  // Aquí obtenemos el mensaje de error personalizado
          });
    }
    
}

const actualizarUsuario =async(req,res=response)=>{
    const uid = req.params.id;
    try{
        
        const usuarioDB=await Usuario.findById(uid)

        if(!usuarioDB){
            return res.status(400).json({
                ok:false,
                msg:'No existe un usuario para ese ID'
            })
        }
        const {password,google,email,...campos}=req.body;
        if(usuarioDB.email!==email){
            const existeEmail=await Usuario.findOne({email});
            if(existeEmail){
                return res.status(400).json({
                    ok:false,
                    msg:'ya existe un usuario con registrado con ese email'
                })
            }else{
                campos.email=email;
            }
        }

        

        //actualizaciones
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid,campos,{new:true})
        res.json({
            ok:true,
            usuario:usuarioActualizado
        })
    }catch(error){
        res.status(400).json({
            ok:false,
            msg:'error al actualizar',
            error:error
        })
    }
}

const borrarUsuario=async(req,res=response)=>{
    uid=req.params.id
    try{
        const usuarioDB=await Usuario.findOne(uid)
        if(!usuarioDB){
            res.status(400).json({
                ok:false,
                msg:'usuario no encontrado'
            })
        }


        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg:'usuario eliminado'
        })

    }catch(error){
        res.json({
            ok:false,
            msg:'error en la eliminacion de usuario'
        })
    }
}

module.exports={
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}