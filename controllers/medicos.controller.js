const {response}=require('express')
const Medico=require('../models/medico')

const getMedicos=async(req,res=response)=>{
    const medicos=await Medico.find()
            .populate('usuario','nombre img')
            .populate('hospital','nombre img')


    res.json({
        ok:true,
        msg:'getMedicos'
    })
}



const crearMedico=async(req,res=response)=>{
    
    const uidUsuario=req.uid;
    const medico=new Medico({
        usuario:uid,
        ...req.body
    })

    try{

        const medicoDB=await medicoDB.save();


        res.json({
            ok:true,
            msg:medicoDB
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'hable con el adminsitrador'
        })
    }

    
}

const actualizarMedico=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'actualizarMedicos'
    })
}

const borrarMedico=(req,res=response)=>{
    res.json({
        ok:true,
        msg:'borrarMedics'
    })
}

module.exports={
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicos
}

