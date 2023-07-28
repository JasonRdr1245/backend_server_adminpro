const { request,response } = require("express")
const Hospital=require('../models/hospital')


const getHospitales=async(req=request,res=response)=>{
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

const actualizarHospital=async(req=request,res=response)=>{

    const id=req.params.id
    const uid=req.uid
    


    try {
        const hospitalDB=await Hospital.findById(id)

        if(!hospitalDB){
            return res.status(404).json({
                ok:true,
                msg:'no se encontro nada con ese id',
                id
            })
        }


        const cambiosHospital={
            ...req.body,
            usuario:uid
        }

        const hospitalActualizado=await Hospital.findByIdAndUpdate(id,cambiosHospital,{new:true})

        return res.json({
            ok:true,
            hospital:hospitalActualizado
        })
    } catch (error) {
        return res.status(500).json({
        ok:false,
        msg:'hable con el adminsitrador'
    })
    }
    
}

const borrarHospital=async(req=request,res=response)=>{
    try {
        const id=req.body.id
        hospitalDb=findById(id)

        if(!hospitalDB){
            return res.status(404).json({
                ok:false,
                msg:'hospital id no encontrado'
            })
        }

        await Hospital.findByIdAndDelete(id)

        res.json({
        ok:true,
        msg:'hospital borrado'
        })
    } catch (error) {
        
    }
    
}

module.exports={
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}