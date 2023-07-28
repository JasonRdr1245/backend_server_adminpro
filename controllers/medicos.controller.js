const {response,request}=require('express')
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

const actualizarMedico=async(req=request,res=response)=>{
    const id=req.body.id
    const uid=req.uid
    
    try {
        const medicoDB=await Medico.findById(id)
        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg:'medico id no encontrado'
            })
        }

        const cambiosMedico={
            ...req.body,
            usuario:uid,
        }
        const medicoActualizado=await findByIdAndUpdate(id,cambiosMedico,{new:true})
        res.json({
            ok:true,
            medico:medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'hable con el administrador'
        })
    }    
    
}

const borrarMedico=async(req=request,res=response)=>{
    const id=req.body.id
    try {
        const medicoDB=await Medico.findById(id)
        if(!medicoDB){
            return res.status(404).json({
                ok:false,
                msg:'medico id no encontrado'
            })
        }

        await Medico.findByIdAndDelete(id)

        res.json({
            ok:true,
            msg:'Medico borrado'
        })

    } catch (error) {
        
    }
    
}
module.exports={
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicos
}

