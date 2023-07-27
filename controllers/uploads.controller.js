const path=require('path')
const fs=require('fs')
const { response } = require("express");
const {v4:uuidv4}=require('uuid');
const actualizarImagen = require("../helpers/actualizar_img");



const fileUpload=(req,res=response)=>{

    const tipo=req.params.tipo;
    const id=req.params.id;

    const tiposValidos=['hospitales','medicos','hospitales'];

    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'el tipo seleccionado no existe'
        });
    }
    //validar que exista un archivo
    if(!req.files|| Object.keys(req.files).length===0){
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })
    }
    //procesar la imagen
    //files es el key que se escogio
    const file=req.files.imagen

    const nombreCortado=file.name.split('.')
    const extensionArchivo=nombreCortado[nombreCortado.length - 1];
    //validar extension

    const extensionesValidas=['png','jpg','jpeg','gif']
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        })
    }

    //generar el nombre del archivo
    const nombreArchivo= `${uuidv4()}.${extensionArchivo}`;
    //path para guardar imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`
    //mover la imagen de cualquier lugar a donde se quiera
    file.mv(path,(error)=>{
        if(error){return res.status(500).json({
            ok:false,
            msg:'error al mover la imagen'
        })}
    })

    //actualizar imagen
    actualizarImagen(tipo,id,path,nombreArchivo)


    res.json({
        ok:true,
        msg:'arhivo subido',
        nombreArchivo
    })
}



const getImagen=(req,res=response)=>{
    const [tipo,foto]=req.params;
    const tiposValidos=['hospitales','medicos','hospitales'];

    if (!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'el tipo seleccionado no existe'
        });
    }

    const pathImg=path.join(__dirname,`../uploads/${tipo}/${foto}`)

    //manejar excepcion
    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg=path.join(__dirname,`../uploads/no-image.jpg`);
        res.sendFile(pathImg)
    }

    

}


module.exports={
    fileUpload,
    getImagen
}