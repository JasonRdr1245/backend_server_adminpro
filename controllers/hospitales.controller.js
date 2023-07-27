const { response } = require("express")
const Hospital=require('../models/hospital')


const getHospitales=async(req,res=response)=>{
    const hospitales=await Hospital.find()
        .populate('usuario','nombre img')
    try{
        res.json({
            ok:true,
            hospitales
        })
    }catch(error){

    }
}



const crearHospital=async(req,res)=>{
    const uid=req.uid;
    const hospital=new Hospital({
        usuario:uid,
        ...req.body
    });
    
    try{

        hospitalGuardado=await hospital.save()

        res.json({
            ok:true,
            hospital:hospitalGuardado
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador',
            error:error
        })
    }

    
}

const actualizarHospital=(req,res)=>{
    res.json({
        ok:true,
        msg:'actualizarHospitales'
    })
}

const borrarHospital=(req,res)=>{
    res.json({
        ok:true,
        msg:'borrarHospitales'
    })
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}